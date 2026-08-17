// ===================================FILE UPLOAD & AUTHENTICATION=============================
function fileUpload() {
    return {
        isDragging: false,
        file: null,
        isPdf: false,
        isLoading: false,
        errorMsg: '',
        extractedData: null,
        matchedJobs: [],
        isDemo: false,

        // Authentication, Saved Jobs & Pagination States
        isAuthenticated: !!localStorage.getItem('hirelens_user'),
        user: JSON.parse(localStorage.getItem('hirelens_user')) || null,
        showLoginModal: false,
        showAllJobs: false,
        savedJobs: [],
        jobViewTab: 'recommended', // 'recommended' or 'saved'

        init() {
            // Alpine.js hook: automatically runs when component is initialized
            window.addEventListener('message', async (event) => {
                if (event.data && event.data.type === 'oauth-success') {
                    // Save authenticated database user profile returned from popup
                    this.isAuthenticated = true;
                    this.user = event.data.user; 
                    localStorage.setItem('hirelens_user', JSON.stringify(this.user));
                    
                    // Fetch saved jobs for the user
                    await this.fetchSavedJobs();
                    
                    this.showAllJobs = true;
                    this.showLoginModal = false;
                }
            });

            // Fetch bookmarks on page load if already authenticated
            if (this.isAuthenticated && this.user) {
                this.fetchSavedJobs();
            }
        },

        handleFileSelect(event) {
            this.setFile(event.target.files[0]);
        },

        handleDrop(event) {
            this.isDragging = false;
            this.setFile(event.dataTransfer.files[0]);
        },

        setFile(file) {
            this.errorMsg = '';
            this.extractedData = null;
            this.matchedJobs = [];
            this.isDemo = false;
            this.showAllJobs = false; // Reset loaded state
            if (file && file.type === 'application/pdf') {
                this.file = file;
                this.isPdf = true;
            } else if (file) {
                this.file = file;
                this.isPdf = false;
            }
        },

        reset() {
            this.file = null;
            this.isPdf = false;
            this.isLoading = false;
            this.errorMsg = '';
            this.extractedData = null;
            this.matchedJobs = [];
            this.isDemo = false;
            this.showAllJobs = false;
            this.jobViewTab = 'recommended';
            document.getElementById('fileInput').value = '';
        },

        getVisibleJobs() {
            if (this.jobViewTab === 'saved') {
                return this.savedJobs;
            }
            if (!this.matchedJobs) return [];
            return this.showAllJobs ? this.matchedJobs : this.matchedJobs.slice(0, 5);
        },

        loadMoreJobs() {
            if (this.isAuthenticated) {
                this.showAllJobs = true;
            } else {
                this.showLoginModal = true;
                this.openOAuthPopup();
            }
        },

        openOAuthPopup() {
            const width = 520;
            const height = 620;
            const left = (window.screen.width - width) / 2;
            const top = (window.screen.height - height) / 2;
            
            const popup = window.open('oauth-login.html', 'OAuthLogin', `width=${width},height=${height},left=${left},top=${top},status=no,resizable=yes,scrollbars=yes`);
            if (window.focus && popup) popup.focus();
        },

        logout() {
            this.isAuthenticated = false;
            this.user = null;
            this.showAllJobs = false;
            this.savedJobs = [];
            this.jobViewTab = 'recommended';
            localStorage.removeItem('hirelens_user');
        },

        async fetchSavedJobs() {
            if (!this.isAuthenticated || !this.user || !this.user._id) return;
            
            const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const apiBase = isLocalhost ? 'http://localhost:5000' : 'https://hirelens-backend-0y2d.onrender.com';

            try {
                const response = await fetch(`${apiBase}/api/jobs/saved/${this.user._id}`);
                const result = await response.json();
                if (response.ok && result.status === 'success') {
                    this.savedJobs = result.data || [];
                }
            } catch (err) {
                console.error('Failed to fetch saved jobs:', err);
            }
        },

        isJobSaved(jobId) {
            return this.savedJobs.some(j => j.jobId === jobId);
        },

        async toggleSaveJob(job) {
            if (!this.isAuthenticated) {
                this.showLoginModal = true;
                this.openOAuthPopup();
                return;
            }

            const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const apiBase = isLocalhost ? 'http://localhost:5000' : 'https://hirelens-backend-0y2d.onrender.com';

            const jobId = job.job_id || job.jobId;
            const isSaved = this.isJobSaved(jobId);
            const endpoint = isSaved ? 'unsave' : 'save';
            
            const payload = isSaved 
                ? { userId: this.user._id, jobId } 
                : { 
                    userId: this.user._id, 
                    job: {
                        job_id: jobId,
                        employer_name: job.employer_name,
                        employer_logo: job.employer_logo,
                        job_publisher: job.job_publisher,
                        job_title: job.job_title,
                        job_apply_link: job.job_apply_link,
                        job_description: job.job_description,
                        job_city: job.job_city || 'Remote',
                        job_country: job.job_country || 'US',
                        job_employment_type: job.job_employment_type || 'FULLTIME',
                        matchScore: job.matchScore,
                        matchedSkills: job.matchedSkills || [],
                        missingSkills: job.missingSkills || []
                    }
                  };

            try {
                const response = await fetch(`${apiBase}/api/jobs/${endpoint}`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                });

                const result = await response.json();
                if (response.ok && result.status === 'success') {
                    if (isSaved) {
                        this.savedJobs = this.savedJobs.filter(j => j.jobId !== jobId);
                    } else {
                        // Append backend format to local state
                        this.savedJobs.unshift({
                            jobId,
                            employer_name: job.employer_name,
                            employer_logo: job.employer_logo,
                            job_publisher: job.job_publisher,
                            job_title: job.job_title,
                            job_apply_link: job.job_apply_link,
                            job_description: job.job_description,
                            job_city: job.job_city || 'Remote',
                            job_country: job.job_country || 'US',
                            job_employment_type: job.job_employment_type || 'FULLTIME',
                            matchScore: job.matchScore,
                            matchedSkills: job.matchedSkills || [],
                            missingSkills: job.missingSkills || []
                        });
                    }
                } else {
                    alert(result.error || 'Failed to update job bookmark state.');
                }
            } catch (err) {
                console.error('Error toggling job bookmark:', err);
                alert('Connection error. Could not sync bookmark state.');
            }
        },

        async uploadFile() {
            if (!this.file || !this.isPdf) return;

            this.isLoading = true;
            this.errorMsg = '';
            this.extractedData = null;
            this.matchedJobs = [];
            this.isDemo = false;
            this.showAllJobs = false;

            const formData = new FormData();
            formData.append('resume', this.file);

            // Automatically resolve API target base (local development vs Render production backend)
            const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
            const apiBase = isLocalhost ? 'http://localhost:5000' : 'https://hirelens-backend-0y2d.onrender.com';

            try {
                const response = await fetch(`${apiBase}/api/resume/upload`, {
                    method: 'POST',
                    body: formData
                });

                const result = await response.json();

                if (!response.ok) {
                    throw new Error(result.error || 'Failed to scan resume. Please try again.');
                }

                if (result.status === 'success' && result.data) {
                    this.extractedData = result.data;
                    this.matchedJobs = result.matchedJobs || [];
                    this.isDemo = result.isDemo || false;
                    
                    // Smoothly scroll down to results section
                    setTimeout(() => {
                        const resultsSection = document.getElementById('results-section');
                        if (resultsSection) {
                            resultsSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                        }
                    }, 150);
                } else {
                    throw new Error('Invalid response structure from server.');
                }
            } catch (err) {
                console.error(err);
                this.errorMsg = err.message || 'An error occurred while connecting to the server.';
            } finally {
                this.isLoading = false;
            }
        }
    }
}