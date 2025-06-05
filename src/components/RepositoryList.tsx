import { useState, useEffect } from 'react';
import RepositoryCard from './RepositoryCard';
import { fetchAlgerianRepositories } from '../services/githubService';
import { Repository } from '../types/repository';
import LoadingSkeleton from './LoadingSkeleton';

interface RepositoryListProps {
  sortBy: 'stars' | 'commits' | 'updated';
  searchQuery: string;
}

const RepositoryList = ({ sortBy, searchQuery }: RepositoryListProps) => {
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
  }, [sortBy]);

  const filteredRepositories = repositories.filter(repo => {
    const query = searchQuery.toLowerCase();
    return (
      repo.name.toLowerCase().includes(query) ||
      repo.owner.login.toLowerCase().includes(query) ||
      (repo.description && repo.description.toLowerCase().includes(query))
    );
  });

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-12">
        <div className="text-red-500 text-center mb-4">
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
          {searchQuery ? `Search Results (${filteredRepositories.length})` : `Top ${repositories.length} Algerian Repositories`}
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
      ) : filteredRepositories.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRepositories.map((repo, index) => (
            <RepositoryCard 
              key={repo.id} 
              repository={repo} 
              rank={index + 1}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12 text-gray-500">
          No repositories found matching your search
        </div>
      )}
    </div>
  );
};

export default RepositoryList