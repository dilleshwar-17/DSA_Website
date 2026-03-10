import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../../components/ui/Navbar'
import ArrayVisualizer from '../../components/visualizations/ArrayVisualizer'
import PlatformSelector from '../../components/ui/PlatformSelector'

export default function ProblemDetail({ darkMode, toggleDarkMode }) {
  const router = useRouter()
  const { id } = router.query
  const [problem, setProblem] = useState(null)
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    if (id) {
      fetch(`/api/problems/${id}`)
        .then(res => res.json())
        .then(data => {
          setProblem(data)
        })
        .catch(err => console.error(err))
    }
  }, [id])

  if (!problem) return <div>Loading...</div>

  // Determine which visualization to show based on category or tags
  const showVisualization = problem.category === 'Arrays' || problem.category === 'Searching' || problem.category === 'Sorting';
  
  // Extract a default array from the first test case or example to use in the visualizer
  let defaultVisArray = [64, 34, 25, 12, 22, 11, 90];
  if (problem.testCases && problem.testCases[0] && problem.testCases[0].input && problem.testCases[0].input.nums) {
      defaultVisArray = problem.testCases[0].input.nums;
  } else if (problem.testCases && problem.testCases[0] && problem.testCases[0].input && problem.testCases[0].input.arr) {
      defaultVisArray = problem.testCases[0].input.arr;
  }

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="min-h-screen bg-gray-50 dark:bg-dark py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Section */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8 p-6 bg-white dark:bg-dark-light rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800">
            <div>
              <h1 className="text-4xl font-bold mb-2">{problem.title}</h1>
              <div className="flex gap-2">
                <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                  problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
                  problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-red-100 text-red-800'
                }`}>
                  {problem.difficulty}
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-800">
                  {problem.category}
                </span>
              </div>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-xs font-black uppercase text-gray-400 tracking-widest">Select Platform to Solve:</span>
              <PlatformSelector 
                platformLinks={problem.platformLinks || {}} 
                topic={problem.category}
              />
            </div>
          </div>

          <div className="bg-white dark:bg-dark-light rounded-2xl shadow-sm border border-gray-100 dark:border-gray-800 overflow-hidden">
            {/* Tabs */}
            <div className="flex gap-8 px-8 border-b dark:border-gray-700">
              <button 
                onClick={() => setActiveTab('description')}
                className={`py-4 font-bold text-sm uppercase tracking-widest transition-all ${activeTab === 'description' ? 'border-b-4 border-primary text-primary' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Description
              </button>
              <button 
                onClick={() => setActiveTab('hints')}
                className={`py-4 font-bold text-sm uppercase tracking-widest transition-all ${activeTab === 'hints' ? 'border-b-4 border-primary text-primary' : 'text-gray-400 hover:text-gray-600'}`}
              >
                Hints
              </button>
              {showVisualization && (
                <button 
                  onClick={() => setActiveTab('visualization')}
                  className={`py-4 font-bold text-sm uppercase tracking-widest transition-all flex items-center gap-2 ${activeTab === 'visualization' ? 'border-b-4 border-primary text-primary' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <span className="text-lg">✨</span> Visualization
                </button>
              )}
            </div>

            <div className="p-8">
              {activeTab === 'description' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <h2 className="text-2xl font-bold mb-4">Problem Description</h2>
                  <p className="text-lg text-gray-700 dark:text-gray-300 mb-8 leading-relaxed">
                    {problem.description}
                  </p>

                  <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                    </svg>
                    Examples
                  </h3>
                  <div className="grid gap-4 mb-8">
                    {problem.examples?.map((ex, i) => (
                      <div key={i} className="bg-gray-50 dark:bg-gray-900/50 p-6 rounded-xl border border-gray-100 dark:border-gray-800">
                        <div className="mb-2"><strong className="text-primary uppercase text-xs tracking-widest">Input:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">{ex.input}</code></div>
                        <div className="mb-2"><strong className="text-primary uppercase text-xs tracking-widest">Output:</strong> <code className="bg-gray-200 dark:bg-gray-700 px-2 py-1 rounded text-sm">{ex.output}</code></div>
                        <div><strong className="text-primary uppercase text-xs tracking-widest">Explanation:</strong> <span className="text-gray-600 dark:text-gray-400 text-sm">{ex.explanation}</span></div>
                      </div>
                    ))}
                  </div>

                  <div className="grid md:grid-cols-2 gap-8 mt-8 pt-8 border-t dark:border-gray-800">
                    <div>
                      <h3 className="text-xl font-bold mb-4">Constraints</h3>
                      <p className="text-gray-600 dark:text-gray-400 font-mono text-sm leading-relaxed whitespace-pre-line">
                        {problem.constraints}
                      </p>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-4">Complexity</h3>
                      <div className="flex flex-col gap-2">
                        <div className="flex justify-between p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <span className="font-bold text-blue-700 dark:text-blue-300">Time Complexity</span>
                          <code className="text-blue-800 dark:text-blue-200">{problem.timeComplexity}</code>
                        </div>
                        <div className="flex justify-between p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <span className="font-bold text-purple-700 dark:text-purple-300">Space Complexity</span>
                          <code className="text-purple-800 dark:text-purple-200">{problem.spaceComplexity}</code>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {activeTab === 'hints' && (
                <div className="animate-in fade-in slide-in-from-bottom-2 duration-500">
                  <h2 className="text-2xl font-bold mb-6">Strategy Tips & Hints</h2>
                  <div className="space-y-4">
                    {problem.hints?.map((hint, i) => (
                      <div key={i} className="group flex gap-4 p-6 bg-gray-50 dark:bg-gray-900/50 rounded-xl border-l-4 border-primary transition-all hover:bg-white dark:hover:bg-gray-800 hover:shadow-md">
                        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                          {i + 1}
                        </div>
                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed italic">
                          {hint}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {activeTab === 'visualization' && showVisualization && (
                <div className="animate-in fade-in zoom-in duration-500">
                  <div className="mb-6 p-4 bg-primary/5 rounded-xl border border-primary/20 text-primary-dark dark:text-primary-light italic text-sm">
                    Interactive visualization to help you build intuition for the <strong>{problem.title}</strong> algorithm.
                  </div>
                  <ArrayVisualizer 
                    algorithm={problem.title.toLowerCase().includes('search') ? 'binarySearch' : 'bubbleSort'} 
                    data={defaultVisArray} 
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
