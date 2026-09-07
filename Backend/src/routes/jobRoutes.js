const express = require('express')
const router = express.Router()
const jobController = require('../controllers/jobController')

router.post('/create/job', jobController.createJob)
router.get('/jobs', jobController.getAllJobs)
router.get('/jobs/applied', jobController.getAppliedJobs)
router.get('/jobs/saved', jobController.getSavedJobs)
router.get('/jobs/my-jobs', jobController.myJobs)
router.get('/jobs/adzuna', jobController.getAdzunaJobs)
router.put('/jobs/edit/:id', jobController.updateJob)
router.delete('/jobs/:id', jobController.deleteJob)
router.post('/jobs/:id/apply', jobController.applyToJob)
router.post('/jobs/:id/save', jobController.toggleSaveJob)

module.exports = router
