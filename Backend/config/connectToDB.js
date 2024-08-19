
const mongoose = require('mongoose');

const connectToDb = () => {
    mongoose.connect("mongodb://127.0.0.1:27017/fetch-metadata").then(()=>{
        console.log("Connected to the database");
    })
};

module.exports = connectToDb;



