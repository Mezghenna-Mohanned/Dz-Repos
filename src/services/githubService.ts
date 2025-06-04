import { Repository } from '../types/repository';

const GITHUB_API_BASE = 'https://api.github.com';
const USERS_PER_PAGE = 50;
const MAX_USER_PAGES = 20;
const REPOS_PER_USER = 5;

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
    const headers = {
      Authorization: `Bearer ${token}`,
      Accept: 'application/vnd.github.v3+json',
    };

    let allUsers: any[] = [];

    for (let page = 1; page <= MAX_USER_PAGES; page++) {
      const searchParams = new URLSearchParams({
        q: 'location:algeria',
        per_page: USERS_PER_PAGE.toString(),
        page: page.toString(),
      });

      const response = await fetch(`${GITHUB_API_BASE}/search/users?${searchParams}`, { headers });
      if (!response.ok) break;

      const data = await response.json();
      const users = data.items || [];

      if (users.length === 0) break;
      allUsers.push(...users);
    }

    const uniqueUsers = Array.from(new Map(allUsers.map(u => [u.login, u])).values());

    let allRepos: Repository[] = [];

    for (const user of uniqueUsers) {
      const reposResponse = await fetch(
        `${GITHUB_API_BASE}/users/${user.login}/repos?per_page=${REPOS_PER_USER}&sort=updated`,
        { headers }
      );

      if (!reposResponse.ok) continue;

      const reposData = await reposResponse.json();

      const mappedRepos: Repository[] = reposData.map((item: any) => ({
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

      allRepos.push(...mappedRepos);
    }

    switch (sortBy) {
      case 'stars':
        allRepos.sort((a, b) => b.stargazers_count - a.stargazers_count);
        break;
      case 'updated':
        allRepos.sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime());
        break;
      case 'commits':
        break;
    }

    return allRepos.slice(0, 250);
  } catch (error: any) {
    console.error('GitHub API Error:', error);
    throw new GitHubError(`Failed to fetch repositories: ${error.message}`);
  }
};
