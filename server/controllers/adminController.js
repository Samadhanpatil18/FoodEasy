const adminModel = require('../models/adminModel');
const jwt = require('jsonwebtoken');

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET);
}

const adminLogin = async (req, res) => {
    const { id, password } = req.body;
    console.log('in login');
    const admin = await adminModel.findOne({id, password});
    
    if(admin){
        const token = createToken(admin._id);
        return res.json({success:true, message : "Login Successfully!", token}); 
    }
    return res.json({success:false, message:"Invalid Credential"});
}

module.exports = {
    adminLogin
}