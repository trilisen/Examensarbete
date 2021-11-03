import { useState } from "react"
import { useDebounce } from "use-debounce"

import PollOption from "../components/PollOption"
import TitleInput from "../components/TitleInput"

const Start = () => {
  const [title, setTitle] = useState("")
  const [hasBeenInputed, setHasBeenInputed] = useState(false)
  const [debouncedTitle] = useDebounce(title, 2000)
  const [debouncedHasBeenInputed] = useDebounce(hasBeenInputed, 2000)

  return (
    <div className="container mx-auto h-4/6 flex flex-col items-center justify-center">
      <div className="flex flex-col items-center w-4/6">
        {!debouncedHasBeenInputed && (
          <h2 className="text-xl">To start a poll, enter a title</h2>
        )}
        <TitleInput
          handleChange={(e) => {
            setTitle(e.target.value)
            setHasBeenInputed(true)
          }}
        />
        {debouncedHasBeenInputed && (
          <div className="grid gap-5 grid-cols-2">
            <PollOption />
            <PollOption />
            <PollOption />
            <PollOption />
            <PollOption />
            <PollOption />
          </div>
        )}
      </div>
    </div>
  )
}

export default Start
