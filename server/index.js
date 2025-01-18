const express = require('express');
const app = express();
const dbConnection = require('./config/dbConnection');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const foodRouter = require('./routes/foodRoute');
const userRouter = require('./routes/userRoute');
const cartRouter = require('./routes/cartRoute');
const orderRouter = require('./routes/orderRoute');
const adminRouter = require('./routes/adminRoute');
const menu = require('./mockdata.js')

require('dotenv').config();

// Connecting to the Database
dbConnection();

app.use(cors())

app.use(cookieParser());
app.use(express.json());

// Api Endpoints
app.use('/api/food', foodRouter);
app.use('/api/user', userRouter);
app.use('/api/cart', cartRouter);
app.use('/api/order', orderRouter);
app.use('/api/admin', adminRouter);



app.get('/', (req,res) => {
    res.send("<h1>Meal Mate Restaurant API</h1>");
})


const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server Listen at PORT ${PORT}`);
});
