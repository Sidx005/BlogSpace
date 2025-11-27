import React from 'react'
import { useEffect } from 'react';
import { Link, useParams, useSearchParams } from 'react-router-dom'
import  { axiosLocal } from '../utils/Axios';
import { useState } from 'react';
import { BiCamera } from 'react-icons/bi';
import { PiPencil } from 'react-icons/pi';
import { Button } from '@radix-ui/themes/dist/cjs/index.js';
import { useAuth } from '../Context';
import { TbTrash } from 'react-icons/tb';
import { VscLoading } from 'react-icons/vsc';
import { FaRecycle } from 'react-icons/fa';

const MyProfile = () => {
  const {id}=useParams()
  const{token,user:currUser}=useAuth()
  const [user,setUser]=useState({})
  const [loading,setLoading]=useState(false)
  const [userInfo,setUserInfo]=useState({profilePic:null,name:""})
  const[displayProfile,setDisplayProfile]=useState(null)
  const [selectedFile,setSelectedFile]=useState(null)
    const [isEditing, setIsEditing] = useState(false);
 
   
  const handleFiles=(e)=>{
    const file=e.target.files[0];
    if(file && file.type==="image/png"){
      setSelectedFile(file);
      const reader=new FileReader();
      reader.onloadend=()=>{
        setDisplayProfile(reader.result)
      }
      reader.readAsDataURL(file)
    }
  }
      const fetchBlogs=async()=>{
      try {
          const res=await axiosLocal.get(`auth/user/${id}`)
          if(res.data.success){
            setUser(res.data.user)
            if(res.data.user?.name){
              setUserInfo(prev=>({...prev,name:res.data.user.name}))
            }
          }

          console.log(res.data)

      } catch (error) {
        console.error("Error fetching blogs:", error);
        
      }
    }
  const handleSubmit = async () => {
    setLoading(true)
  setIsEditing(false);
  const formData = new FormData();

  if (selectedFile) formData.append('profilePic', selectedFile);
  if (userInfo.name) formData.append('name', userInfo.name);

  try {
    const res = await axiosLocal.put(`auth/update`, formData, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'multipart/form-data',
      },
    });
     setLoading(false)
    if (res.data.success) {
      setUser(res.data.user);
      setUserInfo((prev) => ({ ...prev, name: res.data.user.name }));
      setLoading(false)
    }
  } catch (error) {
    console.error("Error updating profile:", error);
  }


  }
  useEffect(()=>{
    // console.log(id)

    fetchBlogs()
  },[id])


  useEffect(()=>{
    if(selectedFile){
      handleSubmit();
    }
  },[selectedFile])
  
  const deleteBlogs=async(blogId)=>{
    if(!confirm(("Are you sure you want to delete this blog?")) return;
    try {
      const res=await axiosLocal.delete(`/blogs/${blogId}`,{
        headers:{'Authorization':`Bearer ${token}`}
      })
    fetchBlogs();
      if(res.data.success){
        console.log("Blog deleted successfully")
      }
    
    }catch(error){
        console.error("Error deleting blog:", error);
      }
  }
  return (
 <div className="min-h-screen bg-gray-100 p-10 flex flex-col items-center">
  
  <div className="w-full max-w-2xl flex-col md:flex-row flex gap-10 bg-white shadow-md rounded-xl p-6 text-center mb-10">
    <div className="md:h-75 bg-black/50 flex items-center justify-center   group relative md:w-75">
  {loading?<FaRecycle size={50} className='text-black animate-spin'/>:<>  <img src={displayProfile||user?.profilePic || 'https://imgs.search.brave.com/78ioDptk8BIRysa5jJWBWJHM6UPT1vecLuhUqLypJDc/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9naXRo/dWIuY29tL3NoYWRj/bi5wbmc'} alt="" className="rounded-md w-full h-full object-cover" />
      {currUser?._id===id &&<div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
      <BiCamera size={70}/>
      <input onChange={handleFiles} type="file" accept='image/png' className='opacity-0 absolute inset-0 z-50' name="" id="" />
      </div>}
      </>}
    </div>
    <div className="flex w-1/2 text-left  justify-center items-start flex-col gap-2">
        <h3 className="md:text-4xl text-xl font-extrabold text-gray-800 mb-4">My Profile</h3>
<div className="flex gap-3 items-center">
  {currUser?._id===id&& isEditing ? (
    <div className="flex items-center gap-3">
       <input
      value={userInfo.name}
      onChange={(e) => setUserInfo({ ...userInfo, name: e.target.value })}
      type="text"
      className="border text-black px-2 py-1 rounded"
    />
    <Button onClick={handleSubmit}>Done</Button>
    </div>
   
  ) : (
    <p className="md:text-2xl flex gap-2 items-center text-gray-600 mb-2">{userInfo.name}  {currUser?._id===id&& <PiPencil className="text-gray-600 cursor-pointer" onClick={(e) => {e.preventDefault();setIsEditing(true)}} />}
</p>
  )}
</div>
    <p className="md:text-xl text-gray-500">{user?.email}</p>
    </div>

  </div>

  {/* Blog Cards */}
  <div className="flex w-full gap-5 flex-col" >
  <h2 className="text-3xl font-bold text-gray-800 mb-6">My Blogs</h2>
    
  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl">
    {user?.blogs?.map(blog => (
      <Link
        to={`/blog/${blog._id}`}
        key={blog._id}
        className="bg-white border border-gray-200 shadow-sm rounded-xl overflow-hidden hover:shadow-md transition-shadow duration-300"
      >
        <img
          className="w-full h-48 object-cover"
          src={blog?.header}
          alt={blog?.title}
        />
        <div className="p-4">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">{blog.title}</h3>
          <div
            className="text-gray-600 text-sm"
            dangerouslySetInnerHTML={{
              __html: blog?.content.slice(0, 100) + '...',
            }}
          />
        </div>
        <div className="flex w-full p-5 gap-3 justify-end">
        {currUser?._id===id &&  <TbTrash onClick={()=>deleteBlogs(blog._id)} size={20} className='text-red-500'/>}
        </div>
      </Link>
    ))}
  </div>
  </div>
</div>

  )
  }

export default MyProfile
