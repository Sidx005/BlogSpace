import cloudinary from "../lib/Cloudinary.js";
import Blog from "../models/Blog.js";
import User from "../models/User.js";

export const createBlogPosts = async (req, res) => {
    const { title, content, header, tags ,authorId} = req.body;
    console.log(req.user)
    
  
    if (!title || !content || !tags ||!authorId ) {
      return res.status(400).json({
        success: false,
        message: "Please provide all required fields (title, content, tags, author)",
      });
    }
  
    let headerImgUrl = "";
  
    try {
      // Upload image if present
      if (header) {
        const uploadResponse = await cloudinary.uploader.upload(header, {
          folder: "blogs", // optional: to keep uploads organized
        });
        headerImgUrl = uploadResponse.secure_url;
      }

  
      // Create the blog post
      const newBlog = await Blog.create({
        title,
        content,
        header: headerImgUrl,
        author:authorId,
        tags,
      });
      await User.findByIdAndUpdate(authorId,{
        $push:{blogs:newBlog._id}

      })
  
      return res.status(201).json({
        success: true,
        message: "Blog created successfully",
        blog: newBlog, // prefer using `blog` instead of `newBlog` in response
      });
  
    } catch (error) {
      console.error("Error creating blog:", error);
      return res.status(500).json({
        success: false,
        message: "Internal server error",
      });
    }
  };
  
export const getAllBlogs=async (req,res)=>{
    try{
        const blogs=await Blog.find().populate('author','name')
        if(blogs.length>0){
            return res.status(200).json({success:true,blogs})
        }else{
            return res.status(404).json({success:false,message:"No blogs found"})
        }
    }catch(err){
        console.log(err.message);
        return res.status(500).json({success:false,message:"Internal server error"})
    }

}
export const getBlogById=async(req,res)=>{
    const {id}=req.params;
    try {
        
        const blog=await Blog.findById(id).populate('author','name')
        if(blog){
        console.log(blog)

            return res.status(200).json({success:true,blog})}else{
            return res.status(404).json({success:false,message:"Blog not found"})
            }
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({success:false,message:"Internal server error"})
 
    }
}
export const updateBlog = async (req, res) => {
    const { id } = req.params;
    const { title, content, tags, header } = req.body;
    const author=req.user.name
  
    try {
      // Prepare update object
      let updateData = { title, content, author, tags };
  
      // Check if header image is provided for update
      if (header) {
        // Upload the new header image if provided
        const uploadResponse = await cloudinary.uploader.upload(header, {
          folder: "blogs",
        });
        updateData.header = uploadResponse.secure_url;
      }
  
      // Update the blog in the database
      const blog = await Blog.findByIdAndUpdate(id, updateData, { new: true });
  
      if (blog) {
        return res.status(200).json({ success: true, blog });
      } else {
        return res.status(404).json({ success: false, message: "Blog not found" });
      }
    } catch (err) {
      console.log(err.message);
      return res.status(500).json({ success: false, message: "Internal server error" });
    }
  };
  
export const deleteBlog=async(req,res)=>{
    const {id}=req.params;
    try {
        const blog=await Blog.findByIdAndDelete(id)
        if(blog){
            return res.status(200).json({success:true,message:"Blog deleted successfully"})
        }else{
            return res.status(404).json({success:false,message:"Blog not found"})
        }
    }catch(err){
        console.log(err);
        return res.status(500).json({success:false,message:"Internal server error"})
    }
}

export const blogLikes=async(req,res)=>{
  const {id}=req.params;
  const {userId}=req.body;
  if(id){
    try {
      const blog=await Blog.findById(id)
      if(!blog) return res.status(404).json({success:false,message:"Blog not found"})
      const hasLiked= blog.likedUsers.includes(userId)

      if(hasLiked) {
        blog.likes-=1;
        blog.likedUsers=blog.likedUsers.filter(id=>id!=userId)

      }else{
        blog.likes+=1;
        blog.likedUsers.push(userId)
      }
      await blog.save()
      res.send({success:true,message: hasLiked?'Blog unliked successfully':' Blog liked successfully', likes:blog.likes,liked:!hasLiked})
    } catch (error) {
      
    }
  }
}