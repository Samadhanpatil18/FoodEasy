/* eslint-disable react/prop-types */
// import { motion } from 'framer-motion'
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from 'react-responsive-carousel';
import { foodCuisines } from "../../constants/data";

function SlideShow() {

  const ImgCard = ({e}) => {
    return (
      <div>
        <img src={e.image_url} />
        <p className="legend" style={{backgroundColor : "#ff7e2e", opacity : 1, }}>{e.title}</p>
      </div>
    )
  }

  return (
    <div id="slideshow-div" className={`w-full sm:w-3/2 mx-auto rounded-xl overflow-hidden mb-10`}>
      <Carousel autoPlay interval={2000} infiniteLoop={true}>
        {foodCuisines.map( (e,i) => (
          <ImgCard e={e} key={i} />
        ))}
      </Carousel>
    </div>
  )
}

export default SlideShow