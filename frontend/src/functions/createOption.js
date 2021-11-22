const createOption = async (pollId, newOption, callback) => {
  const request = {
    query: `
      mutation {
        createOption(optionInput:{pollId:"${pollId}", content:"${newOption}"}){
          _id
          content
        }
      }
    `,
  }
  let response = await fetch("http://localhost:5000/graphql", {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status !== 200 && res.status !== 201 && res !== null) {
        throw new Error("Failed")
      }
      return res.json()
    })
    .catch((err) => {
      console.log(err)
    })
  let resData = await response
  return resData
}

export default createOption
