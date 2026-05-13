const jwt = require('jsonwebtoken')

async function protect(req, res, next) {
    try {
        const authHeader = req.headers.authorization
        if (!authHeader) {
            return res.json({ message: "Error: No token found" })
        }
        const token = authHeader.split(" ")[1]
        if (!token) {
            res.json({ message: "Error: No JWTToken found"})
        }
        const decodedPayload = jwt.verify(token, process.env.JWT_SECRET)
        req.user = decodedPayload
        next()

    } catch (err) {
        console.log("Error detected:", err)
        res.json({ message: "Not authorized, token invalid" })
    }
}

module.exports = { protect }