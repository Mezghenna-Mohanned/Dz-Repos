import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          {/* Left side: Logo + Title */}
          <div className="flex items-center justify-center md:justify-start">
            <Github className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">
              Algeria GitHub Stars
            </span>
          </div>

          {/* Center/right: Description + Links */}
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Discover the best repositories from Algerian developers
            </p>
            <div className="flex justify-center md:justify-end space-x-4">
              <a
                href="https://github.com/topics/algeria"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                Explore Algerian Projects
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-500 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              >
                GitHub
              </a>
            </div>
          </div>
        </div>

        {/* Bottom: Copyright */}
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>
            &copy; {new Date().getFullYear()} Algeria GitHub Stars. Made by Mezghenna Mohanned, the strongest of them all.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
