const mongoose = require('mongoose')

const connectToDB = () => {
    const dbUrl = process.env.DB_URL || "mongodb://127.0.0.1:27017/fetch-metadata"; // Default to local for development
    mongoose.connect(dbUrl).then(() => {
        console.log("Connected to the DataBase");
    })
}

module.exports = connectToDB



