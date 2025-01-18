import dish_img from '/src/assets/images/hero-food.png'
import brush_img from '/src/assets/images/hero-slash.png'
import { heroContent } from '../../constants/data'
import { Reveal } from '../../constants/Reveal'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

function Hero() {

  return (
    <div id="hero-container" className="screen-max-width flex lg:gap-10 gap-5 flex-col lg:flex-row">
      <div className="left w-full lg:w-1/2 flex justify-center">
        <div className="content w-[85%] mt-4 lg:mt-24">
          <Reveal re_color="#ff7e2e">
            <h1 className='text-amber-900 text-3xl lg:text-5xl mb-3 font-bold'> 
              {heroContent.title}
            </h1>
          </Reveal>
          <Reveal re_color="#ff7e2e">
            <p className='text-amber-800 text-sm sm:text-lg lg:text-xl mb-8 font-bold lg:font-semibold'>
            {heroContent.subTitle}
          </p>
          </Reveal>
          <Reveal re_color="#501e03">
            <Link to='/menu'>
              <motion.button type='button' className='text-white text-base bg-amber-900 lg:bg-orange-500 py-1 px-4 rounded-md'>
                {heroContent.btnText}
              </motion.button>
            </Link>
          </Reveal>
        </div>
      </div>
      <div className="right w-full lg:w-1/2 lg:relative">
          <motion.img src={dish_img} alt="" id='hero-dish' className='absolute'
            initial={{opacity : 0}} animate={{opacity : 1}} transition={{delay : 2, duration : .5}}
          />
          <motion.img src={brush_img} alt="" id='hero-brush' className='absolute'
            initial={{opacity : 0}} animate={{opacity : 1}} transition={{duration : 1, delay : 1}}
          />
      </div>
    </div>
  )
}

export default Hero