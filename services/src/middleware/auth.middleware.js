import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js'
import dotenv from 'dotenv'
dotenv.config();


export const authMiddleware = async (req, res, next) => {
   
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: "Token not found"
        });
    }

const data = jwt.verify(token,process.env.JWT_SECRET); //verify lagqte hai verify krne ke lie decode ke bajaye

const user = await userModel.findById(data.id);

req.user = user;

next();

}