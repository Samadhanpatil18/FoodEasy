const mongoose = require('mongoose');
require('dotenv').config();

const dbUrl = process.env.DB_CONNECTION_URL;

const connectDatabase = async () => {
    try{
        const con = await mongoose.connect(dbUrl);
        console.log("MongoDb connected to host " + con.connection.host);
    }
    catch(err){
        console.log("Data connection Failure");
        console.error(err);
        process.exit(1);
    }
};

module.exports = connectDatabase;