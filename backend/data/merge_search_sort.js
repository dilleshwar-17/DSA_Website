const fs = require('fs');

const current = JSON.parse(fs.readFileSync('problems.json', 'utf8'));
const s1 = JSON.parse(fs.readFileSync('search_sort1.json', 'utf8'));
const s2 = JSON.parse(fs.readFileSync('search_sort2.json', 'utf8'));
const s3 = JSON.parse(fs.readFileSync('search_sort3.json', 'utf8'));

const all = [...current, ...s1, ...s2, ...s3];

fs.writeFileSync('problems.json', JSON.stringify(all, null, 2));

console.log(`Total problems: ${all.length}`);
console.log(`Added: ${s1.length + s2.length + s3.length} searching & sorting problems`);
