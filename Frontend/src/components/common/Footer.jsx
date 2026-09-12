import logo from "../../assets/HireLens_Logo.png";
import {
  GithubIcon,
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  TwitterIcon,
} from "@animateicons/react/lucide";

const Footer = () => {
  return (
    <>
      <footer className="bg-slate-200/10 dark:bg-slate-900/30 p-8 -mt-1 sm:p-6">
        <div className="mx-auto max-w-7xl">
          <div className="md:flex md:justify-between">
            {/* Logo */}
            <div className="mb-6 md:mb-0">
              <a href="/" className="flex items-center">
                <img src={logo} className="h-8" alt="HireLens Logo" />

                <span className="self-center text-2xl font-semibold whitespace-nowrap text-slate-800 dark:text-slate-200">
                  HireLens
                </span>
              </a>
              <p className="text-slate-800 dark:text-slate-200 w-full max-w-80">
                HireLens helps job seekers discover opportunities that actually
                match their skills, experience, and career goals.
              </p>
            </div>

            {/* Footer Links */}
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 sm:gap-6">
              {/* Resources */}
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase text-slate-800 dark:text-slate-200">
                  Resources
                </h2>

                <ul className="text-gray-400">
                  <li className="mb-4">
                    <a
                      href="/jobs"
                      className="dark:hover:text-white hover:text-slate-900 hover:underline transition text-slate-700 dark:text-slate-400"
                    >
                      Browse Jobs
                    </a>
                  </li>

                  <li>
                    <a
                      href="/about"
                      className="dark:hover:text-white hover:text-slate-900 hover:underline transition text-slate-700 dark:text-slate-400"
                    >
                      About Us
                    </a>
                  </li>
                </ul>
              </div>

              {/* Social */}
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase text-slate-800 dark:text-slate-200">
                  Follow us
                </h2>

                <ul className="text-gray-400">
                  <li className="mb-4">
                    <a
                      href="https://linkedin.com/in/anikeshroy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dark:hover:text-white hover:text-slate-900 hover:underline transition text-slate-700 dark:text-slate-400"
                    >
                      LinkedIn
                    </a>
                  </li>

                  <li>
                    <a
                      href="https://github.com/anikeshroyy"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="dark:hover:text-white hover:text-slate-900 hover:underline transition text-slate-700 dark:text-slate-400"
                    >
                      GitHub
                    </a>
                  </li>
                </ul>
              </div>

              {/* Legal */}
              <div>
                <h2 className="mb-6 text-sm font-semibold uppercase text-slate-800 dark:text-slate-400">
                  Legal
                </h2>

                <ul className="text-gray-400">
                  <li className="mb-4">
                    <button className="dark:hover:text-white hover:text-slate-900 hover:underline transition cursor-pointer text-slate-700 dark:text-slate-400">
                      Privacy Policy
                    </button>
                  </li>

                  <li>
                    <button className="dark:hover:text-white hover:text-slate-900 hover:underline transition cursor-pointer text-slate-700 dark:text-slate-400">
                      Terms & Conditions
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Divider */}
          <hr className="my-6 border-gray-700 sm:mx-auto lg:my-8" />

          {/* Bottom */}
          <div className="sm:flex sm:items-center sm:justify-between">
            <span className="text-sm text-slate-700 dark:text-slate-400 sm:text-center">
              © {new Date().getFullYear()}{" "}
              <a href="/" className="hover:text-blue-500 hover:underline">
                HireLens™
              </a>
              . Built by{" "}
              <a
                href="https://anikeshroy.in"
                target="_blank"
                rel="noopener noreferrer author"
                className="font-medium text-blue-600 dark:text-blue-400 hover:underline"
              >
                Anikesh Roy
              </a>
              . All Rights Reserved.
            </span>

            {/* Social Icons */}
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center text-slate-900 dark:text-slate-400">
              <a
                href="https://github.com/anikeshroyy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub Profile"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <GithubIcon size={20} duration={1} />
              </a>
              <a
                href="https://linkedin.com/in/anikeshroy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn Profile"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <LinkedinIcon size={20} duration={1} />
              </a>
              <a
                href="https://instagram.com/anikesh.royy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram Profile"
                className="hover:text-pink-600 dark:hover:text-pink-400 transition"
              >
                <InstagramIcon size={20} duration={1} />
              </a>
              <a
                href="https://facebook.com/anikesh.royy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook Profile"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <FacebookIcon size={20} duration={1} />
              </a>
              <a
                href="https://x.com/anikesh_royy"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="X / Twitter"
                className="hover:text-blue-600 dark:hover:text-blue-400 transition"
              >
                <TwitterIcon size={20} duration={1} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
