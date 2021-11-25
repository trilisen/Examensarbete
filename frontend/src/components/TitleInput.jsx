const TitleInput = ({ handleChange }) => {
  return (
    <div className="w-full flex justify-center">
      <input
        autoComplete="off"
        type="text"
        name="title"
        placeholder="Example poll name"
        className="p-2 rounded-xl mt-2 w-full sm:w-2/3 md:w-1/2"
        onChange={handleChange}
      />
    </div>
  )
}

export default TitleInput
