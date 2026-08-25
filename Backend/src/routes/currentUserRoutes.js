const express = require('express')
const router = express.Router()

const currentUserController = require('../controllers/currentUserController')

router.get('/auth/me', currentUserController.getCurrentUser)

module.exports = router