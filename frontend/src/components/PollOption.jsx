const PollOption = ({ pollType, onPress }) => {
  return (
    <button
      value={pollType}
      className="bg-white square rounded-md"
      onClick={onPress}
    >
      Basic (only one that exists for now)
    </button>
  )
}

export default PollOption
