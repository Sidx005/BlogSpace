import User from '../models/User.js';

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt';
import { genJWT } from '../lib/GenJWT.js';
import cloudinary from '../lib/Cloudinary.js';
import e from 'express';
export const signUp=async(req,res)=>{
    const {fullName,email,password}=req.body;
    try {
        if(!fullName || !email || !password){
         return res.status(404).json({success:false,message:"Please provide creds"})
        }
        if(password.length<6){
            return res.status(404).json({success:false,message:"Password must be at least 6 characters"})
        }
        const existingUser=await User.findOne({email});
        if(existingUser) return res.status(404).json({success:false,message:"User already exist"})
        const salt=await bcrypt.genSalt(10);
    const hashedPassword=await bcrypt.hash(password,salt)
    const newUser=await User.create({
        name:fullName,
        email,
        password:hashedPassword,

    })
    if(newUser){
       genJWT(newUser._id,res)
        await newUser.save()
        return res.status(200).json({success:true,message:"User created successfully",user:{fullName:newUser.name,email:newUser.email,profilePic:newUser.profilePic}})
    }else{
        return res.status(404).json({success:false,message:"User not created"})
    }

} catch (error) {
    console.log(`Error: ${error.message}`);
    return res.status(500).json({message:'Server error'});
    
    }

}
export const login=async(req,res)=>{
    const {email,password}=req.body
    if(!email || !password){
        return res.status(404).json({success:false,message:"Please provide creds"})
    }
   try {
    const user=await User.findOne({email})
    if(!user) return res.status(404).json({success:false,message:"User not found"})
    const matchPass=await bcrypt.compare(password,user.password)
    if(!matchPass)  return res.status(400).json({message:'Invalid Credentials'})
       const token= genJWT(user._id,res);
        return res.status(200).json({success:true,message:"User logged in successfully",user:{_id:user._id,fullName:user.name,email:user.email,profilePic:user.profilePic},token})
   } catch (error) {
    console.log(`Error: ${error.message}`);
        return res.status(500).json({message:'Server error'});
        
   }
}

export const logout=(req,res)=>{
    try {
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:'Logout successful'})
    } catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).json({message:'Server error'});
        
    }    
}

export const updateUser=async (req,res)=>{
try {
   const {name}=req.body
   const currentUserId=req.user._id
   const updateData={}
   if(req.file) {
    const base64=`data:${req.file.mimetype};base64,${req.file.buffer.toString('base64')}`
    const uploadPic=await cloudinary.uploader.upload(base64)
   
    updateData.profilePic=uploadPic.secure_url   
}
if (name) {
    updateData.name = name;
  }

  // If no fields are provided, return an error message
  if (Object.keys(updateData).length === 0) {
    return res.status(400).json({ message: 'At least one field (name or profilePic) must be provided.' });
  }
    const user=await User.findByIdAndUpdate(currentUserId,updateData,{new:true})
   res.status(200).json({message:'Profile updated successfully',user})

} catch (error) {
    console.log(`Error: ${error}`);
        return res.status(500).json({message:'Server error'});
        
}
}
export const getUser=async (req,res)=>{
    const {id}=req.params
    try {
        const user=await User.findById(id).select('-password').populate({path:'blogs',populate:{path:'author',select:'name profilePic content title header'}})
        if(!user) return res.status(404).json({success:false,message:"User not found"})
        return res.status(200).json({success:true,message:"User found",user})
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:'Server error'});
    }
}
export const checkAuth=(req,res)=>{
    try {
       return res.status(200).json(req.user) 
    } catch (error) {
        console.log(`Error: ${error.message}`);
        return res.status(500).json({message:'Error checking auth'})
    }
}