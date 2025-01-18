/* eslint-disable react/prop-types */
import axios from "axios";
import { useState,createContext, useEffect } from "react"
import { discountedPrice } from "../constants/data";
import { toast } from 'react-toastify'

export const StoreContext = createContext(null);

export default function StoredContextProvider(props) {

  const backendUrl = "http://localhost:8000";
  const [activeLink, setActiveLink] = useState('home');
  const [loginTab, setLoginTab]  =  useState(false);
  const [menuData, setMenuData] = useState([]);
  const [foodItems, setFoodItems] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [token, setToken] = useState("");
  const [cartItems, setCartItems] = useState({});

  useEffect( () => {
    async function loadData() {
      await getMenu();
      if(localStorage.getItem("mm_token")){
        setToken(localStorage.getItem("mm_token"));
        await getCartItems(localStorage.getItem("mm_token"));
      }
    }
    loadData();
  },[])

  async function getMenu(){
    
      const menu = await fetch(backendUrl + '/api/food/menu');
      const jsonMenu = await menu.json();
      setFoodItems(jsonMenu);
      console.log("the menu is:", jsonMenu)
  }

  async function getCartItems(token) {
    const response = await axios.post(backendUrl + '/api/cart/get', {}, {headers : {token}});
    
    if(response.data.success){
      setCartItems(response.data.cartData);
    }
    else{
      alert("Cannot Get CartItems, Try Again!");
    }
  }

  const addToCart = async (itemId) => {
    if(!cartItems[itemId]){
      setCartItems((prev) => ({...prev, [itemId] : 1}));
    }
    else{
      setCartItems((prev) => ({...prev, [itemId] : prev[itemId] + 1}));
    }
    if(token){
      await axios.post(backendUrl + '/api/cart/add', {itemId}, {headers : {token}});
      toast.success('Item added to cart!', {autoClose : 2000, hideProgressBar :true, theme : 'colored'});
    }
  }

  const removeFromCart = async (itemId) => {
    if(cartItems[itemId] > 0){
      setCartItems((prev) => ({...prev, [itemId] : prev[itemId] - 1}));
    }
    if(token){
      await axios.post(backendUrl + '/api/cart/remove', {itemId}, {headers : {token}});
      toast.warning('Item removed from Cart!',{autoClose : 2000, theme : 'colored', hideProgressBar : true});
    }
  }

  function getCartTotal () {
    let totalAmount = 0;

    for(const item in cartItems){
      if(cartItems[item] > 0){
        let itemInfo = foodItems.find((food) => food._id === item)
        if(itemInfo.discount.is_discounted){
          totalAmount += discountedPrice(itemInfo.price, itemInfo.discount.discount_percentage) * cartItems[item];
        }
        else{
          totalAmount += itemInfo.price * cartItems[item];
        }
      }
    }
    return totalAmount
  }

  const contextValues = {
    activeLink, setActiveLink,
    loginTab, setLoginTab,
    foodItems, setFoodItems,
    menuData, setMenuData,
    fetchError,
    getMenu,
    backendUrl,
    token, setToken,
    cartItems, getCartItems,
    addToCart , removeFromCart,
    getCartTotal
  }

  return (
    <StoreContext.Provider value={contextValues}>
      {props.children}
    </StoreContext.Provider>
  )
}
