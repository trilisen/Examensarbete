import { useEffect, useState } from "react"

import deleteOption from "../functions/deleteOption"
import voteOnOption from "../functions/voteOnOption"

const Option = ({
  info,
  isOwner,
  handleDelete = null,
  hasVoted,
  voteUpdate = null,
}) => {
  const [votes, setVotes] = useState(0)

  useEffect(() => {
    if (!info.votes) {
      info.votes = []
    }
    setVotes(info.votes.length)
  }, [info])

  const handleClick = (e) => {
    e.preventDefault()
    deleteOption(info._id)
    handleDelete(info)
  }

  const vote = (e) => {
    if (hasVoted.general) {
      e.preventDefault()
      return
    }
    voteOnOption(info._id)
    voteUpdate(info)
  }

  return (
    <div className="flex justify-between items-center py-2">
      {isOwner && <h2>{votes}</h2>}
      {!isOwner && localStorage.getItem("userId") && (
        <input
          onClick={vote}
          className="text-green-400"
          type="checkbox"
          defaultChecked={hasVoted.which === info._id}
        />
      )}
      <div className="mx-5">{info.content}</div>
      {isOwner ? (
        <button className="text-red-400" onClick={handleClick}>
          X {/* Change to thrashcan or something*/}
        </button>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default Option
