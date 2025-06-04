import { Repository } from '../types/repository';

const GITHUB_API_BASE = 'https://api.github.com';
const PER_PAGE = 100; // Maximum allowed by GitHub API

export class GitHubError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'GitHubError';
  }
}

export const fetchAlgerianRepositories = async (
  sortBy: 'stars' | 'commits' | 'updated' = 'stars'
): Promise<Repository[]> => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  
  if (!token) {
    throw new GitHubError('GitHub token is not configured');
  }

  try {
    // We'll need to make multiple requests to get 250 repositories
    const pages = Math.ceil(250 / PER_PAGE);
    let allRepositories: Repository[] = [];

    for (let page = 1; page <= pages; page++) {
      const response = await fetch(
        `${GITHUB_API_BASE}/search/repositories?q=location:algeria+language:javascript+language:typescript+language:python+language:java&sort=${sortBy === 'updated' ? 'updated' : 'stars'}&order=desc&per_page=${PER_PAGE}&page=${page}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Accept': 'application/vnd.github.v3+json',
          }
        }
      );

      if (!response.ok) {
        throw new GitHubError(`GitHub API error: ${response.statusText}`, response.status);
      }

      const data = await response.json();
      const repositories = data.items.map((item: any) => ({
        id: item.id,
        name: item.name,
        full_name: item.full_name,
        owner: {
          login: item.owner.login,
          avatar_url: item.owner.avatar_url,
        },
        html_url: item.html_url,
        description: item.description,
        stargazers_count: item.stargazers_count,
        watchers: item.watchers_count,
        forks_count: item.forks_count,
        language: item.language,
        topics: item.topics || [],
        created_at: item.created_at,
        updated_at: item.updated_at,
        homepage: item.homepage,
      }));

      allRepositories = [...allRepositories, ...repositories];

      // If we have enough repositories or there are no more results, break
      if (allRepositories.length >= 250 || repositories.length < PER_PAGE) {
        break;
      }
    }

    // Slice to ensure we only return 250 repositories
    return allRepositories.slice(0, 250);
  } catch (error) {
    if (error instanceof GitHubError) {
      throw error;
    }
    throw new GitHubError(`Failed to fetch repositories: ${error.message}`);
  }
};