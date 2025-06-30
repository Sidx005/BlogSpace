import express from 'express'
import { checkAuth, getUser, login, logout, signUp, updateUser } from '../Controllers/authController.js'
import { protectedRoute } from '../middlewares/middleware.auth.js'
import multer from 'multer'
const storage=multer.memoryStorage();
const fileFilter=(req,file,cb)=>{
    if(file.mimetype.startsWith('image/')){
        cb(null,true)
    }else{
        cb(new Error('Only image files are allowed'),false)
    }
}
const upload=multer({storage,fileFilter})

// const app=express()
const AuthRouter=express.Router()

AuthRouter.post('/signup',signUp)
AuthRouter.post('/login',login)
AuthRouter.post('/logout',logout)
AuthRouter.put('/update',protectedRoute,upload.single('profilePic'),updateUser)
AuthRouter.get('/user/:id',getUser)
AuthRouter.get('/checkauth',protectedRoute,checkAuth)
export default AuthRouter