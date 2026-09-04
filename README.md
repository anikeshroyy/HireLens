# HireLens

HireLens is a smart hiring platform designed to help job seekers discover roles that match their skills, experience, and career goals. The project brings together a modern React frontend, an Express backend, MongoDB, and a Python-based resume parsing workflow to make recruitment and job discovery more efficient.

## Project Overview

HireLens is built around the idea of making hiring more intelligent and easier for both candidates and recruiters. Users can register, log in, upload resumes, and view job opportunities that align with their profile. The system also captures candidate data from resumes, helping make the hiring process more structured and data-driven.

## How the Project Works

1. A user signs up or logs in through the frontend.
2. The backend verifies the user and manages authentication and sessions.
3. The user uploads a resume or profile information.
4. The Python ML service extracts structured details such as name, email, skills, work experience, and education from the resume.
5. The extracted information is sent to the backend and stored in MongoDB.
6. The frontend displays the dashboard, job listings, and related pages.
7. Recruiters and job seekers can interact with the platform as the project expands with new hiring features.

This creates a complete workflow from resume intake to job discovery and future application processing.

## Technologies Used

### Frontend

- React
- Vite
- JavaScript / JSX
- Tailwind CSS
- Redux Toolkit
- React Router DOM
- Lucide icons

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT authentication
- CORS
- Cookie Parser
- Multer

### Machine Learning / Resume Parsing

- Python
- Resume extraction and parsing logic
- Structured JSON output
- NLP-based resume data processing

## Current Features

- User registration and login
- Recruiter dashboard
- Jobseeker dashboard
- Job posting by recruiters
- Job editing by recruiters
- Job listing page
- Working resume parsing workflow
- Responsive design
- About and Contact pages
- Dark and light theme support

## Upcoming Features

The project is planned to include the following improvements:

- Job application by users
- Candidate profile matching with jobs
- Job search and filtering
- Application tracking and status updates
- Better resume-to-job compatibility scoring

## Local Setup

### 1. Clone the repository

```bash
git clone https://github.com/anikeshroyy/HireLens.git
cd HireLens
```

### 2. Install backend dependencies

```bash
cd Backend
npm install
```

Create a `.env` file inside the `Backend` folder and add your environment variables:

```env
PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

Start the backend:

```bash
npm run dev
```

### 3. Install frontend dependencies

```bash
cd ../Frontend
npm install
npm run dev
```

The frontend runs on:

- http://localhost:5173

The backend runs on:

- http://localhost:3000

### 4. Setup the ML service

```bash
cd ../Ml
python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

Then run the resume parser service as needed for extraction and processing.

## How to Use This Project Locally

1. Open the frontend in your browser.
2. Create a new account or log in.
3. Upload a resume and review the parsed information.
4. Explore the available jobs.
5. Recruiters can create and edit job postings from the dashboard.
6. View your dashboard and profile details.

## Contact & Social Links

- Email: anikeshworkmail@gmail.com
- LinkedIn: [anikeshroy](https://linkedin.com/in/anikeshroy)
- GitHub: [anikeshroyy](https://github.com/anikeshroyy)
- Instagram: [anikesh.royy](https://instagram.com/anikesh.royy)
- Facebook: [anikesh.royy](https://facebook.com/anikesh.royy)
- Reddit: [anikeshx_dev](https://www.reddit.com/user/anikeshx_dev/)
- Medium: [DevX_AnikeshRoy](https://medium.com/@DevX_AnikeshRoy)
- Discord: [anikesh_royy](https://discordapp.com/users/780881044340867113)

## Star This Repository

If you like this project, please give it a star and share it with others.

Thank you for supporting HireLens.
