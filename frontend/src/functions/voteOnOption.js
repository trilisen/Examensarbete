const voteOnOption = (optionId) => {
  const request = {
    query: `
      mutation {
        createVote(optionId:"${optionId}"){
          _id
          user
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
    .catch((err) => {
      console.log(err)
    })
}

export default voteOnOption
