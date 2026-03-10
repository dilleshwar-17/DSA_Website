// Complete DSA Platform Redirect Configuration
// Supports HackerRank, LeetCode, and CodeChef

export const PLATFORMS = {
  HACKERRANK: 'hackerrank',
  LEETCODE: 'leetcode',
  CODECHEF: 'codechef'
};

export const platformConfig = {
  hackerrank: {
    name: 'HackerRank',
    color: '#2EC866',
    baseUrl: 'https://www.hackerrank.com'
  },
  leetcode: {
    name: 'LeetCode',
    color: '#FFA116',
    baseUrl: 'https://leetcode.com'
  },
  codechef: {
    name: 'CodeChef',
    color: '#5B4638',
    baseUrl: 'https://www.codechef.com'
  }
};

// Complete URL mappings for all DSA topics
export const platformPaths = {
  hackerrank: {
    'arrays': '/domains/data-structures/arrays',
    'strings': '/domains/algorithms/strings',
    'linked-list': '/domains/data-structures/linked-lists',
    'stacks': '/domains/data-structures/stacks',
    'queues': '/domains/data-structures/queues',
    'trees': '/domains/data-structures/trees',
    'graphs': '/domains/data-structures/graphs',
    'dynamic-programming': '/domains/algorithms/dynamic-programming',
    'sorting': '/domains/algorithms/arrays-and-sorting',
    'searching': '/domains/algorithms/search',
    'recursion': '/domains/algorithms/recursion',
    'hash-tables': '/domains/data-structures/hash-tables',
    'heaps': '/domains/data-structures/heaps',
    'greedy': '/domains/algorithms/greedy',
    'backtracking': '/domains/algorithms/backtracking',
    'bit-manipulation': '/domains/algorithms/bit-manipulation',
    'math': '/domains/mathematics',
    default: '/search?query='
  },
  leetcode: {
    'arrays': '/tag/array/',
    'strings': '/tag/string/',
    'linked-list': '/tag/linked-list/',
    'stacks': '/tag/stack/',
    'queues': '/tag/queue/',
    'trees': '/tag/tree/',
    'graphs': '/tag/graph/',
    'dynamic-programming': '/tag/dynamic-programming/',
    'sorting': '/tag/sorting/',
    'searching': '/tag/binary-search/',
    'recursion': '/tag/recursion/',
    'hash-tables': '/tag/hash-table/',
    'heaps': '/tag/heap/',
    'greedy': '/tag/greedy/',
    'backtracking': '/tag/backtracking/',
    'bit-manipulation': '/tag/bit-manipulation/',
    'math': '/tag/math/',
    default: '/problemset/?search='
  },
  codechef: {
    'arrays': '/practice?page=0&difficulty=&topics=Arrays&search=',
    'strings': '/practice?page=0&difficulty=&topics=Strings&search=',
    'linked-list': '/practice?page=0&difficulty=&topics=Linked%20List&search=',
    'stacks': '/practice?page=0&difficulty=&topics=Stack&search=',
    'queues': '/practice?page=0&difficulty=&topics=Queue&search=',
    'trees': '/practice?page=0&difficulty=&topics=Trees&search=',
    'graphs': '/practice?page=0&difficulty=&topics=Graphs&search=',
    'dynamic-programming': '/practice?page=0&difficulty=&topics=Dynamic%20Programming&search=',
    'sorting': '/practice?page=0&difficulty=&topics=Sorting&search=',
    'searching': '/practice?page=0&difficulty=&topics=Searching&search=',
    'recursion': '/practice?page=0&difficulty=&topics=Recursion&search=',
    'hash-tables': '/practice?page=0&difficulty=&topics=Hash%20Table&search=',
    'heaps': '/practice?page=0&difficulty=&topics=Heap&search=',
    'greedy': '/practice?page=0&difficulty=&topics=Greedy&search=',
    'backtracking': '/practice?page=0&difficulty=&topics=Backtracking&search=',
    'bit-manipulation': '/practice?page=0&difficulty=&topics=Bit%20Manipulation&search=',
    'math': '/practice?page=0&difficulty=&topics=Math&search=',
    default: '/practice?search='
  }
};

// Topic name to URL slug mapping
export const topicToSlug = {
  'arrays': 'arrays',
  'strings': 'strings',
  'linked lists': 'linked-list',
  'stacks': 'stacks',
  'queues': 'queues',
  'trees': 'trees',
  'binary trees': 'trees',
  'graphs': 'graphs',
  'dynamic programming': 'dynamic-programming',
  'advanced dp': 'dynamic-programming',
  'sorting': 'sorting',
  'searching': 'searching',
  'binary search': 'searching',
  'recursion': 'recursion',
  'hash tables': 'hash-tables',
  'hashing': 'hash-tables',
  'heaps': 'heaps',
  'greedy': 'greedy',
  'backtracking': 'backtracking',
  'bit manipulation': 'bit-manipulation',
  'math': 'math',
  'mathematics': 'math',
  'sliding window': 'arrays',
  'two pointers': 'arrays'
};

/**
 * Get platform URL for a specific topic
 * @param {string} platform - Platform ID (hackerrank, leetcode, codechef)
 * @param {string} topic - Topic name or slug
 * @returns {string} Complete URL to the platform's topic page
 */
export function getPlatformUrl(platform, topic) {
  const config = platformConfig[platform];
  if (!config) return null;

  const slug = topicToSlug[topic.toLowerCase()] || topic.toLowerCase().replace(/\s+/g, '-');
  const pathMapping = platformPaths[platform];
  
  if (pathMapping[slug]) {
    return config.baseUrl + pathMapping[slug];
  }
  
  return config.baseUrl + pathMapping.default + encodeURIComponent(topic);
}

/**
 * Open platform URL in new tab
 * @param {string} platform - Platform ID
 * @param {string} topic - Topic name
 */
export function openPlatform(platform, topic) {
  const url = getPlatformUrl(platform, topic);
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}

/**
 * Get/Set preferred platform from localStorage
 */
export const platformPreference = {
  get: () => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem('preferredPlatform') || 'leetcode';
    }
    return 'leetcode';
  },
  set: (platform) => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferredPlatform', platform);
    }
  }
};
