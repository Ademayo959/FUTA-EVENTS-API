const express = require("express")
const dotenv = require("dotenv").config()
const port = process.env.PORT || 8000
const cors = require('cors')
const { rateLimit } = require('express-rate-limit')
const eventRoutes = require('./routes/eventRoutes')
const userRoutes = require('./routes/userRoutes')
const { connectDB } = require("./config/db")

const allowedOrigins = [
  'http://localhost:5173',
  'https://futaevents.vercel.app'
]

const app = express()

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 100, 
  message: "Too many requests, please try again later."
})

app.use(limiter)

const corsOption = {
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1 ) {
      const msg = 'The CORS policy for this site does not allow ccess from the specified origin';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}

app.use(cors(corsOption))
app.use(express.json())
app.use('/events', eventRoutes)
app.use('/user', userRoutes)

app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
    connectDB();
});

