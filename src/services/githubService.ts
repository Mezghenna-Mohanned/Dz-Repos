import { Repository } from '../types/repository';

const GITHUB_API_BASE = 'https://api.github.com';

export class GitHubError extends Error {
  constructor(message: string, public status?: number) {
    super(message);
    this.name = 'GitHubError';
  }
}

/**
 * In a real application, this would call the GitHub API to fetch real data.
 * For demo purposes, we're using mock data to simulate API responses.
 * 
 * To implement a real GitHub API integration, you would need:
 * 1. A GitHub API token (to avoid rate limiting)
 * 2. Server-side processing to handle authentication and caching
 * 3. Proper error handling and rate limit management
 */
export const fetchAlgerianRepositories = async (
  sortBy: 'stars' | 'commits' | 'updated' = 'stars',
  page: number = 1
): Promise<{ repositories: Repository[]; totalCount: number }> => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  
  if (!token) {
    throw new GitHubError('GitHub token is not configured. Please add your token to the .env file.');
  }

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/search/repositories?q=location:algeria&sort=${sortBy}&per_page=30&page=${page}`,
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
    
    return {
      repositories: data.items.map((item: any) => ({
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
        forks_count: item.forks_count,
        language: item.language,
        topics: item.topics,
        created_at: item.created_at,
        updated_at: item.updated_at,
        homepage: item.homepage,
      })),
      totalCount: Math.min(data.total_count, 1000) // GitHub API limits to 1000 results
    };
  } catch (error) {
    if (error instanceof GitHubError) {
      throw error;
    }
    throw new GitHubError(`Failed to fetch repositories: ${error.message}`);
  }
};

export const fetchRepositoryDetails = async (owner: string, repo: string): Promise<Repository> => {
  const token = import.meta.env.VITE_GITHUB_TOKEN;
  
  if (!token) {
    throw new GitHubError('GitHub token is not configured. Please add your token to the .env file.');
  }

  try {
    const response = await fetch(
      `${GITHUB_API_BASE}/repos/${owner}/${repo}`,
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
    
    return {
      id: data.id,
      name: data.name,
      full_name: data.full_name,
      owner: {
        login: data.owner.login,
        avatar_url: data.owner.avatar_url,
      },
      html_url: data.html_url,
      description: data.description,
      stargazers_count: data.stargazers_count,
      forks_count: data.forks_count,
      language: data.language,
      topics: data.topics,
      created_at: data.created_at,
      updated_at: data.updated_at,
      homepage: data.homepage,
    };
  } catch (error) {
    if (error instanceof GitHubError) {
      throw error;
    }
    throw new GitHubError(`Failed to fetch repository details: ${error.message}`);
  }
};

// Additional functions that would be needed in a real implementation:

// Get commit count for a repository (would require separate API calls)
export const fetchRepositoryCommits = async (owner: string, repo: string): Promise<number> => {
  // This is a simplified version. In reality, you'd need pagination to get all commits
  // const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/commits?per_page=1`, {
  //   headers: {
  //     Authorization: `token ${process.env.GITHUB_TOKEN}`,
  //   },
  // });
  // const linkHeader = response.headers.get('Link');
  // // Parse link header to get total count
  // // For simplicity, returning a random number in the mock
  return Math.floor(Math.random() * 1000);
};

// Refresh repository data (would be called on a schedule)
export const refreshRepositoryData = async (): Promise<void> => {
  // In a real application, this would:
  // 1. Fetch fresh data from GitHub API
  // 2. Update the application's database or cache
  // 3. Mark the last updated timestamp
  console.log('Repository data refreshed at:', new Date().toISOString());
};