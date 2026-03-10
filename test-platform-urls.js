// Test script to validate all platform URLs
const topics = ['arrays', 'strings', 'linked-list', 'stacks', 'queues', 'trees', 'graphs', 'dynamic-programming', 'sorting', 'searching', 'recursion', 'hash-tables', 'heaps', 'greedy', 'backtracking', 'bit-manipulation', 'math'];

const platformUrls = {
  hackerrank: { base: 'https://www.hackerrank.com', paths: { 'arrays': '/domains/data-structures/arrays', 'strings': '/domains/algorithms/strings', 'linked-list': '/domains/data-structures/linked-lists', 'stacks': '/domains/data-structures/stacks', 'queues': '/domains/data-structures/queues', 'trees': '/domains/data-structures/trees', 'graphs': '/domains/data-structures/graphs', 'dynamic-programming': '/domains/algorithms/dynamic-programming', 'sorting': '/domains/algorithms/arrays-and-sorting', 'searching': '/domains/algorithms/search', 'recursion': '/domains/algorithms/recursion', 'hash-tables': '/domains/data-structures/hash-tables', 'heaps': '/domains/data-structures/heaps', 'greedy': '/domains/algorithms/greedy', 'backtracking': '/domains/algorithms/backtracking', 'bit-manipulation': '/domains/algorithms/bit-manipulation', 'math': '/domains/mathematics' }},
  leetcode: { base: 'https://leetcode.com', paths: { 'arrays': '/tag/array/', 'strings': '/tag/string/', 'linked-list': '/tag/linked-list/', 'stacks': '/tag/stack/', 'queues': '/tag/queue/', 'trees': '/tag/tree/', 'graphs': '/tag/graph/', 'dynamic-programming': '/tag/dynamic-programming/', 'sorting': '/tag/sorting/', 'searching': '/tag/binary-search/', 'recursion': '/tag/recursion/', 'hash-tables': '/tag/hash-table/', 'heaps': '/tag/heap/', 'greedy': '/tag/greedy/', 'backtracking': '/tag/backtracking/', 'bit-manipulation': '/tag/bit-manipulation/', 'math': '/tag/math/' }},
  codechef: { base: 'https://www.codechef.com', paths: { 'arrays': '/tags/problems/array', 'strings': '/tags/problems/string', 'linked-list': '/tags/problems/linked-list', 'stacks': '/tags/problems/stack', 'queues': '/tags/problems/queue', 'trees': '/tags/problems/tree', 'graphs': '/tags/problems/graph', 'dynamic-programming': '/tags/problems/dynamic-programming', 'sorting': '/tags/problems/sorting', 'searching': '/tags/problems/searching', 'recursion': '/tags/problems/recursion', 'hash-tables': '/tags/problems/hashing', 'heaps': '/tags/problems/heap', 'greedy': '/tags/problems/greedy', 'backtracking': '/tags/problems/backtracking', 'bit-manipulation': '/tags/problems/bit-manipulation', 'math': '/tags/problems/mathematics' }}
};

console.log('=== PLATFORM URL VALIDATION ===\n');

['hackerrank', 'leetcode', 'codechef'].forEach(platform => {
  console.log(`\n${platform.toUpperCase()}`);
  console.log('='.repeat(50));
  topics.forEach(topic => {
    const url = platformUrls[platform].base + platformUrls[platform].paths[topic];
    console.log(`${topic.padEnd(25)} ${url}`);
  });
});

console.log('\n\n=== SUMMARY ===');
console.log(`Total Topics: ${topics.length}`);
console.log(`Total Platforms: 3`);
console.log(`Total URLs: ${topics.length * 3}`);
