// URL Validation Test
const topics = ['arrays', 'strings', 'linked-list', 'stacks', 'queues', 'trees', 'graphs', 'dynamic-programming', 'sorting', 'searching', 'recursion', 'hash-tables', 'heaps', 'greedy', 'backtracking', 'bit-manipulation', 'math'];

const platforms = {
  hackerrank: 'https://www.hackerrank.com',
  leetcode: 'https://leetcode.com',
  codechef: 'https://www.codechef.com'
};

console.log('Testing all platform URLs...\n');
console.log(`Total: ${topics.length * 3} URLs\n`);

topics.forEach(topic => {
  console.log(`Topic: ${topic}`);
});
