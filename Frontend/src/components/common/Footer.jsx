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
                      href="#"
                      className="dark:hover:text-white hover:text-slate-900 hover:underline transition text-slate-700 dark:text-slate-400"
                    >
                      Blog
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="dark:hover:text-white hover:text-slate-900 hover:underline transition text-slate-700 dark:text-slate-400"
                    >
                      Resume Guide
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
                      href="#"
                      className="dark:hover:text-white hover:text-slate-900 hover:underline transition text-slate-700 dark:text-slate-400"
                    >
                      LinkedIn
                    </a>
                  </li>

                  <li>
                    <a
                      href="#"
                      className="dark:hover:text-white hover:text-slate-900 hover:underline transition text-slate-700 dark:text-slate-400"
                    >
                      Twitter / X
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
              © 2025{" "}
              <a href="/" className="hover:text-blue-500 hover:underline">
                HireLens™
              </a>
              . All Rights Reserved.
            </span>

            {/* Social Icons */}
            <div className="mt-4 flex space-x-6 sm:mt-0 sm:justify-center text-slate-900 dark:text-slate-400">
              <a href="">
                <GithubIcon size={20} duration={1} />
              </a>
              <a href="">
                <LinkedinIcon size={20} duration={1} />
              </a>
              <a href="">
                <InstagramIcon size={20} duration={1} />
              </a>
              <a href="">
                <FacebookIcon size={20} duration={1} />
              </a>
              <a href="">
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
