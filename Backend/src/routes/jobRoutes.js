const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// POST /api/jobs/save
router.post('/save', jobController.saveJob);

// POST /api/jobs/unsave
router.post('/unsave', jobController.unsaveJob);

// GET /api/jobs/saved/:userId
router.get('/saved/:userId', jobController.getSavedJobs);

module.exports = router;
