/* eslint-disable react/prop-types */
import { useEffect, useRef } from 'react'
import { iconicDishes } from "../../constants/data"
import { motion, useAnimation, useInView } from "framer-motion"

function TopDishes() {

  const ref = useRef(null);
  const isInView = useInView(ref, { once : true});

  const controls = useAnimation();

  const FoodCard = ({dish,i}) => {

  useEffect(() => {
    if(isInView){
      controls.start('visible');
    }
  },[isInView]);

    return (
      <>
        <motion.div className="topdish-card" ref={ref}
          variants={{hidden : {y : 25}, visible : {y : 0}}}
          initial="hidden" animate={controls} transition={{duration : .5, delay : i * 0.1}}
        >
          <img src={dish.image_url} alt="food" width="150px"/>
          <p className="text-center p-1 text-sm sm:text-lg font-bold">{dish.title}</p>
        </motion.div>
      </>
    )
  }

  return (
    <motion.div id="topdishes-container" className="screen-max-width"
      initial={{backgroundColor : "#ffffff"}} whileInView={{backgroundColor : "#ffa45e"}} transition={{duration : 2}}
    >
      <div className="wrapper lg:px-10 sm:px-5 w-full mb-5  flex flex-col">
        <motion.h1 className="rubik-font mt-8 mb-10 text-3xl sm:text-4xl text-amber-900"
          initial={{opacity : 0, y : 100}} whileInView={{opacity : 1, y : 0}} transition={{duration : .5, type : "tween"}}
        >Top & Featured Dishes.</motion.h1>
        <div id="topdishes-div" className="mb-10">
          {iconicDishes.map( (e,i) => (
            <FoodCard dish={e} key={i} i={i} />
          ))}
        </div>
        <a href="/menu" className="px-4 py-2 bg-amber-900 text-white rounded-sm self-center hover:bg-amber-950">Order Now</a>
      </div>
    </motion.div>
  )
}

export default TopDishes