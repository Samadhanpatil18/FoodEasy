const jwt = require('jsonwebtoken');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const userModel = require('../models/userModel');
const randomstring = require('randomstring');
const nodemailer = require('nodemailer');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();

app.use(cookieParser());

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

const otpCache = {};

function generateOTP() {
  return randomstring.generate({ length: 4, charset: 'numeric' });
}

function sendOTP(email, otp) {
  const mailOptions = {
      from: 'foodeasynashik@gmail.com', // Your Email Id
      to: email,
      subject: 'OTP Verification',
      text: `Your OTP for verification is:${otp}`
  };

  let transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: 'foodeasynashik@gmail.com', // Your Email Id
          pass: 'vqog igia yhsg anyx' // Your Password
      },
      tls: {
              rejectUnauthorized: false // Disable certificate validation (if necessary)
        }
  });

  transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
          console.log('Error occurred:', error);
          return false
      } else {
          console.log('OTP Email sent successfully:', info.response);
          return true
      }
  });
}


const loginUser = async (req, res, next) => {

    const { email, password } = req.body;
    try {
        // checking is user already exists
        const user = await userModel.findOne({email});

        if(!user){
            return res.json({success:false,message : "User Doesn't Exist!"});
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if(!isMatch){
            return res.json({success:false,message : "Invalid Credentials"});
        }

        const token = createToken(user._id);
        
        res.json({success : true, token, username : user.username});

    } catch(err){
        console.log(err);
        res.json({success:false,message:"Error"});
    }
}

const registerUser = async (req, res, next) => {

    const { username, email, password } = req.body;
    try {
        // checking is user already exists
        const exist = await userModel.findOne({email});
        if (exist) {
            return res.json({success:false, message:"User already exists"});
        }

        // validating email format & strong password
        if (!validator.isEmail(email)) {
            return res.json({success:false, message:"Please Enter Valid Email"})
        }

        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            username : username,
            email : email,
            password : hashedPassword
        })

        const user = await newUser.save();
        const token = createToken(user._id);
        res.json({success:true, token});
        
    } catch(err) {
        console.log(err);
        res.json({success:false, message:"Error"})
    }
}

const reqOtp = async (req, res, next) => {
    
    const { email } = req.body;

    const user = await userModel.findOne({email});

    if(user){
        const otp = generateOTP();
        otpCache[email] = otp; // Store OTP in cache

        // Send OTP via email
        const success = sendOTP(email, otp);
        res.cookie('otpCache', otpCache, { maxAge: 50000, httpOnly: true }); 
        return res.json({success : true, message : "OTP Sent"})
    }

    return res.json({success:false, message:"Email doesn't exist"});
}

const verifyOtp = async (req, res, next) => {
    const { email, otp } = req.body;

    // Check if email exists in the cache
    
    if (!otpCache.hasOwnProperty(email)) {
        return res.json({ success: false, message: 'Session Expired, try again' });
    }

    // Check if OTP matches the one stored in the cache
    if (otpCache[email] === otp.trim()) {
        // Remove OTP from cache after successful verification
        delete otpCache[email];
        const user = await userModel.findOne({email})
        if(user){
            const auth_token = createToken(user._id);
            return res.status(200).json({ success: true, message: 'OTP verified', auth_token : auth_token });
        }
        else{
            return  res.status(200).json({ success: false, message: 'Invalid OTP' });
        }
    } else {
        return  res.status(200).json({ success: false, message: 'Invalid OTP' });
    }
}

const resetPassword = async (req, res) => {
    const { newpassword, auth_token } = req.body

    if(newpassword.length < 5){
        return res.json({success:false, message:"Password Lenght to be minimum 6 characters"});
    }

    const token_decode = jwt.verify(auth_token, process.env.JWT_SECRET);
    const userId = token_decode.id;

    if(!userId){
        res.json({success : false, message : "Something Error"});
    }

    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds);
    const hashedPassword = await bcrypt.hash(newpassword, salt);

    try{
        await userModel.findByIdAndUpdate(userId, {password : hashedPassword});
        return res.json({success:true, message: "Password Changed successfully!"});
    } catch(err) {
        res.json({success : false, message : "Something Error"});
    }
}

const checkLogin = (req, res) => {

    return res.json({success : true, message : "user already logged in"});
}

module.exports = {
    loginUser,
    registerUser, 
    reqOtp, 
    verifyOtp, 
    resetPassword,
    checkLogin,
}