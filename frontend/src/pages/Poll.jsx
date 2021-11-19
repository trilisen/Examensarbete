import { useEffect, useState } from "react"
import { useParams } from "react-router"
import Option from "../components/Option"
import createOption from "../functions/createOption"

const Poll = () => {
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

  const handleAddOption = (e) => {
    e.preventDefault()
    if (newOption === "") {
      return
    }
    setOptions([...options, { _id: pollId, content: newOption, votes: [] }])
    createOption(pollId, newOption)
  }

  if (pollFound) {
    return (
      <div className="flex flex-col items-center justify-center h-5/6 pb-10">
        <div className="flex flex-col items-center bg-white rounded box-border sm:w-1/2 p-5">
          <h2 className="font-bold text-2xl mb-4">{pollInfo.title}</h2>
          <div className="mb-4">Started by {pollCreator}</div>
          {isOwner ? (
            <div className="flex flex-col w-full text-center">
              <label htmlFor="description">Edit your description</label>
              <textarea
                type="text"
                className="border-b text-gray-500 mb-4"
                placeholder={pollInfo.description}
                name="description"
              />
            </div>
          ) : (
            <p className="text-gray-500 mb-2 w-full">{pollInfo.description}</p>
          )}
          {!localStorage.getItem("userId") && (
            <h3 className="mb-2">Please login to vote</h3>
          )}
          <div className="w-full text-center mb-2">
            Options:
            {options &&
              options.map((option) => {
                console.log("Hi fix rerendering please!")
                return (
                  <Option
                    key={option._id}
                    info={option}
                    isOwner={isOwner}
                    handleDelete={() => {
                      const newOptions = options.filter(
                        (item) => item._id !== option._id
                      )
                      setOptions(newOptions)
                    }}
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

export default Poll
