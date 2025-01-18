/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../context/StoredContext";
import { useNavigate } from "react-router-dom";
import order_img from '../assets/images/orders.png'

function Orders() {

  const { setActiveLink, checkAuth, getOrders, orders, statusChange } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!checkAuth()){
      navigate('/');
    }
    else{
      loadData();
    }
  },[]);

  async function loadData() {
    setActiveLink('order');
    await getOrders();
  }

  const OrderInfoCard = ({order}) => {

    const [foodStatus, setFoodStatus] = useState(order.status);

    const onChangeHandler = async (event, orderId) => {
      const food_status = event.target.value;
      setFoodStatus(food_status);
      statusChange(food_status, orderId);
    }

    let dishes = "";
    order.items.forEach((item) => {
      dishes += item.title + ", ";
    })

    return (
      <div className="order-card">
        <img src={order_img} className="w-12 sm:w-16" alt="" />
        <div className="flex flex-col gap-1">
          <p>{dishes}</p>
          <div className="flex justify-evenly">
            <p>&#8377; {order.amount}</p>
            <p>Items : {order.items.length}</p>
          </div>
          <p>{order.payment ? 'Paid' : 'Not Paid'}</p>
        </div>
        <div className="flex flex-col gap-1">
          <p className="font-semibold">{`${order.address.fname} ${order.address.lname}`}</p>
          <p>{order.address.street}</p>
          <p>{`${order.address.city} - ${order.address.zipcode}`}</p>
          <p>{order.address.state}</p>
        </div>
        <select name="status" id="status" value={foodStatus} onChange={(e) => onChangeHandler(e,order._id)}>
          <option value={order.status}>{order.status}</option>
          <option value="Out for delivery">Out for delivery</option>
          <option value="Delivered">Delivered</option>
        </select>
      </div>
    )
  }

  return (
    <div className="w-full px-2">
      <div className="order-container">
        {orders.map((e,i) => (
          <OrderInfoCard order={e} key={i + "order"} i={i} />
        ))}
      </div>
    </div>
  )
}

export default Orders