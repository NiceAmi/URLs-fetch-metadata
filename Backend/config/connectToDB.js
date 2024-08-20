require('dotenv').config();
const mongoose = require('mongoose');

const connectToDb = () => {
    mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => {
        console.log("Connected to the database");
    }).catch(err => {
        console.error("Database connection error:", err);
    });
};

module.exports=connectToDb


