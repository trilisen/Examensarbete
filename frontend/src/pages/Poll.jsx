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
        setOptions(resData.data.findOptionsForPoll)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [pollFound, pollId])

  const handleOptionInputChange = (e) => {
    setNewOption(e.target.value)
  }

  const handleAddOption = (e) => {
    e.preventDefault()
    if (newOption === "") {
      return
    }
    setOptions([...options, { _id: pollId, content: newOption }])
    createOption(pollId, newOption)
  }

  if (pollFound) {
    return (
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-2xl">{pollInfo.title}</h2>
        <div>Started by {pollCreator}</div>
        {isOwner ? (
          <input
            type="text"
            className="text-gray-500 border"
            placeholder={pollInfo.description}
          />
        ) : (
          <p className="text-gray-500">{pollInfo.description}</p>
        )}
        {isOwner && <h2>Yo</h2>}
        {!localStorage.getItem("userId") && <h3>Please login to vote</h3>}
        <div className="border">
          Options:
          {options &&
            options.map((option, key) => {
              return (
                <Option
                  key={key}
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
          <form>
            <input
              type="text"
              onChange={handleOptionInputChange}
              className="border"
            />
            <button onClick={handleAddOption}>Add option</button>
          </form>
        )}
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
