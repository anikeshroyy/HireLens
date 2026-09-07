require('dotenv').config()

const jwt = require('jsonwebtoken')
const jobModel = require('../models/Job')
const userModel = require('../models/User')
const { fetchAdzunaJobs } = require('../services/adzunaService')

const verifyToken = (req) => {
    const token = req.cookies.token
    if (!token) throw { status: 401, message: 'Login required' }
    return jwt.verify(token, process.env.JWT_SECRETS)
}

const parseSkills = (raw, fallback = []) => {
    if (Array.isArray(raw)) return raw
    if (typeof raw === 'string' && raw.trim()) return raw.split(',').map(s => s.trim()).filter(Boolean)
    return fallback
}

const createJob = async (req, res) => {
    try {
        const decoded = verifyToken(req)
        const skills = parseSkills(req.body.skills || req.body.job_skills)

        const job = await jobModel.create({
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
            skills,
        })

        res.status(201).json(job)
    } catch (error) {
        const status = error.status || 500
        res.status(status).json({ message: error.message || 'Failed to create job' })
    }
}

const getAllJobs = async (req, res) => {
    try {
        const jobs = await jobModel.find()
        res.status(200).json(jobs)
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch jobs', error: error.message })
    }
}

const myJobs = async (req, res) => {
    try {
        const decoded = verifyToken(req)
        const jobs = await jobModel.find({ userId: decoded.id })
        res.status(200).json(jobs)
    } catch (error) {
        const status = error.status || 500
        res.status(status).json({ message: error.message || 'Failed to fetch your jobs' })
    }
}

const getAdzunaJobs = async (req, res) => {
    try {
        const { what, where, page } = req.query
        const jobs = await fetchAdzunaJobs({ what, where, page })
        res.status(200).json(jobs)
    } catch (error) {
        res.status(500).json({ message: 'Failed to fetch Adzuna jobs', error: error.message })
    }
}

const updateJob = async (req, res) => {
    try {
        const decoded = verifyToken(req)
        const job = await jobModel.findById(req.params.id)

        if (!job) return res.status(404).json({ message: 'Job not found' })
        if (job.userId.toString() !== decoded.id) return res.status(403).json({ message: 'Unauthorized' })

        const skills = parseSkills(req.body.skills || req.body.job_skills, job.skills)

        const updated = await jobModel.findByIdAndUpdate(
            req.params.id,
            {
                $set: {
                    job_title: req.body.job_title ?? job.job_title,
                    job_publisher: req.body.job_publisher ?? job.job_publisher,
                    job_description: req.body.job_description ?? job.job_description,
                    job_city: req.body.job_city ?? job.job_city,
                    job_country: req.body.job_country ?? job.job_country,
                    job_employment_type: req.body.job_employment_type ?? job.job_employment_type,
                    job_salary: req.body.job_salary ?? job.job_salary,
                    employer_logo: req.body.employer_logo ?? job.employer_logo,
                    skills,
                }
            },
            { new: true, runValidators: true }
        )

        res.status(200).json(updated)
    } catch (error) {
        const status = error.status || 500
        res.status(status).json({ message: error.message || 'Failed to update job' })
    }
}

const deleteJob = async (req, res) => {
    try {
        const decoded = verifyToken(req)
        const job = await jobModel.findById(req.params.id)

        if (!job) return res.status(404).json({ message: 'Job not found' })
        if (job.userId.toString() !== decoded.id) return res.status(403).json({ message: 'Unauthorized' })

        await jobModel.findByIdAndDelete(req.params.id)
        res.status(200).json({ message: 'Job deleted successfully' })
    } catch (error) {
        const status = error.status || 500
        res.status(status).json({ message: error.message || 'Failed to delete job' })
    }
}

const applyToJob = async (req, res) => {
    try {
        const decoded = verifyToken(req)
        const job = await jobModel.findById(req.params.id)

        if (!job) return res.status(404).json({ message: 'Job not found' })

        const alreadyApplied = job.applicants.some(a => a.userId.toString() === decoded.id)
        if (alreadyApplied) return res.status(409).json({ message: 'You have already applied to this job' })

        job.applicants.push({ userId: decoded.id })
        await job.save()

        res.status(200).json({ message: 'Application submitted successfully' })
    } catch (error) {
        const status = error.status || 500
        res.status(status).json({ message: error.message || 'Failed to apply' })
    }
}

const getAppliedJobs = async (req, res) => {
    try {
        const decoded = verifyToken(req)
        const jobs = await jobModel.find({ 'applicants.userId': decoded.id })
        res.status(200).json(jobs)
    } catch (error) {
        const status = error.status || 500
        res.status(status).json({ message: error.message || 'Failed to fetch applied jobs' })
    }
}

const toggleSaveJob = async (req, res) => {
    try {
        const decoded = verifyToken(req)
        const jobId = req.params.id
        const user = await userModel.findById(decoded.id)

        if (!user) return res.status(404).json({ message: 'User not found' })

        if (!user.savedJobs) user.savedJobs = []

        const existingIndex = user.savedJobs.findIndex((item) => item.jobId === String(jobId))
        let isSaved = false

        if (existingIndex > -1) {
            user.savedJobs.splice(existingIndex, 1)
            isSaved = false
        } else {
            user.savedJobs.push({
                jobId: String(jobId),
                jobData: req.body.jobData || {},
                savedAt: new Date()
            })
            isSaved = true
        }

        await user.save()
        res.status(200).json({
            saved: isSaved,
            jobId: String(jobId),
            savedJobs: user.savedJobs,
            message: isSaved ? 'Job saved successfully' : 'Job removed from saved'
        })
    } catch (error) {
        const status = error.status || 500
        res.status(status).json({ message: error.message || 'Failed to toggle save job' })
    }
}

const getSavedJobs = async (req, res) => {
    try {
        const decoded = verifyToken(req)
        const user = await userModel.findById(decoded.id)
        if (!user) return res.status(404).json({ message: 'User not found' })

        res.status(200).json(user.savedJobs || [])
    } catch (error) {
        const status = error.status || 500
        res.status(status).json({ message: error.message || 'Failed to fetch saved jobs' })
    }
}

module.exports = {
    createJob,
    getAllJobs,
    myJobs,
    getAdzunaJobs,
    updateJob,
    deleteJob,
    applyToJob,
    getAppliedJobs,
    toggleSaveJob,
    getSavedJobs
}
