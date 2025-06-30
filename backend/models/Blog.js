// models/Blog.js
import mongoose, { mongo } from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  header:{
   type:String,
   set: v => (v === '' ? undefined : v),
   default:"https://imgs.search.brave.com/TklfvpIDrs4RnOFQNYUho_409EwTmLQUEfpAuVNL4g4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvOTQ5/NjE1MjIwL3Bob3Rv/L2V1cm9wZS1hdC1u/aWdodC1mcm9tLXNw/YWNlLWNpdHktbGln/aHRzLWVsZW1lbnRz/LWZyb20tbmFzYS5q/cGc_cz02MTJ4NjEy/Jnc9MCZrPTIwJmM9/R2ttUlg3cUZsQXp1/M1l4V09GQURNRVI3/RkJRSXlyU0FBVGdF/Ri02OHVFZz0"
  },
  content: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId, 
    ref:'User',
  },
  likes:{
    type:Number,
    default:0
  },
  likedUsers:[{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User'
  }]
  ,
  tags: [String], 
}, {
  timestamps: true 
});

const Blog=mongoose.model('Blog',blogSchema)
export default Blog
