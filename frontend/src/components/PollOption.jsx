const PollOption = ({ pollType, onPress }) => {
  return (
    <button
      value={pollType}
      className="bg-gray-200 square rounded-md"
      onClick={onPress}
    >
      Test
    </button>
  )
}

export default PollOption
