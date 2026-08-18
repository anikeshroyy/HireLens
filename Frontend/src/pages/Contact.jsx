const Contact = () => {
  return (
    <section
      id="contact"
      className="min-h-screen bg-white dark:bg-slate-950 px-6 py-20"
    >
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-blue-600">
            Contact HireLens
          </p>

          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-slate-900 dark:text-slate-100 md:text-5xl">
            We'd love to hear from you.
          </h1>

          <p className="mt-5 text-lg leading-relaxed text-slate-600 dark:text-slate-400">
            Have a question, suggestion, or found something that isn't working?
            Send us a message and we'll get back to you.
          </p>
        </div>

        {/* Main content */}
        <div className="mt-16 grid gap-10 lg:grid-cols-[0.8fr_1.2fr]">
          {/* Contact information */}
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 dark:border-slate-800 dark:bg-slate-900">
            <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100">
              Get in touch
            </h2>

            <p className="mt-3 leading-relaxed text-slate-600 dark:text-slate-400">
              Whether you're looking for help with HireLens or simply want to
              share some feedback, we're here to listen.
            </p>

            <div className="mt-8 space-y-6">
              {/* Email */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-lg dark:bg-blue-950 dark:text-slate-200">
                  ✉
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Email
                  </p>

                  <a
                    href="mailto:hello@hirelens.com"
                    className="mt-1 block text-sm font-medium text-slate-900 hover:text-blue-600 dark:text-slate-200 dark:hover:text-blue-400"
                  >
                    hello@hirelens.com
                  </a>
                </div>
              </div>

              {/* Response time */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-lg dark:bg-blue-950 dark:text-slate-200">
                  ◷
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Response time
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-200">
                    Usually within 1–2 business days
                  </p>
                </div>
              </div>

              {/* Feedback */}
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-blue-100 text-lg dark:bg-blue-950 dark:text-slate-200">
                  ✦
                </div>

                <div>
                  <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
                    Feedback
                  </p>

                  <p className="mt-1 text-sm font-medium text-slate-900 dark:text-slate-200">
                    Help us make HireLens better
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="rounded-3xl border border-slate-200 bg-white p-8 dark:border-slate-800 dark:bg-slate-900">
            <form className="space-y-6">
              {/* Name */}
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Name
                </label>

                <input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>

              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Email
                </label>

                <input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>

              {/* Subject */}
              <div>
                <label
                  htmlFor="subject"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Subject
                </label>

                <select
                  id="subject"
                  className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                  defaultValue=""
                >
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option value="general">General question</option>
                  <option value="feedback">Feedback</option>
                  <option value="bug">Report a problem</option>
                  <option value="feature">Feature suggestion</option>
                  <option value="other">Other</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-300"
                >
                  Message
                </label>

                <textarea
                  id="message"
                  rows="5"
                  placeholder="Tell us how we can help..."
                  className="w-full resize-none rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 dark:border-slate-700 dark:bg-slate-950 dark:text-slate-100"
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full rounded-xl bg-blue-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-700"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <p className="text-sm text-slate-500 dark:text-slate-400">
            Looking for your next opportunity?
          </p>

          <a
            href="#"
            className="mt-2 inline-block text-sm font-semibold text-blue-600 hover:text-blue-700 dark:text-blue-400"
          >
            Explore available jobs →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
