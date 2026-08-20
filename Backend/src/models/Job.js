const mongoose = require('mongoose')

const jobSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobId: {
        type: String,
        required: true
    },
    employer_logo: {
        type: String
    },
    job_publisher: {
        type: String,
        required: true,
    },
    job_title: {
        type: String,
        required: true
    },
    job_description: {
        type: String
    },
    job_city: {
        type: String
    },
    job_country: {
        type: String
    },
    job_employment_type: {
        type: String,
        required: true
    },
    job_salary: {
        type: String,
    },
    skills: [],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model("job", jobSchema)
