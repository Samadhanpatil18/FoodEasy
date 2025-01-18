const express = require('express');
const router = express.Router();
const { getFoodItems, addFoodItem, modifyAvailability } = require('../controllers/foodController')
const menu = require('../mockdata.js')
router.get('/menu', async (req, res, next)=> {
  res.send(menu);
  next()
});
router.post('/add', addFoodItem);

router.post('/available', modifyAvailability);

module.exports = router;