/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../context/StoredContextProvider"
import axios from "axios";
import Loading from "../constants/Loading";
import { Link } from "react-router-dom";
import order_icon from '../assets/images/orders.png'
import '../assets/styles/myorders.css'
import { motion } from "framer-motion";

function MyOrders() {

  const { token, backendUrl } = useContext(StoreContext);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchOrders = async () => {
    const response = await axios.post(backendUrl + '/api/order/userorders', {}, {headers : {token}});
    setData(response.data.data);
    setIsLoading(false);
  }

  useEffect(() => {
    if(token) {
      fetchOrders();
    }
  },[token]);

  const OrderCard = ({order,i}) => {

    let items = "";
    order.items.forEach((i) => {
      items += i.title + ", "
    })

    return (
      <motion.div className="order-card" initial={{opacity:0, x:-25}} animate={{x:0, opacity:1}} transition={{delay:i*0.5, duration:1}}>
        <section className="section1">
          <img src={order_icon} alt="" />
          <p>{items}</p>
        </section>
        <section className="section2">
          <p>&#8377; {order.amount}</p>
          <p>Items : {order.items.length}</p>
        </section>
        <section className="section3">
          <p className="flex items-center gap-1"><p className="w-2 h-2 bg-orange-400 rounded-full"></p>{order.status}</p>
          <button type="button" className="py-1 rounded-md px-3 sm:px-6 bg-blue-800 text-blue-50">Track Order</button>
        </section>
      </motion.div>
    )
  }

  return (
    <div id="myoder-container" className="screen-max-width">
      {isLoading && <Loading />}
      {data.length == 0 && !isLoading &&  
        <div className="w-full h-[75vh] grid place-items-center">
          <div className="grid place-items-center">
            <h1 className="text-xl mb-5">No Orders...</h1>
            <Link to='/menu' className="text-orange-500 underline">Go to Menu</Link>
          </div>
        </div>
      }
      {data.length > 0 && !isLoading &&
        <div className="wrapper py-2 px-2 sm:px-8 lg:px-12 xl:px-20">
          <h1 className="text-xl text-amber-950 rubik-font mb-10">My Orders</h1>
          <div className="orders-div w-full flex flex-col gap-6">
            {data.map((order,i) => (
              <OrderCard order={order} key={i + "myoders"} i={i} />
            ))}
          </div>
        </div>
      }
    </div>
  )
}

export default MyOrders