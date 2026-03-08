import { useState } from 'react'
import { motion } from 'framer-motion'

export default function TreeVisualizer({ algorithm }) {
  const [tree, setTree] = useState({
    value: 10,
    left: { value: 5, left: { value: 3 }, right: { value: 7 } },
    right: { value: 15, left: { value: 12 }, right: { value: 20 } }
  })
  const [traversal, setTraversal] = useState([])
  const [current, setCurrent] = useState(null)

  const TreeNode = ({ node, x, y, level }) => {
    if (!node) return null
    
    const offset = 100 / Math.pow(2, level)
    
    return (
      <>
        {node.left && (
          <line 
            x1={x} 
            y1={y} 
            x2={x - offset} 
            y2={y + 80} 
            stroke="currentColor" 
            strokeWidth="2"
          />
        )}
        {node.right && (
          <line 
            x1={x} 
            y1={y} 
            x2={x + offset} 
            y2={y + 80} 
            stroke="currentColor" 
            strokeWidth="2"
          />
        )}
        
        <motion.circle
          cx={x}
          cy={y}
          r="25"
          fill={current === node.value ? '#fbbf24' : traversal.includes(node.value) ? '#10b981' : '#3b82f6'}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
        />
        <text x={x} y={y + 5} textAnchor="middle" fill="white" fontWeight="bold">
          {node.value}
        </text>
        
        {node.left && <TreeNode node={node.left} x={x - offset} y={y + 80} level={level + 1} />}
        {node.right && <TreeNode node={node.right} x={x + offset} y={y + 80} level={level + 1} />}
      </>
    )
  }

  const inorderTraversal = async (node, result = []) => {
    if (!node) return result
    
    await inorderTraversal(node.left, result)
    setCurrent(node.value)
    await new Promise(resolve => setTimeout(resolve, 500))
    result.push(node.value)
    setTraversal([...result])
    await inorderTraversal(node.right, result)
    
    return result
  }

  const preorderTraversal = async (node, result = []) => {
    if (!node) return result
    
    setCurrent(node.value)
    await new Promise(resolve => setTimeout(resolve, 500))
    result.push(node.value)
    setTraversal([...result])
    await preorderTraversal(node.left, result)
    await preorderTraversal(node.right, result)
    
    return result
  }

  const postorderTraversal = async (node, result = []) => {
    if (!node) return result
    
    await postorderTraversal(node.left, result)
    await postorderTraversal(node.right, result)
    setCurrent(node.value)
    await new Promise(resolve => setTimeout(resolve, 500))
    result.push(node.value)
    setTraversal([...result])
    
    return result
  }

  const handleTraversal = (type) => {
    setTraversal([])
    setCurrent(null)
    
    if (type === 'inorder') inorderTraversal(tree)
    else if (type === 'preorder') preorderTraversal(tree)
    else if (type === 'postorder') postorderTraversal(tree)
  }

  return (
    <div className="card">
      <h2 className="text-2xl font-bold mb-4">Binary Tree Traversal</h2>
      
      <div className="flex gap-2 mb-6">
        <button onClick={() => handleTraversal('inorder')} className="btn-primary">
          Inorder
        </button>
        <button onClick={() => handleTraversal('preorder')} className="btn-secondary">
          Preorder
        </button>
        <button onClick={() => handleTraversal('postorder')} className="px-4 py-2 bg-green-500 text-white rounded-lg">
          Postorder
        </button>
      </div>

      <svg width="100%" height="400" className="mb-4">
        <TreeNode node={tree} x={300} y={50} level={1} />
      </svg>

      <div className="bg-gray-100 dark:bg-dark-light p-4 rounded-lg">
        <h3 className="font-bold mb-2">Traversal Order:</h3>
        <p className="text-lg">{traversal.join(' → ') || 'Click a traversal button to start'}</p>
      </div>
    </div>
  )
}
