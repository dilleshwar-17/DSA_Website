import json

# Read all problem files
with open('problems.json', 'r') as f:
    original = json.load(f)

with open('new_problems.json', 'r') as f:
    new1 = json.load(f)

with open('new_problems2.json', 'r') as f:
    new2 = json.load(f)

with open('new_problems3.json', 'r') as f:
    new3 = json.load(f)

with open('new_problems4.json', 'r') as f:
    new4 = json.load(f)

# Merge all problems
all_problems = original + new1 + new2 + new3 + new4

# Write to problems.json
with open('problems.json', 'w') as f:
    json.dump(all_problems, f, indent=2)

print(f"Successfully merged {len(all_problems)} problems!")
print(f"Original: {len(original)}, Added: {len(new1) + len(new2) + len(new3) + len(new4)}")
