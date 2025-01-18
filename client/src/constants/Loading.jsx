/* eslint-disable react/prop-types */
// import React from 'react'
import { motion } from 'framer-motion'

function Loading() {

  const loaderDelay = [0.3,0.6,0.9,1.2,1.5,1.8,2.1]

  const SpanLoader = ({e}) => {

    const card = {
      open : {
        y : 0,
        opacity : 1,
        backgroundColor : "#ff7e2e",
        transition : {
          duration : .65,
          delay : e/2,
          type : "spring",
          repeat : Infinity,
          repeatDelay : .5,
        }
      },
      close : {
        backgroundColor : "#501e03",
        y : -50, 
        opacity : 0
      },
    }

    return <motion.div className="loader p-1 rounded-full" variants={card} animate="open" initial="close"></motion.div>
  }

  return (
    <div id="loaing-container" className="screen-max-width">
      <div className="loading-div w-full flex flex-col justify-center items-center h-[85vh]">
        <div className="loader-div flex gap-2 mb-3">
          {loaderDelay.map((e,i) => (
            <SpanLoader e={e} key={i} />
          ))}
        </div>
        <p className='text-center text-xl text-amber-900 font-bold'>Loading...</p>
      </div>
    </div>
  )
}

export default Loading