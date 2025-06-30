import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { Route, Routes } from 'react-router-dom'
// import axiosInstance from './utils/Axios'
import Register from './Components/Register'
import Login from './Components/Login'
import { Theme, ThemePanel } from '@radix-ui/themes/dist/cjs/index.js'
import Home from './Components/Home'
import Blogs from './Components/Blogs'
import Nav from './Components/Nav'
import CreateBlog from './Components/CreateBlog'
import Analytics from './Components/Analytics'
import ReadBlog from './Components/ReadBlog'
import MyProfile from './Components/MyProfile'
import AboutPage from './Components/AboutPage'

function App() {

  return (
    <>
  <Theme accentColor="iris" appearance='dark' grayColor="sand" radius="large" scaling="95%">
    <Nav/>
      <Routes>
      <Route path='/' element={<Home/>}/>

        <Route path='/register' element={<Register/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/analytics' element={<Analytics/>}/>
        <Route path='/blogs' element={<Blogs/>}/>
        <Route path='/about' element={<AboutPage/>}/>
        <Route path='/profile/:id' element={<MyProfile/>}/>
        
        <Route path='/blog/:id' element={<ReadBlog/>}/>
        <Route path='/createBlog' element={<CreateBlog/>}/>

      </Routes>
      <ThemePanel/>
      </Theme>
    </>
  )
}

export default App
