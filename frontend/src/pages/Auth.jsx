import { useState, useRef } from "react"

const Auth = () => {
  const [isLogin, setIsLogin] = useState(false)

  const [error, setError] = useState(null)

  const username = useRef(null)
  const email = useRef(null)
  const password = useRef(null)
  const passwordConfirm = useRef(null)

  const handleSubmit = (e) => {
    setError(null)
    e.preventDefault()
    if (isLogin) {
      // Login the user
      console.log([email.current.value, password.current.value])
    } else {
      // Password check
      if (password.current.value !== passwordConfirm.current.value) {
        return setError("Passwords don't match")
      }
      // Register the user
      console.log([
        username.current.value,
        email.current.value,
        password.current.value,
      ])
    }
  }

  const handleIsLoginChange = (e) => {
    setError(null)
    e.preventDefault()
    setIsLogin(!isLogin)
  }

  const inputStyles = "border"

  return (
    <div className="flex flex-col">
      {error && <div className="text-red-600">{error}</div>}
      {!isLogin && (
        <div>
          <label htmlFor="username">Username</label>
          <input
            type="text"
            name="username"
            className={inputStyles}
            ref={username}
          />
        </div>
      )}
      <div>
        <label htmlFor="email">Email</label>
        <input type="email" name="email" className={inputStyles} ref={email} />
      </div>
      <div>
        <label htmlFor="password">Password</label>
        <input
          type="password"
          name="password"
          className={inputStyles}
          ref={password}
        />
      </div>
      {!isLogin && (
        <div>
          <label htmlFor="password-confirm">Confirm password</label>
          <input
            type="password"
            name="password-confirm"
            className={inputStyles}
            ref={passwordConfirm}
          />
        </div>
      )}
      <button onClick={handleSubmit}>Submit</button>
      <button onClick={handleIsLoginChange}>
        {isLogin ? "Login" : "Register"}
      </button>
    </div>
  )
}

export default Auth
