import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function StackQueueVisualizer({ type = 'stack' }) {
  const [items, setItems] = useState([10, 20, 30])
  const [inputValue, setInputValue] = useState('')

  const handlePush = () => {
    if (!inputValue || isNaN(inputValue)) return
    
    const newVal = parseInt(inputValue)
    if (type === 'stack') {
      setItems([newVal, ...items]) // Push to top for LIFO visual
    } else {
      setItems([...items, newVal]) // Enqueue to back for FIFO visual
    }
    setInputValue('')
  }

  const handlePop = () => {
    if (items.length === 0) return
    const newItems = [...items]
    newItems.shift() // Pop/Dequeue from front visually
    setItems(newItems)
  }

  return (
    <div className="card w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">
          {type === 'stack' ? 'Stack Visualizer (LIFO)' : 'Queue Visualizer (FIFO)'}
        </h2>
        
        <div className="flex gap-2">
           <input 
            type="text" 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Value..."
            className="w-24 px-3 py-1 border rounded dark:bg-dark-light"
          />
          <button onClick={handlePush} className="btn-primary">
            {type === 'stack' ? 'Push' : 'Enqueue'}
          </button>
          <button onClick={handlePop} className="px-4 py-2 border rounded hover:bg-gray-100 dark:hover:bg-gray-700">
             {type === 'stack' ? 'Pop' : 'Dequeue'}
          </button>
          <button onClick={() => setItems([])} className="px-4 py-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded">
            Clear
          </button>
        </div>
      </div>

      {/* Visualizer Area */}
      <div className={`h-[400px] bg-slate-50 dark:bg-dark-light rounded-xl border-t-8 flex 
          ${type === 'stack' ? 'flex-col justify-end items-center pb-8 border-b-8 border-x-8 border-slate-300 dark:border-slate-700 w-64 mx-auto' : 'flex-row items-center justify-start pl-8 border-y-8 border-slate-300 dark:border-slate-700'}`}>
        
        <AnimatePresence>
          {items.map((item, i) => (
            <motion.div
              key={`${item}-${i}`}
              initial={type === 'stack' ? { y: -50, opacity: 0 } : { x: 50, opacity: 0 }}
              animate={type === 'stack' ? { y: 0, opacity: 1 } : { x: 0, opacity: 1 }}
              exit={type === 'stack' ? { y: -50, opacity: 0 } : { x: -50, opacity: 0 }}
              className={`flex items-center justify-center font-bold text-lg 
                ${type === 'stack' ? 'w-48 h-12 mb-2 bg-blue-500 text-white rounded shadow' : 'w-16 h-24 mr-4 bg-green-500 text-white rounded shadow'}
              `}
            >
              {item}
            </motion.div>
          ))}
        </AnimatePresence>

        {items.length === 0 && (
          <p className="text-gray-400 italic">Empty {type}</p>
        )}
      </div>
    </div>
  )
}
