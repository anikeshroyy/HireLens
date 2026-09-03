require('dotenv').config()
const jwt = require('jsonwebtoken')
const userModel = require('../models/User')

const updateUser = async (req, res) => {
    try {
        const cookie = req.cookies.token;
        if (!cookie) {
            return res.status(401).json({
                message: "Login please to update user"
            })
        }

        const decoded = jwt.verify(cookie, process.env.JWT_SECRETS)
        const updatedUser = await userModel.findByIdAndUpdate(decoded.id, {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            city: req.body.city
        },
            {
                new: true,
                runValidators: true
            })
        return res.status(200).json(updatedUser)
    } catch (error) {
        res.status(500).json({
            message: "failed to update user",
            error: error.message
        })
    }
}

module.exports = { updateUser }