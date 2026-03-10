import { getPlatformUrl } from './utils/platformRedirects.js';

const sampleProblem = {
  title: "Two Sum",
  category: "Arrays",
  platformLinks: {
    leetcode: "https://leetcode.com/problems/two-sum/",
    hackerrank: "https://www.hackerrank.com/challenges/two-sum/problem",
    codechef: "https://www.codechef.com/problems/TWOSUM"
  }
};

const problemWithoutLinks = {
  title: "Some New Problem",
  category: "Arrays",
  platformLinks: {}
};

console.log("=== Testing Specific Problem Redirection ===\n");

console.log("1. Problem with specific links (Two Sum):");
console.log(`- LeetCode: ${getPlatformUrl('leetcode', sampleProblem.category, sampleProblem.platformLinks)}`);
console.log(`- HackerRank: ${getPlatformUrl('hackerrank', sampleProblem.category, sampleProblem.platformLinks)}`);
console.log(`- CodeChef: ${getPlatformUrl('codechef', sampleProblem.category, sampleProblem.platformLinks)}`);

console.log("\n2. Problem WITHOUT specific links (Fallback to Topic):");
console.log(`- LeetCode: ${getPlatformUrl('leetcode', problemWithoutLinks.category, problemWithoutLinks.platformLinks)}`);
console.log(`- HackerRank: ${getPlatformUrl('hackerrank', problemWithoutLinks.category, problemWithoutLinks.platformLinks)}`);
console.log(`- CodeChef: ${getPlatformUrl('codechef', problemWithoutLinks.category, problemWithoutLinks.platformLinks)}`);
