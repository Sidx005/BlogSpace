import express from 'express'
import { blogLikes, createBlogPosts, deleteBlog, getAllBlogs, getBlogById, updateBlog } from '../Controllers/blogcontroller.js'
import { protectedRoute } from '../middlewares/middleware.auth.js'

// const app=express()
const BlogRouter=express.Router()

BlogRouter.post('/blogs',protectedRoute,createBlogPosts)
BlogRouter.get('/blogs',getAllBlogs)
BlogRouter.get('/blogs/:id',getBlogById)
BlogRouter.put('/blogs/:id',protectedRoute,updateBlog)
BlogRouter.delete('/blogs/:id',protectedRoute,deleteBlog)
BlogRouter.post('/blogs/like/:id',protectedRoute,blogLikes)
export default BlogRouter