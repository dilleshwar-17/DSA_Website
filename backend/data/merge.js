const fs = require('fs');

const original = JSON.parse(fs.readFileSync('problems.json', 'utf8'));
const new1 = JSON.parse(fs.readFileSync('new_problems.json', 'utf8'));
const new2 = JSON.parse(fs.readFileSync('new_problems2.json', 'utf8'));
const new3 = JSON.parse(fs.readFileSync('new_problems3.json', 'utf8'));
const new4 = JSON.parse(fs.readFileSync('new_problems4.json', 'utf8'));

const all = [...original, ...new1, ...new2, ...new3, ...new4];

fs.writeFileSync('problems.json', JSON.stringify(all, null, 2));

console.log(`Successfully merged ${all.length} problems!`);
console.log(`Original: ${original.length}, Added: ${new1.length + new2.length + new3.length + new4.length}`);
