import { Star, GitFork, Eye, Clock, GitCommit, ExternalLink } from 'lucide-react';
import { Repository } from '../types/repository';
import { formatDate, formatNumber } from '../utils/formatters';

interface RepositoryCardProps {
  repository: Repository;
  rank: number;
}

const RepositoryCard = ({ repository, rank }: RepositoryCardProps) => {
  const getRankColor = (rank: number): string => {
    if (rank === 1) return 'bg-yellow-500';
    if (rank === 2) return 'bg-gray-400';
    if (rank === 3) return 'bg-amber-700';
    return 'bg-blue-600';
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200/50 dark:border-gray-700/50 flex flex-col h-full group">
      <div className="relative">
        <div 
          className={`absolute top-4 left-4 ${getRankColor(rank)} text-white h-8 w-8 flex items-center justify-center rounded-full font-bold shadow-lg z-10`}
        >
          {rank}
        </div>
        
        <div className="h-32 bg-gradient-to-br from-blue-600 to-indigo-600 dark:from-blue-500 dark:to-indigo-500 relative overflow-hidden">
          <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>
          <div className="flex items-center justify-center h-full relative z-10">
            <img 
              src={repository.owner.avatar_url} 
              alt={repository.owner.login}
              className="h-20 w-20 rounded-full border-4 border-white/90 shadow-xl transform group-hover:scale-110 transition-transform duration-300"
            />
          </div>
        </div>
      </div>

      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-4">
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-xl truncate bg-gradient-to-r from-blue-600 to-indigo-600 dark:from-blue-400 dark:to-indigo-400 text-transparent bg-clip-text">
              {repository.name}
            </h3>
            <a 
              href={repository.html_url} 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-gray-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
              aria-label="Open repository"
            >
              <ExternalLink className="h-5 w-5" />
            </a>
          </div>
          <div className="text-sm text-gray-500 dark:text-gray-400 truncate">
            {repository.owner.login}
          </div>
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 line-clamp-3 flex-grow">
          {repository.description || 'No description provided'}
        </p>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="flex items-center text-sm bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded-lg">
            <Star className="h-4 w-4 text-yellow-500 mr-2" />
            <span className="font-medium">{formatNumber(repository.stargazers_count)}</span>
          </div>
          <div className="flex items-center text-sm bg-blue-50 dark:bg-blue-900/20 p-2 rounded-lg">
            <GitFork className="h-4 w-4 text-blue-500 mr-2" />
            <span>{formatNumber(repository.forks_count)}</span>
          </div>
          <div className="flex items-center text-sm bg-purple-50 dark:bg-purple-900/20 p-2 rounded-lg">
            <Eye className="h-4 w-4 text-purple-500 mr-2" />
            <span>{formatNumber(repository.watchers)}</span>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-700 pt-4 mt-auto space-y-2">
          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
            <Clock className="h-3.5 w-3.5 mr-1.5" />
            <span>Updated {formatDate(repository.updated_at)}</span>
          </div>
          {repository.language && (
            <div className="flex items-center">
              <span className={`h-3 w-3 rounded-full bg-${getLanguageColor(repository.language)}`}></span>
              <span className="ml-1.5 text-xs text-gray-600 dark:text-gray-300">{repository.language}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const getLanguageColor = (language: string): string => {
  const colors: Record<string, string> = {
    JavaScript: 'yellow-400',
    TypeScript: 'blue-500',
    Python: 'blue-600',
    Java: 'orange-500',
    'C#': 'green-500',
    PHP: 'indigo-400',
    Ruby: 'red-600',
    Go: 'blue-400',
    Rust: 'orange-600',
    Swift: 'orange-500',
    Kotlin: 'purple-500',
    Dart: 'blue-500',
    C: 'gray-600',
    'C++': 'pink-500',
    HTML: 'red-500',
    CSS: 'blue-400',
  };

  return colors[language] || 'gray-500';
};

export default RepositoryCard;