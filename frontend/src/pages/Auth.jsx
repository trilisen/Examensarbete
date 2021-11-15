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
          throw new Error("Failed")
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
  }

  const handleIsLoginChange = (e) => {
    e.preventDefault()
    setIsLogin(!isLogin)
  }

  const inputStyles = "border"

  return (
    <div className="flex flex-col">
      {data.errorMessage && (
        <div className="text-red-600">{data.errorMessage}</div>
      )}
      <form className="flex flex-col">
        {!isLogin && (
          <label htmlFor="username">
            Username
            <input
              type="text"
              name="username"
              className={inputStyles}
              onChange={handleInputChange}
            />
          </label>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            className={inputStyles}
            onChange={handleInputChange}
          />
        </label>

        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            className={inputStyles}
            onChange={handleInputChange}
          />
        </label>

        {!isLogin && (
          <label htmlFor="password-confirm">
            Confirm password
            <input
              type="password"
              name="password-confirm"
              className={inputStyles}
              onChange={handleInputChange}
            />
          </label>
        )}
        <button type="submit" onClick={handleFormSubmit}>
          Submit
        </button>
      </form>
      <button onClick={handleIsLoginChange}>
        Change to {isLogin ? "Register" : "Login"}
      </button>
    </div>
  )
}

export default Auth
