const express = require('express');
const authController = require('../controllers/authController');
const updateUserController = require('../controllers/updateUserController')
const router = express.Router()

router.post('/create/user', authController.createUser)
router.put('/update-profile', updateUserController.updateUser)

module.exports = router;
