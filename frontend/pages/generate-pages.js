const fs = require('fs');
const path = require('path');

const categories = [
  'binary-search', 'sliding-window', 'two-pointers', 'stacks', 
  'queues', 'heaps', 'greedy', 'trees', 'graphs', 
  'backtracking', 'dynamic-programming', 'advanced-dp'
];

const template = (category, title) => `import Navbar from '../../components/ui/Navbar'
import Link from 'next/link'

export default function ${category.replace(/-/g, '')}({ darkMode, toggleDarkMode }) {
  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">${title}</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Master ${title.toLowerCase()} techniques and patterns
        </p>
        <Link href="/problems" className="btn-primary">View All Problems</Link>
      </div>
    </>
  )
}
`;

categories.forEach(cat => {
  const title = cat.split('-').map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(' ');
  const content = template(cat, title);
  fs.writeFileSync(path.join(__dirname, 'categories', `${cat}.js`), content);
  console.log(`Created ${cat}.js`);
});

console.log('All category pages created!');
