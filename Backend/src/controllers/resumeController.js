const axios = require('axios');

/**
 * Fallback generator to simulate job matches when RAPIDAPI_KEY is not provided
 */
const getSimulatedJobs = (profileType, candidateSkills) => {
    console.log('Generating simulated jobs as fallback...');
    const mockJobs = [
        {
            job_id: "mock_1",
            employer_name: "Google (Demo)",
            employer_logo: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_\"G\"_logo.svg/1200px-Google_\"G\"_logo.svg.png",
            job_publisher: "Google Careers",
            job_employment_type: "FULLTIME",
            job_title: `Software Engineer - ${profileType || 'Full Stack'}`,
            job_apply_link: "https://careers.google.com",
            job_description: "Seeking an experienced engineer to join our web team. You will write code, scale infrastructure, and collaborate across teams.",
            job_city: "Mountain View",
            job_state: "CA",
            job_country: "US",
            job_required_skills: ["React", "Node.js", "JavaScript", "HTML5", "Git"]
        },
        {
            job_id: "mock_2",
            employer_name: "Meta (Demo)",
            employer_logo: "https://upload.wikimedia.org/wikipedia/commons/7/7b/Meta_Platforms_Inc._logo.svg",
            job_publisher: "LinkedIn",
            job_employment_type: "FULLTIME",
            job_title: `${profileType || 'Software Developer'} (React & Node)`,
            job_apply_link: "https://metacareers.com",
            job_description: "We are seeking developers who love building responsive and scalable applications. Standard stack includes React, Node.js, and databases.",
            job_city: "Remote",
            job_state: null,
            job_country: "US",
            job_required_skills: ["React.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Git"]
        },
        {
            job_id: "mock_3",
            employer_name: "Stripe (Demo)",
            employer_logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_blue.svg",
            job_publisher: "Indeed",
            job_employment_type: "FULLTIME",
            job_title: `Backend Software Developer (${profileType || 'Web'})`,
            job_apply_link: "https://stripe.com/jobs",
            job_description: "Stripe builds economic infrastructure for the internet. Come work on reliable APIs, databases, payment gateways, and core services.",
            job_city: "San Francisco",
            job_state: "CA",
            job_country: "US",
            job_required_skills: ["Node.js", "Python", "SQL", "PostgreSQL", "Firebase", "Docker"]
        },
        {
            job_id: "mock_4",
            employer_name: "Vercel (Demo)",
            employer_logo: null,
            job_publisher: "GitHub Jobs",
            job_employment_type: "FULLTIME",
            job_title: `Frontend Engineer - Next.js`,
            job_apply_link: "https://vercel.com/careers",
            job_description: "Vercel provides developer tools and hosting. Looking for frontend enthusiasts who excel in React, Next.js, HTML, CSS, and Git workflows.",
            job_city: "Remote",
            job_state: null,
            job_country: "US",
            job_required_skills: ["React", "Next.js", "Tailwind CSS", "JavaScript", "HTML5", "CSS3", "Git"]
        }
    ];

    return mockJobs.map(job => {
        const textToSearch = `${job.job_title} ${job.job_description} ${job.job_required_skills.join(' ')}`.toLowerCase();
        
        // Find matching skills
        const matchedSkills = candidateSkills.filter(skill => 
            textToSearch.includes(skill.toLowerCase())
        );

        // Find missing skills
        const missingSkills = job.job_required_skills.filter(reqSkill => 
            !candidateSkills.some(skill => skill.toLowerCase() === reqSkill.toLowerCase())
        );

        // Score based on matching density
        let matchScore = 0;
        if (job.job_required_skills.length > 0) {
            matchScore = Math.round((matchedSkills.length / Math.min(candidateSkills.length || 1, 6)) * 100);
        }
        // Bound matching scores reasonably between 40% and 95%
        matchScore = Math.max(45, Math.min(matchScore + 20, 95));

        return {
            ...job,
            matchedSkills: matchedSkills.slice(0, 5),
            missingSkills: missingSkills.slice(0, 5),
            matchScore
        };
    }).sort((a, b) => b.matchScore - a.matchScore);
};

/**
 * Handle resume upload, forward it to Hugging Face ML Space API,
 * fetch relevant jobs from JSearch (RapidAPI) based on candidate profile,
 * score the matches, and return the final compilation.
 */
exports.uploadResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        console.log(`Received file: ${req.file.originalname} (${req.file.size} bytes)`);

        // 1. Pack and forward PDF to ML parser service
        const formData = new FormData();
        const blob = new Blob([req.file.buffer], { type: req.file.mimetype });
        formData.append('resume', blob, req.file.originalname);

        const mlUrl = process.env.ML_API_URL || 'https://anikeshroyy-resume-parser.hf.space/extract';
        console.log(`Forwarding to ML API: ${mlUrl}`);

        const response = await axios.post(mlUrl, formData);
        console.log('Successfully received extraction response from ML API');

        const extractedData = response.data.data;
        if (!extractedData) {
            return res.status(500).json({ error: 'Parser returned empty dataset.' });
        }

        const candidateSkills = extractedData.skills || [];
        const profileType = extractedData.profile_type || 'Software Developer';

        // 2. Fetch Jobs from API or fallback to simulation
        let matchedJobs = [];
        let isDemoMode = false;
        
        const provider = (process.env.JOB_PROVIDER || '').toLowerCase().trim();
        const apiKey = process.env.RAPIDAPI_KEY;
        const apiHost = process.env.RAPIDAPI_HOST || 'jsearch.p.rapidapi.com';
        const adzunaAppId = process.env.ADZUNA_APP_ID;
        const adzunaAppKey = process.env.ADZUNA_APP_KEY;

        let useAdzuna = false;
        if (provider === 'adzuna') {
            useAdzuna = true;
        } else if (provider === 'jsearch') {
            useAdzuna = false;
        } else {
            // Auto-detect based on what keys are configured
            if ((!apiKey || apiKey.trim() === '') && (adzunaAppId && adzunaAppId.trim() !== '' && adzunaAppKey && adzunaAppKey.trim() !== '')) {
                useAdzuna = true;
            }
        }

        if (useAdzuna) {
            if (!adzunaAppId || adzunaAppId.trim() === '' || !adzunaAppKey || adzunaAppKey.trim() === '') {
                console.log('Adzuna provider selected but credentials not found. Defaulting to Demo Mode.');
                isDemoMode = true;
                matchedJobs = getSimulatedJobs(profileType, candidateSkills);
            } else {
                try {
                    const country = (process.env.ADZUNA_COUNTRY || 'us').toLowerCase().trim();
                    const query = `${profileType}`;
                    console.log(`Querying Adzuna API (${country}) with term: "${query}"`);

                    const adzunaResponse = await axios.get(`https://api.adzuna.com/v1/api/jobs/${country}/search/1`, {
                        params: {
                            app_id: adzunaAppId,
                            app_key: adzunaAppKey,
                            what: query,
                            results_per_page: 6,
                            'content-type': 'application/json'
                        }
                    });

                    const rawJobs = adzunaResponse.data.results || [];
                    console.log(`Adzuna returned ${rawJobs.length} raw jobs`);

                    // Map Adzuna results to standardized schema
                    matchedJobs = rawJobs.map(job => {
                        const jobTitle = job.title || '';
                        const jobDescription = job.description || '';
                        const contentToSearch = `${jobTitle} ${jobDescription}`.toLowerCase();

                        // Find matching candidate skills
                        const matched = candidateSkills.filter(skill => 
                            contentToSearch.includes(skill.toLowerCase())
                        );

                        // Find missing skills (Adzuna doesn't provide a list of req skills, fallback to common ones)
                        const commonSkills = ["React", "JavaScript", "Node.js", "Python", "SQL", "TypeScript", "Git"];
                        const missing = commonSkills.filter(reqSkill => 
                            !candidateSkills.some(skill => skill.toLowerCase() === reqSkill.toLowerCase())
                        );

                        // Score calculation
                        let matchScore = 0;
                        if (candidateSkills.length > 0) {
                            matchScore = Math.round((matched.length / Math.min(candidateSkills.length, 6)) * 100);
                        } else {
                            matchScore = 50; 
                        }

                        // Boost if candidate's main profile matches the job title keywords
                        if (jobTitle.toLowerCase().includes(profileType.toLowerCase())) {
                            matchScore += 15;
                        }

                        // Constrain score between 20% and 99%
                        matchScore = Math.max(20, Math.min(matchScore, 99));

                        // Contract type normalization
                        let empType = 'FULLTIME';
                        if (job.contract_time) {
                            const ct = job.contract_time.toLowerCase();
                            if (ct.includes('part')) empType = 'PARTTIME';
                            else if (ct.includes('contract')) empType = 'CONTRACT';
                        }

                        return {
                            job_id: job.id || `adzuna_${Math.random().toString(36).substr(2, 9)}`,
                            employer_name: job.company?.display_name || 'Adzuna Employer',
                            employer_logo: null,
                            job_publisher: 'Adzuna',
                            job_employment_type: empType,
                            job_title: jobTitle,
                            job_apply_link: job.redirect_url,
                            job_description: jobDescription,
                            job_city: job.location?.display_name || 'Remote',
                            job_state: null,
                            job_country: country.toUpperCase(),
                            matchedSkills: matched.slice(0, 5),
                            missingSkills: missing.slice(0, 5),
                            matchScore
                        };
                    })
                    .sort((a, b) => b.matchScore - a.matchScore);

                } catch (apiError) {
                    console.error('Adzuna API Call failed, falling back to simulated jobs:', apiError.message);
                    isDemoMode = true;
                    matchedJobs = getSimulatedJobs(profileType, candidateSkills);
                }
            }
        } else {
            if (!apiKey || apiKey.trim() === '') {
                console.log('No RAPIDAPI_KEY found in environment. Defaulting to Demo Mode.');
                isDemoMode = true;
                matchedJobs = getSimulatedJobs(profileType, candidateSkills);
            } else {
                try {
                    const query = `${profileType} Developer`;
                    console.log(`Querying JSearch API with term: "${query}"`);

                    const jsearchResponse = await axios.get('https://jsearch.p.rapidapi.com/search', {
                        params: {
                            query: query,
                            num_pages: '1',
                            page: '1'
                        },
                        headers: {
                            'x-rapidapi-key': apiKey,
                            'x-rapidapi-host': apiHost
                        }
                    });

                    const rawJobs = jsearchResponse.data.data || [];
                    console.log(`JSearch returned ${rawJobs.length} raw jobs`);

                    // 3. Compute matching scores for retrieved JSearch jobs
                    matchedJobs = rawJobs.map(job => {
                        const jobTitle = job.job_title || '';
                        const jobDescription = job.job_description || '';
                        const jobQuals = (job.job_highlights && job.job_highlights.Qualifications) 
                            ? job.job_highlights.Qualifications.join(' ') 
                            : '';
                        const contentToSearch = `${jobTitle} ${jobDescription} ${jobQuals}`.toLowerCase();

                        // Find matching candidate skills
                        const matched = candidateSkills.filter(skill => 
                            contentToSearch.includes(skill.toLowerCase())
                        );

                        // Find missing skills (derived from job requirements, fallback to parsed skills)
                        const jobRequirements = job.job_required_skills || ["React", "JavaScript", "Node.js", "Python", "SQL", "TypeScript", "Git"];
                        const missing = jobRequirements.filter(reqSkill => 
                            !candidateSkills.some(skill => skill.toLowerCase() === reqSkill.toLowerCase())
                        );

                        // Score calculation
                        let matchScore = 0;
                        if (candidateSkills.length > 0) {
                            matchScore = Math.round((matched.length / candidateSkills.length) * 100);
                        } else {
                            matchScore = 50; // default
                        }

                        // Boost if candidate's main profile matches the job title keywords
                        if (jobTitle.toLowerCase().includes(profileType.toLowerCase())) {
                            matchScore += 15;
                        }

                        // Constrain score between 20% and 99%
                        matchScore = Math.max(20, Math.min(matchScore, 99));

                        return {
                            job_id: job.job_id,
                            employer_name: job.employer_name,
                            employer_logo: job.employer_logo,
                            job_publisher: job.job_publisher,
                            job_employment_type: job.job_employment_type || 'FULLTIME',
                            job_title: jobTitle,
                            job_apply_link: job.job_apply_link,
                            job_description: jobDescription,
                            job_city: job.job_city || 'Remote',
                            job_state: job.job_state,
                            job_country: job.job_country || 'US',
                            matchedSkills: matched.slice(0, 5),
                            missingSkills: missing.slice(0, 5),
                            matchScore
                        };
                    })
                    .sort((a, b) => b.matchScore - a.matchScore)
                    .slice(0, 6); // Limit to top 6 jobs

                } catch (apiError) {
                    console.error('JSearch API Call failed, falling back to simulated jobs:', apiError.message);
                    isDemoMode = true;
                    matchedJobs = getSimulatedJobs(profileType, candidateSkills);
                }
            }
        }

        return res.json({
            status: 'success',
            isDemo: isDemoMode,
            data: extractedData,
            matchedJobs: matchedJobs
        });

    } catch (error) {
        console.error('Error in uploadResume controller:', error.message);
        
        let status = 500;
        let errorMessage = 'Failed to extract resume details';

        if (error.response) {
            status = error.response.status;
            errorMessage = error.response.data.error || error.response.data.message || errorMessage;
            console.error('ML API Error Details:', error.response.data);
        } else if (error.request) {
            errorMessage = 'Resume parser service did not respond. Please verify connection and try again.';
        } else {
            errorMessage = error.message;
        }

        return res.status(status).json({ error: errorMessage });
    }
};