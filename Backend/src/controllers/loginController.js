require('dotenv').config()
const express = require('express')
const userModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const loginUser = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (!user) {
            console.log("Email is incorrect")
            return res.status(401).json({
                message: "Invalid Email or Password"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) return res.status(401).json({
            message: "Invalid Email or Password"
        })

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRETS)

        res.cookie("token", token)
        res.status(200).json({
            message: "User LoggedIn",
            user: {
                userId: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                avatar: user.avatar,
            },
        })
    }
    catch (error) {
        res.status(500).json({
            message: "something went wrong",
            error: error.message
        })
    }
}

module.exports = { loginUser }