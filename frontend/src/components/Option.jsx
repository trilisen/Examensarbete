import deleteOption from "../functions/deleteOption"

const Option = ({ info, isOwner }) => {
  const handleClick = (type) => {
    if (type === "vote") {
      voteOnOption(info._id)
    } else {
      deleteOption(info._id)
    }
  }
  return (
    <form className="flex">
      {!isOwner && <button onClick={handleClick("vote")}>V</button>}
      <div>{info.content}</div>
      {isOwner && (
        <button onClick={handleClick("delete")} className="text-red-400 ml-5">
          X {/* Change to thrashcan or something*/}
        </button>
      )}
    </form>
  )
}

export default Option
