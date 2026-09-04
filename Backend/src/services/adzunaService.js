const axios = require('axios');

const fetchAdzunaJobs = async ({ what = "developer", where = "", page = 1 } = {}) => {
    const appId = process.env.ADZUNA_APP_ID;
    const appKey = process.env.ADZUNA_APP_KEY;
    const country = (process.env.ADZUNA_COUNTRY || "in").toLowerCase();

    if (!appId || !appKey) {
        throw new Error("Adzuna API credentials are not configured in environment variables.");
    }

    const url = `https://api.adzuna.com/v1/api/jobs/${country}/search/${page}`;

    const response = await axios.get(url, {
        params: {
            app_id: appId,
            app_key: appKey,
            results_per_page: 20,
            what: what,
            where: where
        }
    });

    const results = response.data?.results || [];

    return results.map((item, index) => ({
        _id: item.id ? String(item.id) : `adzuna-${index}`,
        id: item.id ? String(item.id) : `adzuna-${index}`,
        job_title: item.title?.replace(/<\/?[^>]+(>|$)/g, "") || "Job Position",
        job_publisher: item.company?.display_name || "External Company",
        job_description: item.description?.replace(/<\/?[^>]+(>|$)/g, "") || "",
        job_city: item.location?.display_name || "Location flexible",
        job_country: country.toUpperCase(),
        job_employment_type: item.contract_time === "full_time" ? "Full-Time" : (item.contract_type || "Full-Time"),
        job_salary: (item.salary_min && item.salary_max)
            ? `₹${Math.round(item.salary_min).toLocaleString('en-IN')} - ₹${Math.round(item.salary_max).toLocaleString('en-IN')}`
            : (item.salary_min ? `₹${Math.round(item.salary_min).toLocaleString('en-IN')}+` : "Disclosed on apply"),
        skills: [],
        redirect_url: item.redirect_url || "",
        createdAt: item.created || new Date().toISOString(),
        isExternal: true
    }));
};

module.exports = { fetchAdzunaJobs };
