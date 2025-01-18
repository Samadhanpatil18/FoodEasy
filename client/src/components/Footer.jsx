import app_logo from '/src/assets/images/foodeasy.png'

import '../assets/styles/navbar.css';
import { socialLinks } from '../constants/data';

// eslint-disable-next-line react/prop-types
function Footer() {
  return (
    <div id="footer-container" className="screen-max-width">
      <div id='contact' className="wrapper px-2 sm:px-10 flex flex-wrap gap-x-5 gap-y-10 w-full my-10">
        <section id="footer-logo" className='w-full sm:w-1/3'>
          <img src={app_logo} alt="" className='w-32 sm:w-40 lg:w-44 mb-3'/>
          <p className='text-white ps-2 text-justify'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore dignissimos accusamus amet iste commodi consequatur, minima voluptatem, magni fugit ratione, incidunt excepturi. Quidem, eius vero?</p>
        </section>
        <section id="footer-company" className='w-full sm:w-1/3 flex-col items-center'>
          <h1 className='text-xl text-orange-400 font-bold mb-4'>Company</h1>
          <a href="/">Home</a>
          <a href="/menu">Menu</a>
          <a href="/about">About</a>
          <a href="/" onClick={(e) => e.preventDefault()}>Contact</a>
        </section>
        <section id="footer-contact" className='w-full sm:w-1/3 text-white'>
          <address className='location text-orange-300'>
            <i className="fa-solid fa-location-dot"></i> No 55, food Steet, Nashik - 424001
          </address>
          <address className='mobile'>
            <i className="fa-solid fa-phone-volume"></i> +91 9730894356
          </address>
          <address className='mail'>
            <i className="fa-solid fa-square-envelope"></i> samadhanpatil0018@gamil.com
          </address>
          <address id='social-links' className='flex gap-3'>
            {socialLinks.map((e,i) => (
              <a href={e.url} className='p-1 hover:text-orange-500' key={i}>
                <i className={`${e.icon} text-xl`}></i>
              </a> 
            ))}
          </address>
        </section>
      </div>
      <div className="copyright pt-6">
        <p className='text-center text-orange-400'>
          Copyright 2024 <i className="fa-solid fa-copyright"></i> FoodEasy.com - All Right Reserved.
        </p>
      </div>
    </div>
  )
}

export default Footer