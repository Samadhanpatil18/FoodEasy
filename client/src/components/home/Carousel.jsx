// import React from 'react'
import VideoCarousel from "./VideoCarousel"
import { motion } from "framer-motion"

function Carousel() {
  return (
    <div id="carousel-container" className="screen-max-width">
      <div className="wrapper sm:px-10 mb-10">
        <motion.h1 className='text-2xl sm:text-3xl lg:text-4xl text-blue-300 rubik-font mt-5 mb-10'
          initial={{opacity : 0, y : 100}} whileInView={{opacity : 1, y : 0}} transition={{duration : .5, type : "tween"}}
        >
          Our Secret? Freshness and Skill!
        </motion.h1>
        <VideoCarousel />
      </div>
    </div>
  )
}

export default Carousel