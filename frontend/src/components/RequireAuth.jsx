import { useContext } from "react"
import AuthContext from "../context/AuthContext"
import { useLocation, Navigate } from "react-router"

const RequireAuth = ({ children }) => {
  const { state } = useContext(AuthContext)
  let location = useLocation()

  if (!state.isAuthenticated || !localStorage.getItem("userId")) {
    // Redirect them to the /auth page, but save the current location they were
    // trying to go to when they were redirected. This allows us to send them
    // along to that page after they login, which is a nicer user experience
    // than dropping them off on the home page.
    return <Navigate to="/auth" state={{ from: location }} />
  }

  return children
}

export default RequireAuth
