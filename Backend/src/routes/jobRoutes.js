const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// POST /api/jobs/save
router.post('/create/job', jobController.createJob);

module.exports = router;
