const bcrypt = require('bcryptjs')
const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

async function registerUser(req, res) {
    try {
        //Receive name, email, password from req.body
        const { name, email, password } = req.body
        //Check if user already exists with that email
        const userExists = await User.findOne({ email })
        if (userExists) {
            res.json({ message: "User already exists"})
            return;
        }
        //Hash the password with bcrypt
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)
        //Create the user in the database with the hashed password
        const newUser = new User({
            name: name,
            email: email,
            password: hashedPassword
        })
        //saving it to db
        const savedUser = await newUser.save();
        res.json({message: 'user saved'})
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Something went wrong", error: err.message })
    }
}

async function loginUser (req, res) {
    try {
        //Receive name, email, password from req.body
        const { email, password } = req.body
        //Check if user already exists with that email
        const userExists = await User.findOne({ email })
        if (!userExists) {
            res.json({ message: "User doesn't exists"})
            return;
        }
        //check if the password matches
        const passwordMatch = await bcrypt.compare(password, userExists.password)
        if (!passwordMatch) {
            res.json({ message: "Password is wrong"})
            return;
        }
        //generate a JWT Token
        const token = jwt.sign({ id: userExists._id}, process.env.JWT_SECRET, { expiresIn: '1h' })
        //sending the token back 
        res.json({
            name: userExists.name,
            JWTtoken: token
        })
    } catch (err) {
        console.log("Error detected:", err)
        res.status(500).json({ message: "Something went wrong", error: err.message })
    }
}

module.exports = { registerUser, loginUser }