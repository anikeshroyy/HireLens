const jobModel = require('../models/Job')

const createJob = async (req, res) => {
    try {
        let job = await jobModel.create({
            userId: "6a84219cde5f8544080d0554",
            jobId: req.body.jobId,
            employer_logo: req.body.employer_logo,
            job_publisher: req.body.job_publisher,
            job_title: req.body.job_title,
            job_description: req.body.job_description,
            job_city: req.body.job_city,
            job_country: req.body.job_country,
            job_employment_type: req.body.job_employment_type,
            job_salary: req.body.job_salary,
            skill: "Java"
        })
        res.status(201).json(job)
    } catch (error) {
        res.status(500).json({
            message: "failed to create job",
            errpr: error.message
        })
    }
}

module.exports = { createJob }
