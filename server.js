const express = require("express")
const dotenv = require("dotenv").config()
const port = process.env.PORT || 8000
const eventRoutes = require('./routes/eventRoutes')
const userRoutes = require('./routes/userRoutes')

const app = express()

app.use('/events', eventRoutes)
app.use('/user', userRoutes)

app.listen(port, () => {console.log(`Server started on port: ${port}`)})