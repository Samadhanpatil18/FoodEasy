/* eslint-disable react/prop-types */
import Hero from "../components/home/Hero"
import { useEffect, useContext } from "react";
import '../assets/styles/home.css'
import TopDishes from "../components/home/TopDishes";
import Carousel from "../components/home/Carousel";
import FoodCategories from "../components/home/FoodCategories";
import { StoreContext } from '../context/StoredContextProvider'

const Home = () => {

  const { setActiveLink } = useContext(StoreContext);

  useEffect(() => {
    setActiveLink('home');
  },[]);

  return (
    <>
      <Hero />
      <TopDishes />
      <Carousel />
      <FoodCategories />
    </>
  )
}

export default Home;