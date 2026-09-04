require('dotenv').config()

const jobModel = require('../models/Job')

const jwt = require('jsonwebtoken');
const { findById } = require('../models/User');

const { fetchAdzunaJobs } = require('../services/adzunaService');

const createJob = async (req, res) => {
    try {

        const cookie = req.cookies.token;
        if (!cookie) {
            return res.status(401).json({
                message: "Login please to create job"
            })
        }

        const decoded = jwt.verify(cookie, process.env.JWT_SECRETS)

        const rawSkills = req.body.skills || req.body.job_skills;
        let formattedSkills = [];
        if (Array.isArray(rawSkills)) {
            formattedSkills = rawSkills;
        } else if (typeof rawSkills === 'string' && rawSkills.trim().length > 0) {
            formattedSkills = rawSkills.split(',').map(s => s.trim()).filter(Boolean);
        }

        let job = await jobModel.create({
            userId: decoded.id,
            jobId: req.body.jobId || req.body.job_id || `JOB-${Date.now()}`,
            employer_logo: req.body.employer_logo,
            job_publisher: req.body.job_publisher,
            job_title: req.body.job_title,
            job_description: req.body.job_description,
            job_city: req.body.job_city,
            job_country: req.body.job_country,
            job_employment_type: req.body.job_employment_type,
            job_salary: req.body.job_salary,
            skills: formattedSkills
        })
        res.status(201).json(job)
    } catch (error) {
        res.status(500).json({
            message: "failed to create job",
            error: error.message
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


const myJobs = async (req, res) => {
    try {
        const cookie = req.cookies.token;
        if (!cookie) {
            return res.status(401).json({
                message: "Login please to create job"
            })
        }

        const decoded = jwt.verify(cookie, process.env.JWT_SECRETS);

        const jobsByRecruiter = await jobModel.find({ userId: decoded.id });

        return res.status(200).json(jobsByRecruiter)
    }

    catch (error) {
        res.status(500).json({
            error: error.message
        })
    }
}

const getAdzunaJobs = async (req, res) => {
    try {
        const { what, where, page } = req.query;
        const jobs = await fetchAdzunaJobs({ what, where, page });
        return res.status(200).json(jobs);
    } catch (error) {
        return res.status(500).json({
            message: "Failed to fetch Adzuna jobs",
            error: error.message
        });
    }
};

module.exports = { createJob, getAllJobs, myJobs, getAdzunaJobs }
