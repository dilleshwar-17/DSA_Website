import { useState } from 'react'
import Navbar from '../components/ui/Navbar'
import ArrayVisualizer from '../components/visualizations/ArrayVisualizer'
import TreeVisualizer from '../components/visualizations/TreeVisualizer'
import GraphVisualizer from '../components/visualizations/GraphVisualizer'

export default function Visualizations({ darkMode, toggleDarkMode }) {
  const [activeCategory, setActiveCategory] = useState('arrays')
  const [activeAlgo, setActiveAlgo] = useState('bubbleSort')

  const categories = {
    arrays: ['bubbleSort', 'binarySearch', 'quickSort', 'mergeSort'],
    trees: ['traversal', 'bst', 'avl'],
    graphs: ['bfs', 'dfs', 'dijkstra', 'topologicalSort'],
    dp: ['knapsack', 'lcs', 'lis', 'coinChange']
  }

  const algoNames = {
    bubbleSort: 'Bubble Sort',
    binarySearch: 'Binary Search',
    quickSort: 'Quick Sort',
    mergeSort: 'Merge Sort',
    traversal: 'Tree Traversal',
    bst: 'Binary Search Tree',
    avl: 'AVL Tree',
    bfs: 'Breadth First Search',
    dfs: 'Depth First Search',
    dijkstra: 'Dijkstra Algorithm',
    topologicalSort: 'Topological Sort',
    knapsack: '0/1 Knapsack',
    lcs: 'Longest Common Subsequence',
    lis: 'Longest Increasing Subsequence',
    coinChange: 'Coin Change'
  }

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Algorithm Visualizations</h1>

        <div className="flex gap-8">
          <div className="w-64">
            <div className="card sticky top-20">
              <h2 className="text-xl font-bold mb-4">Categories</h2>
              
              {Object.keys(categories).map(cat => (
                <div key={cat} className="mb-4">
                  <button
                    onClick={() => { setActiveCategory(cat); setActiveAlgo(categories[cat][0]); }}
                    className={`w-full text-left px-4 py-2 rounded-lg mb-2 ${
                      activeCategory === cat ? 'bg-primary text-white' : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                  >
                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                  </button>
                  
                  {activeCategory === cat && (
                    <div className="ml-4 space-y-1">
                      {categories[cat].map(algo => (
                        <button
                          key={algo}
                          onClick={() => setActiveAlgo(algo)}
                          className={`w-full text-left px-3 py-1 rounded text-sm ${
                            activeAlgo === algo ? 'text-primary font-semibold' : 'hover:text-primary'
                          }`}
                        >
                          {algoNames[algo]}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="flex-1">
            {activeCategory === 'arrays' && (
              <ArrayVisualizer algorithm={activeAlgo} />
            )}
            
            {activeCategory === 'trees' && (
              <TreeVisualizer algorithm={activeAlgo} />
            )}
            
            {activeCategory === 'graphs' && (
              <GraphVisualizer algorithm={activeAlgo} />
            )}
            
            {activeCategory === 'dp' && (
              <div className="card">
                <h2 className="text-2xl font-bold mb-4">{algoNames[activeAlgo]}</h2>
                <p className="text-gray-600 dark:text-gray-400">
                  Dynamic Programming visualization for {algoNames[activeAlgo]} coming soon...
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}
