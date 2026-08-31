require('dotenv').config()

const jobModel = require('../models/Job')

const jwt = require('jsonwebtoken')

const createJob = async (req, res) => {
    try {

        const cookie = req.cookies.token;
        if (!cookie) {
            res.status(401).json({
                message: "Login please to create job"
            })
        }

        const decoded = jwt.verify(cookie, process.env.JWT_SECRETS)

        let job = await jobModel.create({
            userId: decoded.id,
            jobId: req.body.jobId,
            employer_logo: req.body.employer_logo,
            job_publisher: req.body.job_publisher,
            job_title: req.body.job_title,
            job_description: req.body.job_description,
            job_city: req.body.job_city,
            job_country: req.body.job_country,
            job_employment_type: req.body.job_employment_type,
            job_salary: req.body.job_salary,
            skills: req.body.skills
        })
        res.status(201).json(job)
    } catch (error) {
        res.status(500).json({
            message: "failed to create job",
            errpr: error.message
        })
    }
}

const getAllJobs = async (req, res) => {
    try {
        const alljobs = await jobModel.find()
        return res.status(200).json(alljobs)
    } catch (error) {
        return res.status(500).json({
            message: "failed to fetch job",
            errpr: error.message
        })
    }
}

module.exports = { createJob, getAllJobs }
