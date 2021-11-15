import "./App.css"
import { useReducer } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

import Start from "./pages/Start.jsx"
import Poll from "./pages/Poll.jsx"
import Auth from "./pages/Auth.jsx"
import RequireAuth from "./components/RequireAuth"

import { AuthProvider } from "./context/AuthContext"

const initialState = {
  isAuthenticated: false,
  userId: null,
  token: null,
  tokenExpiration: null,
}

const reducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      localStorage.setItem("userId", action.payload.userId)
      localStorage.setItem("token", action.payload.token)
      return {
        ...state,
        isAuthenticated: true,
        userId: action.payload.userId,
        token: action.payload.token,
        tokenExpiration: action.payload.tokenExpiration,
      }
    case "LOGOUT":
      localStorage.clear()
      return {
        ...state,
        isAuthenticated: false,
        userId: null,
      }
    default:
      return state
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)

  const handleLogout = () => {
    dispatch({ type: "LOGOUT" })
  }
  return (
    <Router>
      <AuthProvider
        value={{
          state,
          dispatch,
        }}
      >
        <div className="min-h-full">
          <main className="flex flex-col">
            <div className=" ">
              <a href="/" className="text-center text-5xl py-5 h-1/6">
                POLL.EM
              </a>
              {localStorage.getItem("userId") ? (
                <button onClick={handleLogout}>LOGOUT</button>
              ) : (
                <a href="/auth">LOGIN</a>
              )}
            </div>
            <Routes>
              <Route path="auth" element={<Auth />} />
              <Route
                path="/"
                element={
                  <RequireAuth>
                    <Start />
                  </RequireAuth>
                }
              />
              <Route path="poll/:pollId" element={<Poll />} />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
