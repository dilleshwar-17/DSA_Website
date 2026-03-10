const fs = require('fs');
const path = require('path');

const problemsPath = 'c:/Users/srira/OneDrive/Desktop/DataNauts/Classes/dsa-platform/backend/data/problems.json';
const data = JSON.parse(fs.readFileSync(problemsPath, 'utf8'));

let missingIds = 0;
let nullIds = 0;
let uniqueIds = new Set();
let duplicates = [];

data.forEach((p, index) => {
  if (p.id === undefined) {
    missingIds++;
  } else if (p.id === null) {
    nullIds++;
  } else {
    if (uniqueIds.has(p.id)) {
      duplicates.push({ id: p.id, index });
    }
    uniqueIds.add(p.id);
  }
});

console.log(`Total problems: ${data.length}`);
console.log(`Missing IDs: ${missingIds}`);
console.log(`Null IDs: ${nullIds}`);
console.log(`Duplicate IDs: ${duplicates.length}`);
if (duplicates.length > 0) {
  console.log(`First duplicate:`, duplicates[0]);
}

if (missingIds > 0 || nullIds > 0 || duplicates.length > 0) {
  console.log("Data needs cleaning!");
} else {
  console.log("Data is clean!");
}
