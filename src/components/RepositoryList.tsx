import { useState, useEffect } from 'react';
import RepositoryCard from './RepositoryCard';
import { fetchAlgerianRepositories } from '../services/githubService';
import { Repository } from '../types/repository';
import LoadingSkeleton from './LoadingSkeleton';

interface RepositoryListProps {
  sortBy: 'stars' | 'commits' | 'updated';
}

const RepositoryList = ({ sortBy }: RepositoryListProps) => {
  const [repositories, setRepositories] = useState<Repository[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const loadRepositories = async () => {
      setIsLoading(true);
      setError(null);
      
      try {
        const data = await fetchAlgerianRepositories(sortBy);
        setRepositories(data);
        setLastUpdated(new Date());
      } catch (err) {
        console.error('Error fetching repositories:', err);
        setError('Failed to load repositories. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadRepositories();
    
    // Simulate auto-refresh every 24 hours
    const refreshInterval = setInterval(loadRepositories, 24 * 60 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, [sortBy]);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-red-500 text-center mb-4">
          <svg className="w-12 h-12 mx-auto mb-2\" fill="none\" stroke="currentColor\" viewBox="0 0 24 24">
            <path strokeLinecap="round\" strokeLinejoin="round\" strokeWidth="2\" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <h2 className="text-xl font-bold">Error</h2>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-4">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          Top Algerian Repositories
          {sortBy === 'stars' && ' by Stars'}
          {sortBy === 'commits' && ' by Commits'}
          {sortBy === 'updated' && ' by Recent Activity'}
        </h2>
        {lastUpdated && (
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Last updated: {lastUpdated.toLocaleString()}
          </div>
        )}
      </div>
      
      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <LoadingSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repositories.map((repo, index) => (
            <RepositoryCard 
              key={repo.id} 
              repository={repo} 
              rank={index + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default RepositoryList;