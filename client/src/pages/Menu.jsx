/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/prop-types */
import React, { useContext, useEffect, useState } from "react"
import Loading from "../constants/Loading";
import '../assets/styles/menu.css'
import FoodCard from "../components/menu/FoodCard";
import { filterCategories } from "../constants/data";
import { motion } from "framer-motion";
import { StoreContext } from "../context/StoredContextProvider";
import ErrorMessage from "../constants/ErrorMessage";
import SearchBar from "../components/menu/SearchBar";

function Menu() {

  const { setActiveLink, foodItems, menuData, setMenuData, fetchError } = useContext(StoreContext); 
  
  const [filterVal, setFilterVal] = useState('All');

  useEffect(() => {
    setActiveLink('menu');
  },[]);

  useEffect(() => {
    setMenuData(foodItems);
  },[foodItems])

  useEffect(() => {
    if(filterVal == "All"){
      setMenuData(foodItems);
    }
    else{
      setMenuData(() => {
        return foodItems.filter((e) => e.tags.includes(filterVal))
      })
    }
  },[filterVal])

  function dishFiltering(fil) {
    if(fil.val == filterVal) {
      setFilterVal("All")
    }
    else{
      setFilterVal(fil.val);
    }
  }

  const FilterFoods = React.memo(() => {

    const FilterCircle = ({e,i}) => {
      return (
        <motion.div className="filter-div"
          initial={{opacity : 0}} animate={{opacity : 1}} transition={{delay : i * 0.05}}
        >
          <button type="button" onClick={() => dishFiltering(e)} className={`${e.val == filterVal ? 'active' : ''}`}>
            <img src={e.image_url} alt="" />
          </button>
          <p>{e.text}</p>
        </motion.div>
      )
    }

    return (
      <div className="filter-container w-full sm:p-5 py-2 grid place-items-center mb-5">
        <div className="wrapper xl:px-20">
          {filterCategories.map((e,i) => (
            <FilterCircle key={i} e={e} i={i}/>
          ))}
        </div>
      </div>
    )
  })

  // Add a displayname
  FilterFoods.displayName = "FilterFoods";

  return (
    <div id="menu-container" className="screen-max-width mb-20">
      <SearchBar setMenuData={setMenuData} foodItems={foodItems}  />
      <FilterFoods  />
      <div className="menu-wrapper w-full sm:px-5 lg:px-14 xl:px-20">
        {menuData == [] && <Loading />}
        {menuData == null && <ErrorMessage error={fetchError} />}
        {menuData != [] && menuData != null && 
          menuData.map((e,i) => (
            <FoodCard key={i} e={e} i={i} />
          ))
        }
      </div>
    </div>
  )
}

export default Menu
