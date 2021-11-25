const createPoll = (title, pollType, token) => {
  const request = {
    query: `
      mutation {
        createPoll(pollInput: {title: "${title}", description: "For testing purposes"}) {
          _id
          title
          description
          creator {
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
      Authorization: "Bearer " + token,
    },
  })
    .then((res) => {
      if (res.status !== 200 && res.status !== 201) {
        throw new Error("Failed")
      }
      return res.json()
    })
    .then((resData) => {
      const pollInfo = resData.data.createPoll
      window.location.href = `/poll/${pollInfo._id}/edit`
    })
    .catch((err) => {
      console.log(err)
    })
}

export default createPoll
