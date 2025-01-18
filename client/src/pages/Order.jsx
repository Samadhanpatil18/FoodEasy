import { useEffect, useState } from "react";
import { useContext } from "react";
import { StoreContext } from "../context/StoredContextProvider";
import { useNavigate } from "react-router-dom";
import '../assets/styles/cart.css'
import axios from "axios";

function Order() {

  const navigate = useNavigate();
  const { setLoginTab, getCartTotal, token, foodItems, cartItems, backendUrl } = useContext(StoreContext);

  const initialForm = {
    fname : "",
    lname : "",
    email : "",
    street : "",
    city : "",
    state : "",
    zipcode : "",
    country : "",
    phone : ""
  }
  const [data, setData] = useState(initialForm);

  const onchangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setData((prev) => ({...prev, [name] : value}));
  }

  useEffect(() => {
    if(!localStorage.getItem("mm_token")){
      setLoginTab(true);
      navigate('/');
    }
    else if(getCartTotal() <= 0){
      alert("empty cart")
      navigate('/menu');
    }
  },[]);

  const placeOrder = async (event) => {
    event.preventDefault();

    let orderItems = []

    foodItems.map((item) => {
      if(cartItems[item._id] > 0){
        let itemInfo = item
        itemInfo['quantity'] = cartItems[item._id];
        orderItems.push(itemInfo);
      }
    })

    let orderData = {
      address : data,
      items : orderItems,
      amount : getCartTotal() + 50
    }

    let response = await axios.post(backendUrl + '/api/order/place', orderData, {headers : {token}});
    if(response.data.success){
      const { session_url } = response.data
      window.location.replace(session_url);
    } else {
      alert("Error");
    }

  }

  return (
    <div id="order-container" className="screen-max-width">
      <form onSubmit={placeOrder} className="order-wrapper w-full py-2 px-1 sm:px-8 lg:px-14 xl:px-20">
        <div className="delivery-info w-full">
          <h1 className="text-xl font-bold text-amber-950 mb-5">Delivery Information.</h1>
          <div className="form-details w-full text-amber-900">
            <input type="text" className="f-name" name="fname" placeholder="Firstname" required 
            pattern="^[A-Za-z]{3,15}$" title="Enter only alphabets 3-15 characters"
              onChange={onchangeHandler} value={data.fname}
            />
            <input type="text" className="l-name" placeholder="Lastname" required name="lname" 
            pattern="^[A-Za-z]{1,15}$" title="Enter only alphabets 1-15 characters" 
              onChange={onchangeHandler} value={data.lname}
            />
            <input type="email" className="email" placeholder="Email" required name="email"
            pattern="^[a-zA-Z0-9._+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$" title="Enter a Valid Email Address" 
              onChange={onchangeHandler} value={data.email}
            />
            <input type="text" className="street" placeholder="Door no, Street" required name="street"
            pattern="^(?=.*\d)[a-zA-Z0-9,.'/\s]{5,}$" title="Enter a valid address" 
              onChange={onchangeHandler} value={data.street}
            />
            <input type="text" className="city" placeholder="City" required name="city"
            pattern="^[a-zA-Z\s]{3,}$" title="Enter a valid city"
              onChange={onchangeHandler} value={data.city}
            />
            <input type="text" className="state" placeholder="State" required name="state"
            pattern="^[a-zA-Z\s]{3,}$" title="Enter a valid state"
              onChange={onchangeHandler} value={data.state}
             />
            <input type="text" className="zip-code" placeholder="Zip code" required name="zipcode"
            pattern="^\d{5,10}$" title="Enter a valid zipcode"
              onChange={onchangeHandler} value={data.zipcode}
            />
            <input type="text" className="country" placeholder="Country" required name="country"
            pattern="^[a-zA-Z\s]{2,}$" title="Enter a valid country"
              onChange={onchangeHandler} value={data.country} 
            />
            <input type="tel" className="phone" placeholder="Mobile Number" required name="phone"
            pattern="^\d{10}$" title="Enter a valid 10 digit mobile number"
              onChange={onchangeHandler} value={data.phone}
            />
            <button type="reset" className="clear" 
              onClick={() => setData(initialForm)}
            >Clear all</button>
          </div>
        </div>
        <div className="cart-total w-full text-amber-900">
          <h1 className='font-bold text-xl'>Cart Total.</h1>
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
          <button type="submit" className='py-1 px-2 bg-orange-600 rounded-sm text-white'>
            Proceed to Payment
          </button>
        </div>
      </form>
    </div>
  )
}

export default Order