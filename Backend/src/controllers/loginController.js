require('dotenv').config()
const express = require('express')
const userModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const loginUser = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (!user) {
            return res.status(401).json({
                message: "Invalid Email or Password"
            })
        }

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password)
        if (!isPasswordCorrect) return res.status(401).json({
            message: "Invalid Email or Password"
        })

        const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRETS)

        const isProduction = process.env.NODE_ENV === "production";

        res.cookie("token", token, {
            httpOnly: true,
            secure: isProduction,
            sameSite: isProduction ? "none" : "lax",
            maxAge: 24 * 60 * 60 * 1000,
        });
        
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