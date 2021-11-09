import { Link } from "react-router-dom"

const PollOption = ({ pollType, onPress }) => {
  return (
    <Link
      value={pollType}
      className="bg-gray-200 square rounded-md"
      onClick={onPress}
    >
      Test
    </Link>
  )
}

export default PollOption
