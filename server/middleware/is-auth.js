import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()

export default (req, res, next) => {
  const authHeader = req.get("Authorization")
  if (!authHeader) {
    req.isAuth = false
    return next()
  }
  const token = authHeader.split(" ")[1]
  if (!token || token === "") {
    req.isAuth = false
    return next()
  }
  let decodedToken
  try {
    decodedToken = jwt.verify(token, process.env.JWT_PHRASE)
  } catch (err) {
    req.isAuth = false
    return next()
  }
  req.isAuth = true
  req.userId = decodedToken.userId
  next()
}
