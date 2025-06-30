import { Button, Flex } from '@radix-ui/themes/dist/cjs/index.js'
import React from 'react'
import { motion } from 'motion/react'
const Hero = () => {
  return (
    <Flex  gap={'3'} direction={'column'} align={'center'} justify={'center'}  className='min-h-72 mb-2 overflow-y-hidden relative glow-bg p-10 '>
<img
  src="/image1.png"
  className="absolute  right-2 w-0 md:w-1/4 -bottom-5 object-cover"
  alt=""
/>
      <motion.h1 initial={{opacity:0,y:50}} transition={{delay:.5,duration:1}} animate={{opacity:1,y:0}} className='text-4xl font-bold dark:bg-gradient-to-r from-white to-white/30 p-1 dark:bg-clip-text dark:text-transparent text-center'>Where Curiosity Meets Cosmos</motion.h1>
      <motion.p initial={{opacity:0}} transition={{delay:.9,duration:2}} animate={{opacity:1}} className='text-lg text-center mt-2'>Unravel the mysteries of the universe with us.</motion.p>
      <Button style={{padding:'20px'}} variant='classic'>Explore the universe </Button>
    </Flex>
  )
}

export default Hero