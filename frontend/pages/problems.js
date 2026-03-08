import { useState, useEffect } from 'react'
import Link from 'next/link'
import Navbar from '../components/ui/Navbar'

export default function Problems({ darkMode, toggleDarkMode }) {
  const [problems, setProblems] = useState([])
  const [filter, setFilter] = useState({ category: 'all', difficulty: 'all' })

  useEffect(() => {
    fetch('http://localhost:5000/api/problems')
      .then(res => res.json())
      .then(data => setProblems(data))
      .catch(err => console.error(err))
  }, [])

  const categories = ['Arrays', 'Binary Search', 'Sliding Window', 'Two Pointers', 'Stacks', 'Queues', 'Heaps', 'Greedy', 'Trees', 'Graphs', 'Backtracking', 'Dynamic Programming', 'Advanced DP']
  const difficulties = ['Easy', 'Medium', 'Hard']

  const filteredProblems = problems.filter(p => 
    (filter.category === 'all' || p.category === filter.category) &&
    (filter.difficulty === 'all' || p.difficulty === filter.difficulty)
  )

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Practice Problems</h1>

        <div className="flex gap-4 mb-8 flex-wrap">
          <select 
            value={filter.category}
            onChange={(e) => setFilter({...filter, category: e.target.value})}
            className="px-4 py-2 rounded-lg border dark:bg-dark-light"
          >
            <option value="all">All Categories</option>
            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
          </select>

          <select 
            value={filter.difficulty}
            onChange={(e) => setFilter({...filter, difficulty: e.target.value})}
            className="px-4 py-2 rounded-lg border dark:bg-dark-light"
          >
            <option value="all">All Difficulties</option>
            {difficulties.map(diff => <option key={diff} value={diff}>{diff}</option>)}
          </select>
        </div>

        <div className="card">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left py-3 px-4">Title</th>
                <th className="text-left py-3 px-4">Category</th>
                <th className="text-left py-3 px-4">Difficulty</th>
                <th className="text-left py-3 px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {filteredProblems.map(problem => (
                <tr key={problem.id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="py-3 px-4">{problem.title}</td>
                  <td className="py-3 px-4">{problem.category}</td>
                  <td className="py-3 px-4">
                    <span className={`px-3 py-1 rounded-full text-sm ${
                      problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                      problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {problem.difficulty}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <Link href={`/problem/${problem.id}`} className="text-primary hover:underline">
                      Solve
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
