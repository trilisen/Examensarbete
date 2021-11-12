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
      localStorage.setItem("userId", JSON.stringify(action.payload.userId))
      localStorage.setItem("token", JSON.stringify(action.payload.token))
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
            <div className="text-center text-5xl py-5 h-1/6">
              <a href="/">POLL.EM</a>
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
              <Route
                path="poll/:pollId"
                element={
                  <RequireAuth>
                    <Poll />
                  </RequireAuth>
                }
              />
            </Routes>
          </main>
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
