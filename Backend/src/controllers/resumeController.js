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
        },
        {
            job_id: "mock_5",
            employer_name: "Apple (Demo)",
            employer_logo: "https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg",
            job_publisher: "Apple Jobs",
            job_employment_type: "FULLTIME",
            job_title: `Embedded Systems & IoT Specialist`,
            job_apply_link: "https://www.apple.com/jobs",
            job_description: "Seeking engineers interested in working on firmware, embedded system designs, sensor integration, and IoT devices.",
            job_city: "Cupertino",
            job_state: "CA",
            job_country: "US",
            job_required_skills: ["Embedded C", "IoT", "ESP32", "Linux", "Git", "C++"]
        },
        {
            job_id: "mock_6",
            employer_name: "Tesla (Demo)",
            employer_logo: "https://upload.wikimedia.org/wikipedia/commons/e/e8/Tesla_logo.png",
            job_publisher: "Tesla Careers",
            job_employment_type: "FULLTIME",
            job_title: `IoT / Control Systems Engineer`,
            job_apply_link: "https://www.tesla.com/careers",
            job_description: "Work on control systems and wireless telemetry protocols for electric vehicles. Build reliable software interfaces for IoT telemetry.",
            job_city: "Austin",
            job_state: "TX",
            job_country: "US",
            job_required_skills: ["Embedded C", "CAN Protocol", "TCP/IP", "Linux", "Agile", "C++"]
        },
        {
            job_id: "mock_7",
            employer_name: "Amazon (Demo)",
            employer_logo: "https://upload.wikimedia.org/wikipedia/commons/a/a9/Amazon_logo.svg",
            job_publisher: "Amazon Jobs",
            job_employment_type: "FULLTIME",
            job_title: `AWS Cloud Backend Architect`,
            job_apply_link: "https://www.amazon.jobs",
            job_description: "Design and implement scalable backend APIs. Deploy services using containerization, orchestration networks, and AWS resources.",
            job_city: "Seattle",
            job_state: "WA",
            job_country: "US",
            job_required_skills: ["Node.js", "AWS", "Kubernetes", "Docker", "PostgreSQL", "REST API"]
        },
        {
            job_id: "mock_8",
            employer_name: "Netflix (Demo)",
            employer_logo: "https://upload.wikimedia.org/wikipedia/commons/0/08/Netflix_2015_logo.svg",
            job_publisher: "Netflix Jobs",
            job_employment_type: "FULLTIME",
            job_title: `Senior Full Stack Architect`,
            job_apply_link: "https://jobs.netflix.com",
            job_description: "Help scale our media delivery frontend systems. Seeking full stack profiles with high React, Node, and database optimization expertise.",
            job_city: "Los Gatos",
            job_state: "CA",
            job_country: "US",
            job_required_skills: ["React", "Next.js", "Express.js", "Redis", "MongoDB", "AWS"]
        },
        {
            job_id: "mock_9",
            employer_name: "Microsoft (Demo)",
            employer_logo: "https://upload.wikimedia.org/wikipedia/commons/9/96/Microsoft_logo_%282012%29.svg",
            job_publisher: "Microsoft Careers",
            job_employment_type: "FULLTIME",
            job_title: `ML/NLP Research Engineer`,
            job_apply_link: "https://careers.microsoft.com",
            job_description: "Build cutting-edge artificial intelligence, NLP classifiers, and LLM fine-tuning pipelines. Requires deep ML framework knowledge.",
            job_city: "Redmond",
            job_state: "WA",
            job_country: "US",
            job_required_skills: ["Python", "Machine Learning", "TensorFlow", "PyTorch", "Deep Learning", "NLP"]
        },
        {
            job_id: "mock_10",
            employer_name: "Airbnb (Demo)",
            employer_logo: "https://upload.wikimedia.org/wikipedia/commons/6/69/Airbnb_Logo_Belo.svg",
            job_publisher: "Indeed",
            job_employment_type: "FULLTIME",
            job_title: `Mobile App Developer`,
            job_apply_link: "https://careers.airbnb.com",
            job_description: "Join our mobile group building responsive cross-platform native experiences for accommodation sharing markets.",
            job_city: "San Francisco",
            job_state: "CA",
            job_country: "US",
            job_required_skills: ["Flutter", "Dart", "Kotlin", "Swift", "REST API", "Git"]
        },
        {
            job_id: "mock_11",
            employer_name: "Spotify (Demo)",
            employer_logo: "https://upload.wikimedia.org/wikipedia/commons/1/19/Spotify_logo_without_text.svg",
            job_publisher: "LinkedIn",
            job_employment_type: "FULLTIME",
            job_title: `Audio Algorithm & ML Engineer`,
            job_apply_link: "https://lifeatspotify.com",
            job_description: "Optimize recommending system models and audio filters. Deep understanding of ML pipelines and digital processing algorithms is key.",
            job_city: "Stockholm",
            job_state: null,
            job_country: "SE",
            job_required_skills: ["Python", "OpenCV", "PyTorch", "Machine Learning", "Docker", "Git"]
        },
        {
            job_id: "mock_12",
            employer_name: "Uber (Demo)",
            employer_logo: "https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.svg",
            job_publisher: "Uber Careers",
            job_employment_type: "FULLTIME",
            job_title: `Real-time Systems Engineer`,
            job_apply_link: "https://www.uber.com/careers",
            job_description: "Scale high-throughput routing APIs and geospatial database indexing modules. PostgreSQL and container orchestration skills desired.",
            job_city: "San Francisco",
            job_state: "CA",
            job_country: "US",
            job_required_skills: ["Node.js", "PostgreSQL", "Docker", "Redis", "REST API", "Git"]
        },
        {
            job_id: "mock_13",
            employer_name: "GitHub (Demo)",
            employer_logo: "https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg",
            job_publisher: "GitHub Jobs",
            job_employment_type: "CONTRACT",
            job_title: `DevTools Developer`,
            job_apply_link: "https://github.com/about/careers",
            job_description: "Work on developer tooling, CI/CD pipelines, and cloud actions infrastructure. Git/GitHub automation integration expertise required.",
            job_city: "Remote",
            job_state: null,
            job_country: "US",
            job_required_skills: ["TypeScript", "Node.js", "Git", "GitHub", "Docker", "CI/CD"]
        },
        {
            job_id: "mock_14",
            employer_name: "Figma (Demo)",
            employer_logo: "https://upload.wikimedia.org/wikipedia/commons/3/33/Figma-logo.svg",
            job_publisher: "Figma Careers",
            job_employment_type: "FULLTIME",
            job_title: `Graphic Engine/Frontend Architect`,
            job_apply_link: "https://www.figma.com/careers",
            job_description: "Optimize browser canvas performance and multiplayer sync engines. Standard stack spans React, custom WebGL interfaces.",
            job_city: "San Francisco",
            job_state: "CA",
            job_country: "US",
            job_required_skills: ["React", "JavaScript", "CSS3", "Figma", "HTML5", "Git"]
        },
        {
            job_id: "mock_15",
            employer_name: "Slack (Demo)",
            employer_logo: "https://upload.wikimedia.org/wikipedia/commons/d/d5/Slack_icon_2019.svg",
            job_publisher: "Slack Careers",
            job_employment_type: "FULLTIME",
            job_title: `Desktop & Mobile Developer`,
            job_apply_link: "https://slack.com/careers",
            job_description: "Build robust features inside our communication packages across desktop and mobile. Experience with database caching preferred.",
            job_city: "Denver",
            job_state: "CO",
            job_country: "US",
            job_required_skills: ["React Native", "TypeScript", "Node.js", "SQLite", "Git", "REST API"]
        }
    ];

    // Word-boundary skill matching to avoid false positives (e.g. "Java" matching "JavaScript")
    const skillMatchesText = (skill, text) => {
        const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        const regex = new RegExp(`(?<![a-zA-Z0-9.#+])${escaped}(?![a-zA-Z0-9.#+])`, 'i');
        return regex.test(text);
    };

    return mockJobs.map(job => {
        const textToSearch = `${job.job_title} ${job.job_description} ${job.job_required_skills.join(' ')}`;
        
        // Find matching skills using word-boundary matching
        const matchedSkills = candidateSkills.filter(skill => 
            skillMatchesText(skill, textToSearch)
        );

        // Find missing skills from the job's actual required skills list
        const missingSkills = job.job_required_skills.filter(reqSkill => 
            !candidateSkills.some(skill => skill.toLowerCase() === reqSkill.toLowerCase())
        );

        // Score = matched required skills / total required skills (how well candidate covers job needs)
        let matchScore = 0;
        const reqCount = job.job_required_skills.length;
        if (reqCount > 0) {
            const coveredReqSkills = job.job_required_skills.filter(reqSkill =>
                candidateSkills.some(skill => skill.toLowerCase() === reqSkill.toLowerCase())
            ).length;
            matchScore = Math.round((coveredReqSkills / reqCount) * 100);
        }

        // Bonus +10 if profile type matches job title keyword
        if (job.job_title.toLowerCase().includes((profileType || '').toLowerCase())) {
            matchScore = Math.min(matchScore + 10, 100);
        }

        // Constrain score between 5% and 98%
        matchScore = Math.max(5, Math.min(matchScore, 98));

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

                    // Use PowerShell's Invoke-WebRequest (WinINet) instead of Node's raw sockets.
                    // api.adzuna.com is blocked at the TCP level for Node.js on this network,
                    // but works fine through Windows' native HTTP stack (used by PowerShell/browsers).
                    const { execSync } = require('child_process');
                    const adzunaUrl = `https://api.adzuna.com/v1/api/jobs/${country}/search/1?app_id=${adzunaAppId}&app_key=${adzunaAppKey}&what=${encodeURIComponent(query)}&results_per_page=15`;

                    const psCommand = `(Invoke-WebRequest -Uri '${adzunaUrl}' -UseBasicParsing).Content`;
                    const rawOutput = execSync(`powershell -Command "${psCommand}"`, {
                        timeout: 20000,
                        encoding: 'utf8'
                    });
                    const adzunaData = JSON.parse(rawOutput);

                    const rawJobs = adzunaData.results || [];
                    console.log(`Adzuna returned ${rawJobs.length} raw jobs`);

                    // Word-boundary skill matching to avoid false positives (e.g. "Java" matching "JavaScript")
                    const skillMatchesText = (skill, text) => {
                        const escaped = skill.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
                        const regex = new RegExp(`(?<![a-zA-Z0-9.#+])${escaped}(?![a-zA-Z0-9.#+])`, 'i');
                        return regex.test(text);
                    };

                    // Map Adzuna results to standardized schema
                    matchedJobs = rawJobs.map(job => {
                        const jobTitle = job.title || '';
                        const jobDescription = job.description || '';
                        const contentToSearch = `${jobTitle} ${jobDescription}`;

                        // Find matching candidate skills using word-boundary regex
                        const matched = candidateSkills.filter(skill => 
                            skillMatchesText(skill, contentToSearch)
                        );

                        // Build inferred required skills: candidate skills that appear in job text = confirmed needed
                        // + common baseline skills not in candidate = missing
                        const commonSkills = ["React", "JavaScript", "Node.js", "Python", "SQL", "TypeScript", "Git",
                                             "Java", "C++", "C#", "Docker", "AWS", "HTML", "CSS", "Angular", "Vue"];
                        const inferredRequired = commonSkills.filter(reqSkill =>
                            skillMatchesText(reqSkill, contentToSearch)
                        );
                        const missing = inferredRequired.filter(reqSkill =>
                            !candidateSkills.some(skill => skill.toLowerCase() === reqSkill.toLowerCase())
                        );

                        // Score = (skills from resume that appear in job) / (skills that job mentions)
                        // This measures: how much of what the job needs does the candidate have
                        const jobMentionedSkills = [...new Set([
                            ...candidateSkills.filter(s => skillMatchesText(s, contentToSearch)),
                            ...inferredRequired
                        ])];
                        let matchScore = 0;
                        if (jobMentionedSkills.length > 0) {
                            matchScore = Math.round((matched.length / jobMentionedSkills.length) * 100);
                        } else if (candidateSkills.length > 0) {
                            matchScore = 40; // job description has no detectable skills
                        } else {
                            matchScore = 20;
                        }

                        // Bonus +10 if profile type keyword appears in job title
                        if (jobTitle.toLowerCase().includes((profileType || '').toLowerCase())) {
                            matchScore = Math.min(matchScore + 10, 100);
                        }

                        // Constrain score between 5% and 98%
                        matchScore = Math.max(5, Math.min(matchScore, 98));

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
                    console.error('=== Adzuna API Call FAILED ===');
                    console.error('  typeof error   :', typeof apiError);
                    console.error('  error.code     :', apiError.code);
                    console.error('  error.message  :', JSON.stringify(apiError.message));
                    console.error('  error.name     :', apiError.name);
                    if (apiError.response) {
                        console.error('  HTTP status    :', apiError.response.status);
                        console.error('  Response body  :', JSON.stringify(apiError.response.data));
                    } else if (apiError.request) {
                        console.error('  Request sent but NO response received');
                        console.error('  Requested URL  :', apiError.config?.url);
                    } else {
                        console.error('  Full error obj :', JSON.stringify(apiError, Object.getOwnPropertyNames(apiError)));
                    }
                    console.error('==============================');
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
                    .slice(0, 15); // Limit to top 15 jobs

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