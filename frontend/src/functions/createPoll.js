import CurrentPollContext from "../context/currentPoll"

const createPoll = (title, pollType) => {
  const request = {
    query: `
      mutation {
        createPoll(pollInput: {title: "${title}", description: "For testing purposes"}) {
          _id
          title
          description
          creator {
            _id
            username
            email
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
    .catch((err) => {
      console.log(err)
    })
}

export default createPoll
