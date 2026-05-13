const express = require("express")
const dotenv = require("dotenv").config()
const port = process.env.PORT || 8000
const { rateLimit } = require('express-rate-limit')
const eventRoutes = require('./routes/eventRoutes')
const userRoutes = require('./routes/userRoutes')
const { connectDB } = require("./config/db")

const app = express()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: "Too many requests, please try again later."
})

app.use(limiter)

app.use(express.json())
app.use('/events', eventRoutes)
app.use('/user', userRoutes)

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
    connectDB();
});

