import jwt from 'jsonwebtoken'
import userModel from '../models/user.model.js'


export const authMiddleware = async (req, res, next) => {
   
    const token = req.headers.authorization;
    if (!token) {
        return res.status(401).json({
            message: "Token not found"
        });
    }
    
const data = jwt.decode(token);

const user = await userModel.findById(data.id);

req.user = user;

next();

}