const mongoose = require('mongoose');

const SavedJobSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    jobId: {
        type: String,
        required: true
    },
    employer_name: {
        type: String
    },
    employer_logo: {
        type: String
    },
    job_publisher: {
        type: String
    },
    job_title: {
        type: String
    },
    job_apply_link: {
        type: String
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
        type: String
    },
    matchScore: {
        type: Number
    },
    matchedSkills: [String],
    missingSkills: [String],
    savedAt: {
        type: Date,
        default: Date.now
    }
});

// Ensure a user can only save a specific job ID once
SavedJobSchema.index({ userId: 1, jobId: 1 }, { unique: true });

module.exports = mongoose.model('SavedJob', SavedJobSchema);
