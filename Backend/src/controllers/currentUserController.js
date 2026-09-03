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
                "phone": currentUser.phone,
                "city": currentUser.city,
                "bio": currentUser.bio,
                "skills": currentUser.skills,
                "resume": currentUser.resume,
                "companyName": currentUser.companyName,
                "companyWebsite": currentUser.companyWebsite
            }
        })

    } catch (error) {
        return res.status(500).json({
            message: "Something Went Wrong",
            error: error.message
        })
    }
}

const updateUserProfile = async (req, res) => {
    try {
        const cookie = req.cookies.token;
        if (!cookie) {
            return res.status(401).json({ message: "Login please to access Dashboard" });
        }

        const decoded = jwt.verify(cookie, process.env.JWT_SECRETS);
        const userId = decoded.id;

        const { name, avatar, phone, city, bio, skills, resume, companyName, companyWebsite } = req.body;

        const updatedFields = {};
        if (name !== undefined) updatedFields.name = name;
        if (avatar !== undefined) updatedFields.avatar = avatar;
        if (phone !== undefined) updatedFields.phone = phone;
        if (city !== undefined) updatedFields.city = city;
        if (bio !== undefined) updatedFields.bio = bio;
        if (skills !== undefined) updatedFields.skills = skills;
        if (resume !== undefined) updatedFields.resume = resume;
        if (companyName !== undefined) updatedFields.companyName = companyName;
        if (companyWebsite !== undefined) updatedFields.companyWebsite = companyWebsite;

        const updatedUser = await userModel.findByIdAndUpdate(
            userId,
            { $set: updatedFields },
            { new: true, runValidators: true }
        );

        if (!updatedUser) {
            return res.status(404).json({ message: "User Not Found" });
        }

        return res.status(200).json({
            message: "Profile updated successfully",
            user: {
                userId: updatedUser._id,
                name: updatedUser.name,
                email: updatedUser.email,
                role: updatedUser.role,
                avatar: updatedUser.avatar,
                phone: updatedUser.phone,
                city: updatedUser.city,
                bio: updatedUser.bio,
                skills: updatedUser.skills,
                resume: updatedUser.resume,
                companyName: updatedUser.companyName,
                companyWebsite: updatedUser.companyWebsite
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: "Failed to update profile",
            error: error.message
        });
    }
}

const logoutUser = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: true,
            sameSite: "none"
        });

        return res.status(200).json({
            message: "Cookies are cleared"
        });

    } catch (error) {
        return res.status(500).json({
            message: "Something Went Wrong",
            error: error.message
        })
    }
}

module.exports = { getCurrentUser, updateUserProfile, logoutUser }