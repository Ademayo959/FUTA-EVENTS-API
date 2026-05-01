const registerUser = (req, res) => {
    res.json({ message: "registering a user" })
}

const loginUser = (req, res) => {
    res.json({ message: "logging a user in" })
}

module.exports = { registerUser, loginUser }