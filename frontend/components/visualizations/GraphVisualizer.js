import { useState } from 'react'
import { motion } from 'framer-motion'

export default function GraphVisualizer() {
  const [graph] = useState({
    nodes: [
      { id: 0, x: 150, y: 100 },
      { id: 1, x: 300, y: 100 },
      { id: 2, x: 450, y: 100 },
      { id: 3, x: 150, y: 250 },
      { id: 4, x: 300, y: 250 },
      { id: 5, x: 450, y: 250 }
    ],
    edges: [
      { from: 0, to: 1 }, { from: 0, to: 3 },
      { from: 1, to: 2 }, { from: 1, to: 4 },
      { from: 2, to: 5 }, { from: 3, to: 4 }, { from: 4, to: 5 }
    ]
  })
  const [visited, setVisited] = useState([])
  const [current, setCurrent] = useState(null)

  const bfs = async (start) => {
    const queue = [start]
    const visitedNodes = []
    
    while (queue.length > 0) {
      const node = queue.shift()
      
      if (visitedNodes.includes(node)) continue
      
      setCurrent(node)
      await new Promise(resolve => setTimeout(resolve, 500))
      
      visitedNodes.push(node)
      setVisited([...visitedNodes])
      
      const neighbors = graph.edges
        .filter(e => e.from === node)
        .map(e => e.to)
      
      queue.push(...neighbors)
    }
    
    setCurrent(null)
  }

  const dfs = async (node, visitedNodes = []) => {
    if (visitedNodes.includes(node)) return
    
    setCurrent(node)
    await new Promise(resolve => setTimeout(resolve, 500))
    
    visitedNodes.push(node)
    setVisited([...visitedNodes])
    
    const neighbors = graph.edges
      .filter(e => e.from === node)
      .map(e => e.to)
    
    for (const neighbor of neighbors) {
      await dfs(neighbor, visitedNodes)
    }
    
    setCurrent(null)
  }

  const handleReset = () => {
    setVisited([])
    setCurrent(null)
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Graph Traversal</h2>
      
      <div className="flex gap-2 mb-6">
        <button onClick={() => { handleReset(); bfs(0); }} className="btn-primary">
          BFS
        </button>
        <button onClick={() => { handleReset(); dfs(0); }} className="btn-secondary">
          DFS
        </button>
        <button onClick={handleReset} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
          Reset
        </button>
      </div>

      <svg width="600" height="350" className="mb-4">
        {graph.edges.map((edge, i) => {
          const from = graph.nodes.find(n => n.id === edge.from)
          const to = graph.nodes.find(n => n.id === edge.to)
          return (
            <line
              key={i}
              x1={from.x}
              y1={from.y}
              x2={to.x}
              y2={to.y}
              stroke="currentColor"
              strokeWidth="2"
            />
          )
        })}
        
        {graph.nodes.map(node => (
          <g key={node.id}>
            <motion.circle
              cx={node.x}
              cy={node.y}
              r="30"
              fill={
                current === node.id ? '#fbbf24' :
                visited.includes(node.id) ? '#10b981' :
                '#3b82f6'
              }
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            />
            <text
              x={node.x}
              y={node.y + 5}
              textAnchor="middle"
              fill="white"
              fontWeight="bold"
              fontSize="18"
            >
              {node.id}
            </text>
          </g>
        ))}
      </svg>

      <div className="bg-gray-100 dark:bg-dark-light p-4 rounded-lg">
        <h3 className="font-bold mb-2">Visited Order:</h3>
        <p className="text-lg">{visited.join(' → ') || 'Click BFS or DFS to start'}</p>
      </div>
    </div>
  )
}
