/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const StoreContext = createContext(null)

function StoredContext(props) {
  
  const backendUrl = "http://localhost:8000";
  const [foodItems, setFoodItems] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeLink, setActiveLink] = useState('');
  const [token, setToken] = useState("");
  const navigate = useNavigate();

  useEffect( () => {
    async function loadData() {
      await getMenu();
      if(localStorage.getItem('mm-admin')){
        setToken(localStorage.getItem('mm-admin'));
      }
    }
    loadData();
  },[])

  async function getMenu() {
    const response = await axios.get(backendUrl + '/api/food/menu');
    setFoodItems(response.data);
  }

  function checkAuth () {
    const auth = localStorage.getItem('mm-admin');
    if(auth) return true;
    else return false;
  }

  function onLogout() {
    localStorage.removeItem('mm-admin');
    setToken("");
    navigate('/');
  }

  async function getOrders() {
    const response = await axios.get(backendUrl + '/api/order/getorders');
    if(response.data.success){
      setOrders(response.data.orders);
    }
  }

  async function statusChange(status,orderId){
    const response = await axios.post(backendUrl + '/api/order/status_update',{status, orderId});
    if(response.data.success){
      toast.success("Order Status updated!");
    }
    else{
      toast.warning("Cannot update order Status");
    }
  }

  async function availabilityChange(status, foodId){
    const response = await axios.post(backendUrl + '/api/food/available',{status, foodId});
    if(response.data.success){
      toast.success("Food availability updated!");
    }
    else{
      toast.warning("Cannot update Availability");
    }
  }

  const contextValues = {
    foodItems,
    backendUrl,
    getMenu,
    activeLink,
    setActiveLink,
    token,
    setToken,
    checkAuth, onLogout,
    orders, getOrders,
    statusChange,
    availabilityChange
  }

  return (
    <StoreContext.Provider value={contextValues}>
      {props.children}
    </StoreContext.Provider>
  )
}

export default StoredContext
