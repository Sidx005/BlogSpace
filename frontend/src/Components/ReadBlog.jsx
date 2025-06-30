import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
// import axiosInstance from '../utils/Axios';
import { Button } from '@radix-ui/themes/dist/cjs/index.js';
import { FaThumbsUp } from 'react-icons/fa';
import { useAuth } from '../Context';
import { axiosLocal } from '../utils/Axios';

const ReadBlog = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState({});
  const [error,setError]=useState(false)
    const [liked, setLiked] = useState(false); // 👈 user-like state
const {user:currUser,token}=useAuth()
  const[likes,setLikes]=useState(0)
  
  const [loading, setLoading] = useState(true);
  // const{}
  

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axiosLocal.get(`/blogs/${id}`);
        // console.log(res)
        
        setBlog(res.data.blog); // or res.data if blog isn't nested
        setLikes(res.data.blog.likes||0)
        setLiked(res.data.blog.likedUsers?.includes(currUser?._id))
        setLoading(false);
      } catch (err) {
        if(err.response?.status==404) setError(true)

        console.error(err);
        setLoading(false);
      }
    };
    fetchBlog();
  }, [id,currUser]);

 if (loading) {
  return (
    <div className='flex justify-center items-center h-72 text-3xl w-full'>
      Loading...
    </div>
  );
}

  if(error) {return <div className='text-red-500 overflow-y-hidden min-h-screen h-full flex items-center justify-center text-center text-3xl'>No Blog Found</div>}

  const handleLike=async()=>{
    try {
      const res=await axiosLocal.post(`/blogs/like/${id}`,{
        userId:currUser?._id
      },{
        headers:{
          'Authorization':`Bearer ${token}`
        }
      })
      setLikes(res.data.likes);
      setLiked(res.data.liked)
    } catch (error) {
            console.error('Failed to toggle like:', error);

    }
  }
  
  return (
    <div className='w-full p-5'>
      {blog? (<>
      <div className="w-full h-[300px] rounded-lg mb-5">
        <img src={blog?.header} className='w-full rounded-lg  h-full object-cover'  alt="" />
      </div>
      <h1 className='text-4xl font-bold mb-5'>{blog?.title}</h1>
      <p className='text-gray-300 mb-3'>Author: {blog?.author.name}</p>
      <div
        className='text-lg'
        dangerouslySetInnerHTML={{ __html: blog?.content || '' }}
      />
      <div className='flex gap-3 items-start mt-5'>
        <Button ><FaThumbsUp onClick={handleLike}/>{likes}</Button>
        </div>
    {/* </div> */}
    </> ):<p>No Blogs Found</p>}


  </div>
    
  );
};

export default ReadBlog;
