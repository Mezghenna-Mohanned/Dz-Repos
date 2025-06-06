import { Repository } from '../types/repository';

// Mock data to simulate GitHub API responses
export const mockRepositories: Repository[] = [
  {
    id: 1,
    name: 'awesome-algeria',
    full_name: 'algeriatech/awesome-algeria',
    html_url: 'https://github.com/algeriatech/awesome-algeria',
    description: 'A curated list of awesome libraries, tools and resources for Algerian developers',
    created_at: '2020-01-15T10:30:15Z',
    updated_at: '2023-08-25T14:22:33Z',
    pushed_at: '2023-08-22T09:12:45Z',
    stargazers_count: 842,
    watchers_count: 842,
    forks_count: 156,
    language: 'JavaScript',
    commits_count: 358,
    owner: {
      login: 'algeriatech',
      id: 101,
      avatar_url: 'https://avatars.githubusercontent.com/u/10218510',
      html_url: 'https://github.com/algeriatech',
    }
  },
  {
    id: 2,
    name: 'dz-community-bot',
    full_name: 'Fcmam5/dz-community-bot',
    html_url: 'https://github.com/Fcmam5/dz-community-bot',
    description: 'A bot for Algerian tech communities on Telegram 🇩🇿',
    created_at: '2019-05-10T08:45:30Z',
    updated_at: '2023-09-18T11:34:22Z',
    pushed_at: '2023-09-15T16:22:11Z',
    stargazers_count: 531,
    watchers_count: 531,
    forks_count: 78,
    language: 'TypeScript',
    commits_count: 425,
    owner: {
      login: 'Fcmam5',
      id: 102,
      avatar_url: 'https://avatars.githubusercontent.com/u/6874664',
      html_url: 'https://github.com/Fcmam5',
    }
  },
  {
    id: 3,
    name: 'algeria-api',
    full_name: 'dzcode-io/algeria-api',
    html_url: 'https://github.com/dzcode-io/algeria-api',
    description: 'Open APIs for Algerian developers providing data about administrative divisions, postal codes, etc.',
    created_at: '2021-03-22T14:20:45Z',
    updated_at: '2023-10-05T09:15:33Z',
    pushed_at: '2023-10-02T13:45:20Z',
    stargazers_count: 712,
    watchers_count: 712,
    forks_count: 135,
    language: 'TypeScript',
    commits_count: 678,
    owner: {
      login: 'dzcode-io',
      id: 103,
      avatar_url: 'https://avatars.githubusercontent.com/u/44006942',
      html_url: 'https://github.com/dzcode-io',
    }
  },
  {
    id: 4,
    name: 'algerian-js',
    full_name: 'abderrahmaneMustapha/algerian-js',
    html_url: 'https://github.com/abderrahmaneMustapha/algerian-js',
    description: 'A library of utilities for Algerian developers including wilaya codes, postal codes, and more',
    created_at: '2020-11-12T11:10:25Z',
    updated_at: '2023-07-30T16:40:12Z',
    pushed_at: '2023-07-28T08:22:15Z',
    stargazers_count: 388,
    watchers_count: 388,
    forks_count: 67,
    language: 'JavaScript',
    commits_count: 234,
    owner: {
      login: 'abderrahmaneMustapha',
      id: 104,
      avatar_url: 'https://avatars.githubusercontent.com/u/25661632',
      html_url: 'https://github.com/abderrahmaneMustapha',
    }
  },
  {
    id: 5,
    name: 'dz-dialect-translator',
    full_name: 'SamirTouira/dz-dialect-translator',
    html_url: 'https://github.com/SamirTouira/dz-dialect-translator',
    description: 'Neural machine translation model for translating between Algerian dialect and Modern Standard Arabic',
    created_at: '2021-09-05T09:33:42Z',
    updated_at: '2023-11-10T13:25:18Z',
    pushed_at: '2023-11-08T10:55:22Z',
    stargazers_count: 623,
    watchers_count: 623,
    forks_count: 95,
    language: 'Python',
    commits_count: 312,
    owner: {
      login: 'SamirTouira',
      id: 105,
      avatar_url: 'https://avatars.githubusercontent.com/u/32818439',
      html_url: 'https://github.com/SamirTouira',
    }
  },
  {
    id: 6,
    name: 'dzair-cities-db',
    full_name: 'rofazayn/dzair-cities-db',
    html_url: 'https://github.com/rofazayn/dzair-cities-db',
    description: 'A comprehensive database of Algerian cities, wilayas, and dairas with geographic data',
    created_at: '2020-06-18T15:22:37Z',
    updated_at: '2023-08-12T11:44:55Z',
    pushed_at: '2023-08-10T14:33:21Z',
    stargazers_count: 405,
    watchers_count: 405,
    forks_count: 82,
    language: 'JavaScript',
    commits_count: 187,
    owner: {
      login: 'rofazayn',
      id: 106,
      avatar_url: 'https://avatars.githubusercontent.com/u/28189896',
      html_url: 'https://github.com/rofazayn',
    }
  },
  {
    id: 7,
    name: 'algeria-municipalities',
    full_name: 'mohsenuss91/algeria-municipalities',
    html_url: 'https://github.com/mohsenuss91/algeria-municipalities',
    description: 'A dataset containing all Algerian municipalities with administrative divisions and codes',
    created_at: '2019-12-03T10:15:22Z',
    updated_at: '2023-06-20T09:30:45Z',
    pushed_at: '2023-06-18T14:25:11Z',
    stargazers_count: 287,
    watchers_count: 287,
    forks_count: 58,
    language: 'Python',
    commits_count: 142,
    owner: {
      login: 'mohsenuss91',
      id: 107,
      avatar_url: 'https://avatars.githubusercontent.com/u/6825816',
      html_url: 'https://github.com/mohsenuss91',
    }
  },
  {
    id: 8,
    name: 'dz-dev-community',
    full_name: 'ilies-space/dz-dev-community',
    html_url: 'https://github.com/ilies-space/dz-dev-community',
    description: 'A platform connecting Algerian developers and showcasing their projects',
    created_at: '2021-01-25T13:40:55Z',
    updated_at: '2023-10-30T16:22:33Z',
    pushed_at: '2023-10-28T11:15:40Z',
    stargazers_count: 493,
    watchers_count: 493,
    forks_count: 102,
    language: 'JavaScript',
    commits_count: 275,
    owner: {
      login: 'ilies-space',
      id: 108,
      avatar_url: 'https://avatars.githubusercontent.com/u/63064069',
      html_url: 'https://github.com/ilies-space',
    }
  },
  {
    id: 9,
    name: 'darja-nlp',
    full_name: 'karimimp/darja-nlp',
    html_url: 'https://github.com/karimimp/darja-nlp',
    description: 'Natural Language Processing tools for Algerian Arabic (Darja)',
    created_at: '2021-05-14T09:22:48Z',
    updated_at: '2023-09-05T14:33:27Z',
    pushed_at: '2023-09-03T10:45:22Z',
    stargazers_count: 355,
    watchers_count: 355,
    forks_count: 64,
    language: 'Python',
    commits_count: 198,
    owner: {
      login: 'karimimp',
      id: 109,
      avatar_url: 'https://avatars.githubusercontent.com/u/19255539',
      html_url: 'https://github.com/karimimp',
    }
  },
  {
    id: 10,
    name: 'algeria-cities-api',
    full_name: 'algeriacities/algeria-cities-api',
    html_url: 'https://github.com/algeriacities/algeria-cities-api',
    description: 'RESTful API providing data about Algerian cities with postal codes and geolocation',
    created_at: '2020-08-08T11:55:33Z',
    updated_at: '2023-11-15T13:20:45Z',
    pushed_at: '2023-11-14T09:15:30Z',
    stargazers_count: 475,
    watchers_count: 475,
    forks_count: 89,
    language: 'TypeScript',
    commits_count: 243,
    owner: {
      login: 'algeriacities',
      id: 110,
      avatar_url: 'https://avatars.githubusercontent.com/u/38125192',
      html_url: 'https://github.com/algeriacities',
    }
  },
  {
    id: 11,
    name: 'covid19-dz-api',
    full_name: 'ZakariaMegnine/covid19-dz-api',
    html_url: 'https://github.com/ZakariaMegnine/covid19-dz-api',
    description: 'API for tracking COVID-19 statistics in Algeria with historical data',
    created_at: '2020-04-10T10:22:33Z',
    updated_at: '2023-05-22T14:15:55Z',
    pushed_at: '2023-05-20T09:40:22Z',
    stargazers_count: 312,
    watchers_count: 312,
    forks_count: 75,
    language: 'JavaScript',
    commits_count: 186,
    owner: {
      login: 'ZakariaMegnine',
      id: 111,
      avatar_url: 'https://avatars.githubusercontent.com/u/42235825',
      html_url: 'https://github.com/ZakariaMegnine',
    }
  },
  {
    id: 12,
    name: 'dz-universities',
    full_name: 'youknowriad/dz-universities',
    html_url: 'https://github.com/youknowriad/dz-universities',
    description: 'A dataset of all Algerian universities and higher education institutions',
    created_at: '2019-09-30T13:45:25Z',
    updated_at: '2023-07-15T11:33:40Z',
    pushed_at: '2023-07-12T10:20:15Z',
    stargazers_count: 289,
    watchers_count: 289,
    forks_count: 53,
    language: 'JavaScript',
    commits_count: 124,
    owner: {
      login: 'youknowriad',
      id: 112,
      avatar_url: 'https://avatars.githubusercontent.com/u/272444',
      html_url: 'https://github.com/youknowriad',
    }
  }
];