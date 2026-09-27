import express from 'express'
import jwt from 'jsonwebtoken'
import connectDB from '../config/db.js'
await connectDB(); //await is best practice to ensure db connection
import userModel from '../models/user.model.js'


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
    "qJCd73WUvOZdgriIgg4UewBJxvZXmHeuXiSJp9UjW34="
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

app.get("/api/login",async (req,res)=>{
try{
    
const authHeader = req.headers.authorization;
console.log(authHeader);

   //Decode token to get data
const data = jwt.decode(authHeader);
console.log(data);

       //finding data
const user = await userModel.findById(data.id);
console.log(user);

res.status(200).json({
    message: "Login successful"
});
}catch(err){
    res.status(400).json({
        message:err.message
    })
};
})
export default app
