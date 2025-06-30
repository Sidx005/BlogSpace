import { Button, Flex } from '@radix-ui/themes/dist/cjs/index.js'
import React from 'react'
import { Link, useActionData } from 'react-router-dom'
import { useAuth } from '../Context'
import HomeBlogs from './HomeBlogs'
import Hero from './Hero'
import About from './About'
import HomeChart from './HomeChart'

const Home = () => {
  return (
    <div className='min-h-screen w-full h-full '>
      <Hero/>
      <About/>
      <div className="w-full p-5 flex justify-center items-center flex-col gap-3">
        <HomeBlogs/>
      </div>
      <HomeChart/>
    </div>
  )
}

export default Home