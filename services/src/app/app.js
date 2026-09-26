import express from 'express'
import jwt from 'jsonwebtoken'

const app = express()

app.use(express.json())

app.get("/api", (req, res) => {

  res.status(200).json({
    message: "Welcome to authentication service"
  })

})

app.post("/api/register", (req, res) => {

  let { name, email, password } = req.body

  // save data to database

  const token = jwt.sign(
    {
      name,
      email
    },
    "qJCd73WUvOZdgriIgg4UewBJxvZXmHeuXiSJp9UjW34="
  )

  res.status(200).json({
    message: "User registered successfully",

    data: {
      user: {
        email,
        name
      },
      token
    }
  })

})

export default app
