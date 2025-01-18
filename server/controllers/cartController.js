const userModel = require('../models/userModel');

// add items to user cart
const addToCart = async (req, res) => {
    try{
        
        let userData = await userModel.findOne({_id : req.body.userId});
        let cartData = await userData.cartData;
        
        if(!cartData[req.body.itemId]) {
            cartData[req.body.itemId] = 1;
        }
        else{
            cartData[req.body.itemId] += 1;
        }
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success : true, message : "Item added to cart successfully!"})

    } catch (err) {
        console.log(err);
        return res.json({success:false, message:"Error"});
    }
}

// remove items to user cart
const removeFromCart = async (req, res) => {
    try{
        
        let userData = await userModel.findOne({_id : req.body.userId});
        let cartData = await userData.cartData;
        
        if(cartData[req.body.itemId] > 0) {
            cartData[req.body.itemId] -= 1;
        }
        
        await userModel.findByIdAndUpdate(req.body.userId, {cartData});
        res.json({success : true, message : "Item removed from cart successfully!"})

    } catch (err) {
        console.log(err);
        return res.json({success:false, message:"Error"});
    }
}

// fetch user cart Data
const getCartItems = async (req, res) => {
    try{
        
        let userData = await userModel.findOne({_id : req.body.userId});
        let cartData = await userData.cartData;
        
        res.json({success : true, cartData})

    } catch (err) {
        console.log(err);
        return res.json({success:false, message:"Error"});
    }
}

module.exports = {
    addToCart,
    removeFromCart,
    getCartItems
}