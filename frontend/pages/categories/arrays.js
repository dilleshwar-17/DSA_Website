import Navbar from '../../components/ui/Navbar'
import Link from 'next/link'

export default function Arrays({ darkMode, toggleDarkMode }) {
  const problems = [
    { id: 1, title: 'Two Sum', difficulty: 'Easy' },
    { id: 2, title: 'Best Time to Buy and Sell Stock', difficulty: 'Medium' },
    { id: 3, title: 'Contains Duplicate', difficulty: 'Easy' },
    { id: 4, title: 'Product of Array Except Self', difficulty: 'Medium' },
    { id: 5, title: 'Maximum Subarray', difficulty: 'Medium' }
  ]

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Arrays</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">
          Master array manipulation and traversal techniques
        </p>
        
        <div className="grid gap-4">
          {problems.map(p => (
            <Link key={p.id} href={`/problem/${p.id}`} className="card hover:shadow-xl transition-all">
              <div className="flex justify-between items-center">
                <h3 className="text-xl font-semibold">{p.title}</h3>
                <span className={`px-3 py-1 rounded-full text-sm ${
                  p.difficulty === 'Easy' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                }`}>
                  {p.difficulty}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </>
  )
}
