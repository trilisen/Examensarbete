import { useContext, useState } from "react"
import { useDebounce } from "use-debounce"

import PollOption from "../components/PollOption"
import TitleInput from "../components/TitleInput"

import createPoll from "../functions/createPoll"

import AuthContext from "../context/AuthContext"

const Start = () => {
  const { state } = useContext(AuthContext)

  const [title, setTitle] = useState("")
  const [titleInputed, setTitleInputed] = useState(false)
  const [debouncedtitleInput] = useDebounce(titleInputed, 2000)

  const [pollType, setPollType] = useState("")

  const handleInitialPollSubmit = (e) => {
    setPollType(e.target.value)
    createPoll(title, pollType, state.token || localStorage.getItem("token"))
  }

  return (
    <div className="container mx-auto flex flex-col items-center justify-center h-full">
      <div className="flex flex-col items-center w-4/6">
        {!debouncedtitleInput && (
          <h2 className="text-xl">To start a poll, enter a title</h2>
        )}
        <TitleInput
          handleChange={(e) => {
            setTitle(e.target.value)
            setTitleInputed(true)
          }}
        />
        {debouncedtitleInput && (
          <div className="w-full mt-2">
            <h2 className="mt-2">Choose your way to poll</h2>
            <div className="grid gap-5 sm:gap-10 md:gap-15 grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 mt-2">
              <PollOption pollType="Simple" onPress={handleInitialPollSubmit} />
              <PollOption
                pollType="Multiple Choice"
                onPress={handleInitialPollSubmit}
              />
              <PollOption
                pollType="Tournament"
                onPress={handleInitialPollSubmit}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Start
