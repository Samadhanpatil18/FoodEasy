/* eslint-disable react/prop-types */
import { useContext, useEffect } from 'react'
import '../assets/styles/cart.css'
import { StoreContext } from '../context/StoredContextProvider'
import { discountedPrice } from '../constants/data'
import { Link, useNavigate } from 'react-router-dom'

function Cart() {

  const navigate = useNavigate();

  const { cartItems, foodItems, removeFromCart, getCartTotal, setLoginTab } = useContext(StoreContext);

  useEffect(() => {
    if(!localStorage.getItem("mm_token")){
      setLoginTab(true);
      navigate('/');
    }
  },[]);

  const CartItem = ({item, cartItems}) => {
    return (
      <>
      <div className="cart-items-item my-5 text-amber-900">
        <img src={item.image_url} alt="" />
        <p className='w-20 sm:w-full font-semibold'>{item.title}</p>
        {!item.discount.is_discounted ? 
          <p >&#8377; {item.price}</p> : 
          <p >&#8377; {discountedPrice(item.price, item.discount.discount_percentage)}</p>
        }
        <p className=''>{cartItems[item._id]}</p>
        <p className='px-2'>&#8377;{(!item.discount.is_discounted ? item.price : discountedPrice(item.price, item.discount.discount_percentage)) * cartItems[item._id]}</p>
        <button type='button' className='py-1 sm:px-2 w-full sm:w-fit justify-self-center bg-amber-900 rounded-full text-white'
          onClick={() => removeFromCart(item._id)}
        >X</button>
      </div>
      <hr />
      </>
    )
  }

  return (
    <div id='cart-container' className="screen-max-width">
      <div className="wrapper w-full sm:px-8 lg:px-14 xl:px-20">
        <div className="cart-items text-orange-600 mb-16">
          <div className="cart-items-title">
            <p className='item-img'>Item</p>
            <p className='item-title w-20 sm:w-full'>Title</p>
            <p className='item-price'>Price</p>
            <p className='item-quan'>Quantity</p>
            <p className='item-total'>Total</p>
            <p className='item-remove'>Remove</p>
          </div>
          <br />
          <hr className='h-[2px] bg-gray-300'/>
          {foodItems.map((item,i) => {
            if(cartItems[item._id] ?? false){
              return <CartItem item={item} cartItems={cartItems} key={i+"cart"} />
            }
          })}
        </div>
        <div className="cart-bottom w-full px-2 mb-10">
          <div className="cart-total w-full text-amber-900">
            <h1 className='font-bold text-lg'>Cart Total.</h1>
            <div className="total-div w-full">
              <section className='sub-total'>
                <h2>Subtotal</h2>
                <p>&#8377; {getCartTotal()}</p>
              </section>
              <section className='delivery-fee'>
                <h2>Delivery Fee</h2>
                <p>&#8377; {50}</p>
              </section>
              <section className='total'>
                <h2>Total</h2>
                <p>&#8377; {getCartTotal() + 50}</p>
              </section>
            </div>
            <Link to='/cart/order'>
              <button type="button" className='py-1 px-2 bg-blue-800 text-white'>Proceed to Checkout</button>
            </Link>
          </div>
          <div className="promo-code-div">
            <p>If you have a Promo code, Enter it here</p>
            <div className="promo-code-inp flex mt-3">
              <input type="text" className='py-1 px-2' />
              <button type='button' className='bg-blue-800 text-white'>Submit</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart