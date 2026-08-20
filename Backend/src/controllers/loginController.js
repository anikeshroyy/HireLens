require('dotenv').config()
const express = require('express')
const userModel = require('../models/User')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')


const loginUser = async (req, res) => {
    try {
        const user = await userModel.findOne({ email: req.body.email })
        if (!user) {
            console.log("email is incorrect")
            return res.send("Either email or password incoreect")
        }

        await bcrypt.compare(req.body.password, user.password, (err, result) => {
            if (!result) return res.send("password not matched")

            const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRETS)

            res.cookie("token", token)
            res.status(200).json({
                message: "User LoggedIn"
            })
        })
    } catch (error) {
        res.status(500).json({
            message: "something went wrong",
            error: error.message
        })
    }
}

module.exports = { loginUser }