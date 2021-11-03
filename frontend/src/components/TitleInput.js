const TitleInput = ({ handleChange }) => {
  return (
    <div className="w-full">
      <label htmlFor="title"></label>
      <input
        autoComplete="off"
        type="text"
        name="title"
        placeholder="Example poll name"
        className="p-2 rounded-xl mt-2 w-full"
        onChange={handleChange}
      />
    </div>
  )
}

export default TitleInput
