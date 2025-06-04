import { Github } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 py-8 transition-colors duration-200">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="flex items-center mb-4 md:mb-0">
            <Github className="h-6 w-6 text-blue-600 dark:text-blue-400 mr-2" />
            <span className="font-semibold text-lg">Algeria GitHub Stars</span>
          </div>
          
          <div className="text-center md:text-right">
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
              Data updates every 24 hours from the GitHub API
            </p>
            <div className="flex space-x-4 justify-center md:justify-end">
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
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>&copy; {new Date().getFullYear()} Algeria GitHub Stars. All rights reserved.</p>
          <p className="mt-1">Built with React and Tailwind CSS. Powered by the GitHub API.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;