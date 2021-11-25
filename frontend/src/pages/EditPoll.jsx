import { useEffect, useState } from "react"
import { useParams } from "react-router"
import Option from "../components/Option"
import createOption from "../functions/createOption"

const EditPoll = () => {
  const params = useParams()

  const { pollId } = params

  const [isOwner, setIsOwner] = useState(false)

  const [pollInfo, setPollInfo] = useState({})
  const [pollFound, setPollFound] = useState(false)
  const [pollCreator, setPollCreator] = useState(null)
  const [options, setOptions] = useState(null)
  const [newOption, setNewOption] = useState("")

  let localUserId = localStorage.getItem("userId")

  useEffect(() => {
    setPollFound(false)
    let request = {
      query: `
        query {
          findPollById(id: "${pollId}") {
            _id
            title
            description
            creator {
              _id
              username
            }
          }
        }
      `,
    }
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201 && res !== null) {
          throw new Error("Failed")
        }
        return res.json()
      })
      .then((resData) => {
        let info = resData.data.findPollById
        setPollFound(true)
        setPollInfo(info)
        setPollCreator(info.creator.username)
        if (info.creator._id === localUserId) {
          setIsOwner(true)
        } else {
          setIsOwner(false)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }, [pollId, localUserId])

  useEffect(() => {
    const request = {
      query: `
        query {
          findOptionsForPoll(pollId:"${pollId}") {
            _id
            content
            votes {
              _id
            }
          }
        }
      `,
    }
    fetch("http://localhost:5000/graphql", {
      method: "POST",
      body: JSON.stringify(request),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (res.status !== 200 && res.status !== 201 && res !== null) {
          throw new Error("Failed")
        }
        return res.json()
      })
      .then((resData) => {
        const sortedOptions = resData.data.findOptionsForPoll.sort((a, b) =>
          a.votes.length < b.votes.length ? 1 : -1
        )
        setOptions(sortedOptions)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [pollId])

  const handleOptionInputChange = (e) => {
    setNewOption(e.target.value)
  }

  const handleAddOption = async (e) => {
    e.preventDefault()
    if (newOption === "") {
      return
    }
    let optionData = await createOption(pollId, newOption)
    setOptions([...options, optionData.data.createOption])
  }

  const deleteOption = (option) => {
    const newOptions = options.filter((item) => item._id !== option._id)
    setOptions(newOptions)
  }

  if (isOwner && pollFound) {
    return (
      <div className="flex flex-col items-center justify-center h-5/6 pb-10">
        <div className="flex flex-col items-center bg-white rounded box-border sm:w-1/2 p-5">
          <h2 className="font-bold text-2xl mb-4">{pollInfo.title}</h2>
          <div className="mb-4">Started by {pollCreator}</div>
          <div className="flex flex-col w-full text-center">
            <label htmlFor="description">Edit your description</label>
            <textarea
              type="text"
              className="border-b text-gray-500 mb-4"
              placeholder={pollInfo.description}
              name="description"
            />
          </div>
          <div className="w-full text-center mb-2 divide-y">
            Options:
            {options &&
              options.map((option, key) => {
                return (
                  <Option
                    key={key}
                    info={option}
                    isOwner={isOwner}
                    handleDelete={deleteOption}
                  />
                )
              })}
          </div>
          {isOwner && (
            <form className="mb-2">
              <input
                type="text"
                onChange={handleOptionInputChange}
                className="border"
              />
              <button onClick={handleAddOption}>Add option</button>
            </form>
          )}
        </div>
      </div>
    )
  }
  return (
    <div className="flex items-center justify-center space-x-2 animate-pulse mt-20">
      <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
      <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
      <div className="w-8 h-8 bg-blue-400 rounded-full"></div>
    </div>
  )
}

export default EditPoll
