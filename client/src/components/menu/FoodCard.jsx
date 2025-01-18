/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { StoreContext } from "../../context/StoredContextProvider"

const FoodCard = React.memo(({e,i}) => {

    const { addToCart, removeFromCart, cartItems } = useContext(StoreContext);

    function addCartHandler (event) {
      if(!cartItems[e._id]){
        addToCart(e._id);
      }
      else{
        event.preventDefault();
      }
    }

    const RatingStar = ({value}) => {

      const ratingRef = useRef(null);

      useEffect( () =>{
        if(ratingRef.current){
          ratingRef.current.style.background = `linear-gradient(90deg,#f2bf00 ${value / 5 * 100}%,#cccccc ${100 - (value / 5 * 100)}%)`;
          ratingRef.current.style.backgroundClip = `text`;
        }
      },[]);

      return (
        <div className="rating-part">
          <div className="rating" ref={ratingRef}>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </div>
        </div>
      )
    }

    return (
      <>
      <motion.div className="food-card sm:w-52 relative"
        initial={{opacity : 0, y : -20}} animate={{opacity : 1, y : 0}} transition={{duration : .5, delay : i * 0.1}}
      >
        <div className="img relative">
          <img src={e.image_url} alt={e.title} />
          <div className="cart-counter flex items-center justify-between gap-2 bg-zinc rounded-lg px-2 py-1">
            <input type="button" value={cartItems[e._id] > 0 ? cartItems[e._id] : "+"} className="cart-btn cursor-pointer" onClick={addCartHandler} />
            {cartItems[e._id] > 0 && <button type="button" onClick={() => removeFromCart(e._id)} className="cart-dec text-red-950 bg-red-300">-</button>}
            {cartItems[e._id] > 0 && <button type="button" className="cart-inc order-3 text-green-950 bg-green-300" onClick={() => addToCart(e._id)}>+</button>}
          </div>
        </div>
        <h1 className="text-center text-xs sm:text-base text-amber-950 font-semibold mt-1">{e.title}</h1>
        <div className="rating-div flex justify-center items-center">
          <RatingStar value={e.rating} />
          <span className="rating-text px-2 text-xs sm:text-sm pt-1 text-amber-800">{e.rating}</span>
        </div>
        <div className="price-div flex gap-1 justify-center items-center text-orange-800">
          {!e.discount.is_discounted && <p className="text-xs sm:text-sm font-semibold">&#8377; {e.price}</p>}
          {e.discount.is_discounted && 
            <>
            <p className="text-xs sm:text-sm font-semibold">&#8377;{e.price - Math.round(e.price/e.discount.discount_percentage)}</p>
            <p className="text-xs line-through">&#8377;{e.price}</p>
            </>
          }
        </div>
        <p className="card-des">{e.quantity > 1 ? e.description + ". pack of " + e.quantity + " " + e.title : e.description}</p>
        {!e.availability && <div className="cuttern absolute w-full h-full z-10">Not Available now</div>}
      </motion.div>
      </>
    )
  })
  
  FoodCard.displayName = "FoodCard";

export default FoodCard;