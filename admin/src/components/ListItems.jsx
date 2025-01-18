/* eslint-disable react/prop-types */
import { useContext, useEffect, useState } from "react"
import { StoreContext } from "../context/StoredContext"
import { useNavigate } from "react-router-dom";

export default function ListItems() {

  const { foodItems, setActiveLink, checkAuth, availabilityChange } = useContext(StoreContext);
  const navigate = useNavigate();

  useEffect(() => {
    if(!checkAuth()){
      navigate('/');
    }
    else{
      setActiveLink('list');
    }
  },[])

  const FoodCard = ({food}) => {

    const [available, setAvailable] = useState(food.availability);

    const onChangeHandler = (event, foodId) => {
      const status = event.target.value;
      setAvailable(status);
      availabilityChange(status, foodId);
    }

    return (
      <div className="food-card w-52">
        <img src={food.image_url} alt="" className="mb-1"/>
        <div className="flex justify-between mb-1">
          <h1 className="font-semibold">{food.title}</h1>
          <div className="flex gap-2">
            <p>&#8377; {food.price}</p>
            {food.discount.is_discounted  && <p>{food.discount.discount_percentage}%</p>}
          </div>
        </div>
        <div className="flex justify-between items-center mb-1">
          <p><i className="fa-solid fa-star px-1 text-yellow-500"></i>{food.rating}</p>
          <p>{food.category}</p>
        </div>
        <p>{food.description}</p>
        <div className="my-1 flex justify-center">
          <select name="availability" id="availability" className="bg-blue-800 p-1 font-semibold text-white" value={available} onChange={(e) => onChangeHandler(e,food._id)}>
            <option value={food.availability}>{food.availability ? 'Available' : 'Not Available'}</option>
            <option value={!food.availability}>{!food.availability ? 'Available' : 'Not Available'}</option>
          </select>
        </div>
      </div>
    )
  }

  return (
    <div className="menu-container w-full min-h-[90vh] px-2">
      {foodItems.map((e,i) => (
        <FoodCard key={i*7} food={e} />
      ))}
    </div>
  )
}
