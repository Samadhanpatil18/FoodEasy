const express = require('express');
const router = express.Router();
const { loginUser, registerUser, reqOtp, verifyOtp, resetPassword, checkLogin } = require('../controllers/userController');
const authMiddleware = require('../middleware/auth');

router.post('/login', loginUser);

router.post('/register', registerUser);

router.post('/reqotp', reqOtp);

router.post('/verifyotp', verifyOtp);

router.post('/resetpsw', resetPassword);

router.post('/checklogin', authMiddleware , checkLogin);

module.exports = router;