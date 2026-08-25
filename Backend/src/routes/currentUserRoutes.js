const express = require('express')
const router = express.Router()

const currentUserController = require('../controllers/currentUserController')

router.get('/auth/me', currentUserController.getCurrentUser)
router.post('/logout', currentUserController.logoutUser)

module.exports = router