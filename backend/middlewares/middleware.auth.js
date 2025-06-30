import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const protectedRoute=async(req,res,next)=>{
    try {
        const token = req.cookies.jwt || req.headers.authorization?.split(' ')[1];
                console.log("protectedRoute: Token received:", !!token); // Log if token is present
        if(!token){
            return res.status(401).json({message:"Unauthorized- No Token Provided"})

        }
        const decoded=jwt.verify(token,process.env.JWT_SECRET);
        console.log("Decoded:", decoded);

        if(!decoded){
                        console.log("protectedRoute: Invalid Token - decoding failed");
            return res.status(401).json({message:"Unauthorized- Invalid Token"});
        }
        const user=await User.findById(decoded.userId).select('-password')
        console.log("User:", user);
        if(!user) return res.status(401).json({message:' User not found'})

        req.user=user;
    next()
    } catch (error) {
        console.log(error);
        
         res.status(401).json({message:'Unauthorized- Invalid Token'})
        
    }
}