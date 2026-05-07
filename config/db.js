const mongoose = require('mongoose')

async function connectDB() {
    console.log("connectDB called")
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("MongoDB connected")
    } catch (err) {
        console.log("Error detected:", err)
    }
}

module.exports = { connectDB }