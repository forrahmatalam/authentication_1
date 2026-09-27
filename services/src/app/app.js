import express from 'express'
import jwt from 'jsonwebtoken'
import connectDB from '../config/db.js'
await connectDB(); //await is best practice to ensure db connection
import userModel from '../models/user.model.js'
import { authMiddleware } from '../middleware/auth.middleware.js'
import dotenv from 'dotenv'
dotenv.config()


const app = express()
app.use(express.json())


app.get("/api", (req, res) => {
  res.status(200).json({
    message: "Welcome to authentication service"
  })
})


app.post("/api/register", async (req, res) => {
  let { name, email, password } = req.body
  //for connect to database
  const user = await userModel.create({
    name,
    email,
    password
  });
  const token = jwt.sign(
    {
     id: user._id,
    },
   process.env.JWT_SECRET
  );
  res.status(200).json({
    message: "User registered successfully",

    data: {
      user: {
        email,
        name,
         id: user._id
      },
      token
    }
  })

})

app.get("/api/login",authMiddleware, async (req, res) => {

  console.log(req.user)
  res.status(200).json({
message: "User logged in successfully",
data: {
  user:req.user

}
})
})
export default app
