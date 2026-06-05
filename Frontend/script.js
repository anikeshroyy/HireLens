// ===================================FILE UPLOAD=============================
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
            document.getElementById('fileInput').value = '';
        },

        async uploadFile() {
            if (!this.file || !this.isPdf) return;

            this.isLoading = true;
            this.errorMsg = '';
            this.extractedData = null;
            this.matchedJobs = [];
            this.isDemo = false;

            const formData = new FormData();
            formData.append('resume', this.file);

            try {
                const response = await fetch('https://hirelens-backend-0y2d.onrender.com/api/resume/upload', {
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