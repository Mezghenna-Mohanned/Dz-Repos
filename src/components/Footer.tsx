import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center gap-6">
          <div className="flex flex-col items-center">
            <div className="flex items-center mb-2">
              <Github className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">
                Algeria GitHub Stars
              </span>
            </div>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Discover the best repositories from Algerian developers
            </p>
          </div>

          {/* Links */}
          <div className="flex justify-center space-x-6">
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

        {/* Copyright - centered */}
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