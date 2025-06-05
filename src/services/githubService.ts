import { Repository } from '../types/repository';

const BACKEND_API = 'http://localhost:5000/api/top-repos';

export const fetchAlgerianRepositories = async (
  sortBy: 'stars' | 'commits' | 'updated' = 'stars'
): Promise<Repository[]> => {
  try {
    const response = await fetch(BACKEND_API);

    if (!response.ok) {
      throw new Error(`Failed to fetch data from backend: ${response.statusText}`);
    }

    const result = await response.json();
    const repos: Repository[] = result.data;

    switch (sortBy) {
      case 'stars':
        return repos.sort((a, b) => b.stargazers_count - a.stargazers_count);
      case 'updated':
        return repos.sort(
          (a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
        );
      case 'commits':
        return repos;
      default:
        return repos;
    }
  } catch (error) {
    console.error('Error fetching repositories:', error);
    throw error;
  }
};