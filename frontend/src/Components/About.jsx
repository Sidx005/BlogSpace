import { Button } from '@radix-ui/themes/dist/cjs/index.js'
import React from 'react'
import {motion} from 'motion/react'
const About = () => {
  return (
    <div className='w-full p-5 flex justify-center items-center flex-col'>
      {/* Heading */}
      <div className='bg-indigo-400/20 border-2 text-indigo-200 border-indigo-500/30 rounded-md p-3 mb-6'>
        DISCOVER VARIOUS PLANETS
      </div>

      {/* Grid */}
      <div className="grid overflow-hidden grid-cols-1 md:grid-cols-3 gap-4 max-w-5xl w-full px-4">
        {/* Left Large Image */}
        <motion.div initial={{x:-350,opacity:0}} whileInView={{x:0,opacity:1}} transition={{delay:0.8,duration:1.9}} className="md:col-span-2 rounded-md overflow-hidden relative  group shadow-md shadow-blue-500 shadow">
          <img
            src="https://media.istockphoto.com/id/181075945/photo/satellite-and-planet.jpg?s=612x612&w=0&k=20&c=SwvAUFvpzar6OFqGoiAqL2TKL5JJ5783mfDMiuE9Pfw="
            alt="Space Tech"
            className="w-full h-full object-cover rounded-lg"
          />
          <p className="text-white mt-2 absolute left-0 p-4 bottom-0 group-hover:translate-y-0">Know More About Space Tech</p>
        </motion.div>

        {/* Right 2 stacked images */}
        <div className="flex overflow-hidden flex-col gap-4">
        <motion.div initial={{y:-50,opacity:0}} whileInView={{y:0,opacity:1}} transition={{delay:0.8,duration:1.9}} className='rounded-md shadow-md shadow-blue-500 shadow '>
        <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1Ut46-QVg7cnYhRng09BKygHd69CCYosQ2A&s"
              alt="Mysteries"
              className="w-full h-48 object-cover rounded-lg"
            />
            <p className="text-white p-4 mt-2">Unravel Space Mysteries</p>
          </motion.div>
          <motion.div initial={{y:50,opacity:0}} whileInView={{y:0,opacity:1}} transition={{delay:0.8,duration:1.9}} className='rounded-md shadow-md shadow-blue-500 shadow '>
          <img
              src="https://preview.redd.it/realistic-earth-3d-model-it-took-me-about-2-minutes-in-v0-j34o1bx4h3mb1.png?width=1080&format=png&auto=webp&s=5aeaf4a0f22b35a9be85675a0854666d021575e0"
              alt="Planets"
              className="w-full h-48 object-cover rounded-lg"
            />
            <p className="text-white p-3 mt-2">Discover Planets</p>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default About
