import { createContext, useContext, useEffect, useState } from "react"
import { axiosLocal } from "./utils/Axios";
import { useNavigate } from "react-router-dom";

export const BlogContext=createContext();

export const BlogContextProvider=({children})=>{
const [token,setToken]=useState(localStorage.getItem('token')||null)

const [user,setUser]=useState(null)
const navigate=useNavigate()
const [loading,setLoading]=useState(false)
const [blogs,setBlogs]=useState([])
  const fetchBlogs=async()=>{
    setLoading(true)
   try{ const res=await axiosLocal.get('/blogs')
    setBlogs(res.data.blogs)
    console.log(res.data);}catch(err){
      console.log(err);
    }finally{
        setLoading(false)
    }
  }
useEffect(()=>{
  fetchBlogs()
},[])

useEffect(()=>{
const checkAuth=async()=>{
    if(!token){
            return
        }
    setLoading(true)
    try {
        
        const check=await axiosLocal.get('/auth/checkauth',{
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        console.log(check.data.user)
        setUser(check.data)

    } catch (error) {
        setUser(null)
    }finally{
        setLoading(false)
    }

}
checkAuth()
},[token])

const logout=async()=>{
    await axiosLocal.post('/auth/logout')
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
}
return(
    <BlogContext.Provider value={{user,setUser,blogs,setBlogs,fetchBlogs,navigate,token,setToken,setLoading,loading,logout}}>
        {children}
    </BlogContext.Provider>
)
}
export const useAuth=()=> useContext(BlogContext)