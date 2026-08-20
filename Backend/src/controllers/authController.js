const userModel = require('../models/User');
const bcrypt = require('bcrypt')

const createUser = async (req, res) => {
    try {

        const hashedPassword = await bcrypt.hash(req.body.password, 10)

        const user = await userModel.create({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword,
            role: req.body.role,
        })
        res.status(201).json(user)
    } catch (error) {
        res.status(500).json({
            message: "faild to create user",
            error: error.message
        })
    }
}

module.exports = { createUser }