import { useState } from "react"

const AuthPage = () => {
  const [formData, setFormData] = useState({})
  return (
    <div>
      <input type="text" />
      <input type="text" />
      <input type="text" />
    </div>
  )
}

export default AuthPage
