const voteOnOption = (optionId) => {
  const request = {
    query: `
      mutation {
        createVote(optionId:"${optionId}"){
          _id
          user {
            _id
          }
        }
      }
    `,
  }
  fetch("http://localhost:5000/graphql", {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
  })
    .then((res) => {
      if (res.status !== 200 && res.status !== 201 && res !== null) {
        throw new Error("Failed")
      }
      return res.json()
    })
    .then(() => {
      console.log("hej")
    })
    .catch((err) => {
      console.log(err)
    })
}

export default voteOnOption
