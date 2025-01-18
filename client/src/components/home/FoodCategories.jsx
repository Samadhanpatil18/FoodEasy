/* eslint-disable react/prop-types */
import SlideShow from "./SlideShow"
import '/src/assets/styles/home.css'
import { foodCategories } from "../../constants/data"
import { motion, useAnimation, useInView } from "framer-motion"
import { useEffect, useRef } from "react"

function FoodCategories() {

  const ref = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(ref, { once : true});

  useEffect(() => {
    if(isInView)
      controls.start('visible')
  },[isInView]);

  const CategoryCircle = ({e,i}) => {
    return (
      <motion.div className="cat-circle w-28" ref={ref}
      variants={{hidden : {y : -20}, visible : {y : 0}}}
        initial="hidden" animate={controls} transition={{duration : 1, delay : i * 0.2}}
      >
        <img src={e.image_url} alt="" />
        <p className="text-sm sm:text-base text-center mt-2 text-amber-900">{e.title}</p>
      </motion.div>
    )
  }

  return (
    <div id="food-categories-container" className="screen-max-width bg-white">
      <div className="wrapper sm:px-10 mb-5">
				<div className="content mt-5 mb-10 flex justify-between items-center gap-3">
					<motion.h1 className='text-2xl sm:text-3xl lg:text-4xl text-amber-900 rubik-font'
            initial={{opacity : 0, y : 100}} whileInView={{opacity : 1, y : 0}} transition={{duration : .5, type : "tween"}}
          >
            Cuisines & Categories
          </motion.h1>
					<a href="/menu" className="underline text-orange-600 hover:text-orange-700">Explore Dishes</a>
				</div>
        <SlideShow />
        <div id="categories" className="flex flex-wrap justify-evenly gap-5 sm:gap-8">
          {foodCategories.map( (e,i) => (
            <CategoryCircle e={e} key={i*9} i={i}/>
          ))}
        </div>
			</div>
    </div>
  )
}

export default FoodCategories