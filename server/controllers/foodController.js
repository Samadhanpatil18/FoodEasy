const express = require('express');
const app = express();
const FoodItem = require('../models/foodModel');

// get all dishes from the menus collection
const getFoodItems = async (req,res) => {
    try{
        const foodItems = await FoodItem.aggregate([
          {
            $addFields: {
              isIconic: { $in: ["Iconic", "$tags"] }
            }
          },
          {
            $sort: { isIconic: -1 } // Sort by iconic dishes first
          }
        ]);
        res.send(foodItems);
    }
    catch(err){
        res.send(err);
    }
}

const addFoodItem = async (req, res) => {

  try {
    // Ensure all required fields are received from the request
    const {
        food_id,
        title,
        description,
        rating,
        price,
        image_url,
        quantity,
        category,
        availability,
        spiciness_level,
        tags,
        discount,
    } = req.body;

    const newFoodItem = new FoodItem({
      food_id,
      title,
      description,
      rating,
      price,
      image_url,
      quantity,
      category,
      availability,
      spiciness_level,
      tags,
      discount,
    })
    await newFoodItem.save();
    return res.status(201).json({ success: true, message: 'New food item added successfully' });
  } catch(err) {
    console.log(err)
    return res.status(501).json({success:false, message:'Error'});
  }
} 

// Modify the food availability
const modifyAvailability = async (req, res) => {
  const {status, foodId} = req.body;

  try{
    await FoodItem.findByIdAndUpdate(foodId, {availability:status});
    return res.json({success:true, message:"Status Updated"});
  } catch(err) {
      console.log(err);
      return res.json({success:false, message:"Error"});
  }
}

module.exports = {
    getFoodItems,
    addFoodItem,
    modifyAvailability
}