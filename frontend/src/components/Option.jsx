import { useEffect, useState } from "react"

import deleteOption from "../functions/deleteOption"
import voteOnOption from "../functions/voteOnOption"

const Option = ({ info, isOwner, handleDelete }) => {
  const [votes, setVotes] = useState(0)

  useEffect(() => {
    setVotes(info.votes.length)
  }, [info])

  const handleClick = (e) => {
    e.preventDefault()
    deleteOption(info._id)
    handleDelete()
  }

  const vote = (e) => {
    e.preventDefault()
    setVotes(votes + 1)
    voteOnOption(info._id)
  }

  return (
    <form className="flex justify-between m-2">
      <h2>{votes}</h2>
      {!isOwner && localStorage.getItem("userId") && (
        <button onClick={vote} className="text-green-400">
          V
        </button>
      )}
      <div>{info.content}</div>
      {isOwner && (
        <button className="text-red-400" onClick={handleClick}>
          X {/* Change to thrashcan or something*/}
        </button>
      )}
    </form>
  )
}

export default Option
