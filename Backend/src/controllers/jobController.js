const SavedJob = require('../models/SavedJob');
const User = require('../models/User');

// Save a job
exports.saveJob = async (req, res) => {
    try {
        const { userId, job } = req.body;

        if (!userId || !job || !job.job_id) {
            return res.status(400).json({ error: 'User ID and Job details are required' });
        }

        // Verify user exists
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Create or update saved job to prevent duplicate records
        const savedJob = await SavedJob.findOneAndUpdate(
            { userId, jobId: job.job_id },
            {
                userId,
                jobId: job.job_id,
                employer_name: job.employer_name,
                employer_logo: job.employer_logo,
                job_publisher: job.job_publisher,
                job_title: job.job_title,
                job_apply_link: job.job_apply_link,
                job_description: job.job_description,
                job_city: job.job_city,
                job_country: job.job_country,
                job_employment_type: job.job_employment_type,
                matchScore: job.matchScore,
                matchedSkills: job.matchedSkills || [],
                missingSkills: job.missingSkills || [],
                savedAt: new Date()
            },
            { upsert: true, new: true }
        );

        console.log(`Job saved: User ${userId} saved Job ${job.job_id}`);

        return res.json({
            status: 'success',
            data: savedJob
        });

    } catch (error) {
        console.error('Error in saveJob controller:', error.message);
        return res.status(500).json({ error: 'Failed to save job: ' + error.message });
    }
};

// Remove a saved job
exports.unsaveJob = async (req, res) => {
    try {
        const { userId, jobId } = req.body;

        if (!userId || !jobId) {
            return res.status(400).json({ error: 'User ID and Job ID are required' });
        }

        const deletedJob = await SavedJob.findOneAndDelete({ userId, jobId });

        if (!deletedJob) {
            return res.status(404).json({ error: 'Saved job record not found' });
        }

        console.log(`Job unsaved: User ${userId} removed Job ${jobId}`);

        return res.json({
            status: 'success',
            message: 'Job removed from bookmarks'
        });

    } catch (error) {
        console.error('Error in unsaveJob controller:', error.message);
        return res.status(500).json({ error: 'Failed to unsave job: ' + error.message });
    }
};

// Get all saved jobs for a user
exports.getSavedJobs = async (req, res) => {
    try {
        const { userId } = req.params;

        if (!userId) {
            return res.status(400).json({ error: 'User ID is required' });
        }

        const savedJobs = await SavedJob.find({ userId }).sort({ savedAt: -1 });

        return res.json({
            status: 'success',
            data: savedJobs
        });

    } catch (error) {
        console.error('Error in getSavedJobs controller:', error.message);
        return res.status(500).json({ error: 'Failed to fetch saved jobs: ' + error.message });
    }
};
