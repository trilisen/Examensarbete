const getPollById = (pollId) => {
  const request = {
    query: `
      query {
        findPollById(id: "${pollId}") {
          _id
          title
          description
          creator {
            _id
            username
          }
        }
      }
    `,
  }

  fetch("http://localhost:4000/graphql", {
    method: "POST",
    body: JSON.stringify(request),
    headers: {
      "Content-Type": "application/json",
    },
  })
    .then((res) => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed")
      }
      return res.json()
    })
    .then((res) => {})
    .catch((err) => {
      console.log(err)
    })
}

export default getPollById
