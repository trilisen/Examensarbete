import { useState, useContext } from "react"
import { useNavigate, useLocation } from "react-router"

import AuthContext from "../context/AuthContext"

const Auth = () => {
  let navigate = useNavigate()
  let location = useLocation()
  let from = location.state?.from?.pathname || "/"
  const { dispatch } = useContext(AuthContext)
  const initialState = {
    email: "",
    password: "",
    isSubmitting: false,
    errorMessage: null,
    statusMessage: null,
  }

  const [data, setData] = useState(initialState)
  const [isLogin, setIsLogin] = useState(true)

  const handleInputChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    })
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    setData({
      ...data,
      isSubmitting: true,
      errorMessage: null,
    })

    if (isLogin) {
      const request = {
        query: `
          query {
            login(email: "${data.email}", password: "${data.password}"){
              userId
              token
              tokenExpiration
            }
          }
        `,
      }

      fetch("http://localhost:5000/graphql", {
        method: "POST",
        body: JSON.stringify(request),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          if (res.status !== 200 && res.status !== 201) {
            throw new Error("User not found")
          }
          return res.json()
        })
        .then((resJson) => {
          dispatch({
            type: "LOGIN",
            payload: resJson.data.login,
          })
          navigate(from, { replace: true })
        })
        .catch((error) => {
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: error.message || error.statusText,
          })
        })
    } else {
      if (data.password !== data.passwordConfirm) {
        return setData({
          ...data,
          errorMessage: "Passwords don't match",
        })
      }
      const request = {
        query: `
          mutation {
            createUser(userInput:{email: "${data.email}", username:"${data.username}", password:"${data.password}"}){
              _id
              email
              username
            }
          }
        `,
      }

      fetch("http://localhost:5000/graphql", {
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
        .then(() => {
          setIsLogin(true)
          setData({
            ...data,
            statusMessage: "Successfully created account, please log in",
            errorMessage: null,
          })
        })
        .catch((error) => {
          setData({
            ...data,
            isSubmitting: false,
            errorMessage: error.message || error.statusText,
          })
        })
    }
  }

  const handleIsLoginChange = (e) => {
    e.preventDefault()
    setIsLogin(!isLogin)
  }

  return (
    <div className="flex flex-col items-center justify-center h-5/6 pb-10">
      <div className="flex flex-col justify-center items-center bg-white p-5 rounded box-border sm:w-1/2">
        {data.errorMessage && (
          <div className="text-red-600">{data.errorMessage}</div>
        )}
        {data.statusMessage && (
          <div className="text-green-400">{data.statusMessage}</div>
        )}
        <form className="flex flex-col justify-center sm:w-2/3">
          <h2 className="text-2xl font-bold text-center mb-5">
            {isLogin ? "Log in" : "Register"}
          </h2>
          {!isLogin && (
            <div className="input-container">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                name="username"
                className="input"
                onChange={handleInputChange}
              />
            </div>
          )}
          <div className="input-container">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              className="input"
              onChange={handleInputChange}
            />
          </div>

          <div className="input-container">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              className="input"
              onChange={handleInputChange}
            />
          </div>

          {!isLogin && (
            <div className="input-container">
              <label htmlFor="passwordConfirm">Confirm password</label>
              <input
                type="password"
                name="passwordConfirm"
                className="input"
                onChange={handleInputChange}
              />
            </div>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              onClick={handleFormSubmit}
              className="button button-gradient"
            >
              Submit
            </button>
          </div>
        </form>
        <button onClick={handleIsLoginChange} className="m-2 mt-4">
          Change to {isLogin ? "Register" : "Login"}
        </button>
      </div>
    </div>
  )
}

export default Auth
