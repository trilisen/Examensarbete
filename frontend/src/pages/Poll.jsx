import { useEffect, useState } from "react"
import { useParams } from "react-router"

const Poll = () => {
  const params = useParams()

  const { pollId } = params

  const [pollInfo, setPollInfo] = useState({})
  const [pollFound, setPollFound] = useState(false)

  useEffect(() => {
    const request = {
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
    fetch("http://localhost:4000/graphql", {
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
        setPollFound(true)
        setPollInfo(resData.data.findPollById)
      })
      .catch((err) => {
        console.log(err)
      })
  }, [pollId])

  if (pollFound) {
    return (
      <div className="flex flex-col items-center">
        <h2 className="font-bold text-2xl">{pollInfo.title}</h2>
        <p className="text-gray-500">{pollInfo.description}</p>
        <div></div>
      </div>
    )
  }
  return (
    <div>
      <h2>Poll not found</h2>
    </div>
  )
}

export default Poll
