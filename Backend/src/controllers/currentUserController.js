require('dotenv').config()

const userModel = require('../models/User')

const jwt = require('jsonwebtoken')

const getCurrentUser = async (req, res) => {
    try {
        const cookie = req.cookies.token

        if (!cookie) {
            return res.status(401).json({
                message: "Login please to access Dashboard"
            })
        }

        const decoded = jwt.verify(cookie, process.env.JWT_SECRETS)

        const currentUser = await userModel.findById(decoded.id)
        if (!currentUser) {
            return res.status(401).json({
                message: "User Not Found"
            })
        }

        return res.status(200).json({
            message: "User Found",
            user: {
                "userId": currentUser._id,
                "name": currentUser.name,
                "email": currentUser.email,
                "role": currentUser.role,
                "avatar": currentUser.avatar,
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error: error.message
        })
    }
}

module.exports = { getCurrentUser }