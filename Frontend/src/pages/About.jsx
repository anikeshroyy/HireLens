const About = () => {
  return (
    <section
      id="about"
      className="min-h-screen bg-white dark:bg-slate-950 px-6 py-20"
    >
      <div className="mx-auto max-w-6xl">
        {/* Hero */}
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            About HireLens
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 md:text-5xl">
            Your resume shouldn't limit
            <span className="block bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent pb-2">
              your next opportunity.
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            HireLens helps job seekers discover opportunities that actually
            match their skills, experience, and career goals.
          </p>
        </div>

        {/* What is HireLens */}
        <div className="mt-20 grid items-center gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              What is HireLens?
            </h2>

            <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
              Finding the right job can be overwhelming. You browse hundreds of
              listings, compare requirements, and still wonder whether a
              position is actually right for you.
            </p>

            <p className="mt-4 leading-relaxed text-slate-600 dark:text-slate-400">
              HireLens is built to make that process easier. Instead of
              searching blindly, you can use your resume and skills to discover
              jobs that align with your profile.
            </p>
          </div>

          {/* Feature card */}
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900">
            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-blue-100 text-xl dark:bg-blue-950 dark:text-slate-200">
              ✦
            </div>

            <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              Smarter job discovery
            </h3>

            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">
              HireLens analyzes your profile and helps surface opportunities
              based on relevant skills, experience, and job requirements.
            </p>
          </div>
        </div>

        {/* How it works */}
        <div className="mt-24">
          <div className="text-center">
            <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
              How it works
            </p>

            <h2 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-slate-100">
              From resume to opportunity
            </h2>
          </div>

          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {/* Step 1 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <span className="text-sm font-semibold text-blue-600">01</span>

              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                Upload your resume
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Start by providing your resume so HireLens can understand your
                skills and experience.
              </p>
            </div>

            {/* Step 2 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <span className="text-sm font-semibold text-blue-600">02</span>

              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                Analyze your profile
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Your skills, experience, and background are compared with
                available job requirements.
              </p>
            </div>

            {/* Step 3 */}
            <div className="rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-800 dark:bg-slate-900">
              <span className="text-sm font-semibold text-blue-600">03</span>

              <h3 className="mt-4 text-lg font-semibold text-slate-900 dark:text-slate-100">
                Discover better matches
              </h3>

              <p className="mt-2 text-sm leading-relaxed text-slate-600 dark:text-slate-400">
                Explore job opportunities that are relevant to your profile and
                career direction.
              </p>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="mt-24 rounded-3xl border border-blue-100 bg-blue-50 px-6 py-12 text-center dark:border-blue-950 dark:bg-blue-950/30 md:px-16">
          <h2 className="text-3xl font-semibold text-slate-900 dark:text-slate-100">
            Our mission
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            We believe finding a great career opportunity shouldn't be a
            guessing game. HireLens aims to make job discovery more
            personalized, transparent, and focused on what you can actually
            bring to a role.
          </p>
        </div>
      </div>
    </section>
  );
};

export default About;
