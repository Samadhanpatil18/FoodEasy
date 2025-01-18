const userModel = require('../models/userModel');
const orderModel = require('../models/orderModel');
require('dotenv').config();

 const Stripe = require('stripe');
 const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

const getOrders = async (req, res) => {
    try{
        const orders = await orderModel.find({});
        return res.status(200).json({success:true, orders});
    } catch (err) {
        console.log(err);
        return res.status(501).json({success:false, message:"Error"});
    }
}

// Place the order
const placeOrder = async (req, res) => {

    const frontend_url = `${process.env.FRONTEND_URL}`              //frontend Api

    try{
        const newOrder = new orderModel({
            userId: req.body.userId,
            items: req.body.items,
            amount: req.body.amount,
            address: req.body.address
        })
        
        await newOrder.save();
        await userModel.findByIdAndUpdate(req.body.userId, {cartData:{}});

        const line_items = req.body.items.map((item) => ({
            price_data : {
                currency : "inr",
                product_data: {
                    name: item.title,
                },
                unit_amount : item.discount.is_discounted ? (item.price - Math.round(item.price / item.discount.discount_percentage)) * 100 : item.price * 100,
            },
            quantity : item.quantity
        }))

        line_items.push({
            price_data : {
                currency : "inr",
                product_data : {
                    name : "Delivery Charges"
                },
                unit_amount : 50 * 100,
            },
            quantity : 1
        })

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items : line_items,
            mode : "payment",
            success_url : `${frontend_url}/cart/order/verify?success=true&orderId=${newOrder._id}`,
            cancel_url : `${frontend_url}/cart/order/verify?success=false&orderId=${newOrder._id}`,
        })

        res.json({success:true, session_url: session.url});

    } catch(err) {
        console.log(err);
        return res.json({success:false, message:"Error"});
    }
}

// verify the order payment
const verifyOrder = async (req,res) => {
    const { success, orderId } = req.body;
    try{
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            return res.json({success:true, message:"Paid"});
        }
        else{
            await orderModel.findByIdAndUpdate(orderId, {payment:false})
            return res.json({success:false, message:"Not paid"})
        }
    } catch (err) {
        console.log(err);
        return res.json({success:false, message:"Error"});
    }
}

// get Users Order for frontend
const getUserOrders = async (req, res) => {
    try{
        const orders = await orderModel.find({userId:req.body.userId});
        return res.json({success:true,data:orders});
    } catch(err) {
        console.log(err);
        return res.json({success:false, message: "Error"});
    }
}

const statusUpdate = async (req, res) => {
    const { status, orderId } = req.body;

    try{
        await orderModel.findByIdAndUpdate(orderId, {status:status});
        return res.json({success:true, message:"Status Updated"});
    } catch(err) {
        console.log(err);
        return res.json({success:false, message:"Error"});
    }
}

module.exports = {
    getOrders,
    placeOrder,
    verifyOrder,
    getUserOrders,
    statusUpdate,
}