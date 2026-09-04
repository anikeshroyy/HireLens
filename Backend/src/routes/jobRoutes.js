const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');

// POST /api/jobs/save
router.post('/create/job', jobController.createJob);
router.get('/jobs', jobController.getAllJobs)
router.get('/jobs/my-jobs', jobController.myJobs)
router.get('/jobs/adzuna', jobController.getAdzunaJobs)
router.put('/jobs/edit/:id', jobController.updateJob)

module.exports = router;
