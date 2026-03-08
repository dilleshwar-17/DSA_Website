import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export default function ArrayVisualizer({ algorithm, data }) {
  const [array, setArray] = useState(data || [64, 34, 25, 12, 22, 11, 90])
  const [comparing, setComparing] = useState([])
  const [sorted, setSorted] = useState([])
  const [isPlaying, setIsPlaying] = useState(false)
  const [speed, setSpeed] = useState(500)

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms))

  const bubbleSort = async () => {
    const arr = [...array]
    const n = arr.length
    
    for (let i = 0; i < n - 1; i++) {
      for (let j = 0; j < n - i - 1; j++) {
        setComparing([j, j + 1])
        await sleep(speed)
        
        if (arr[j] > arr[j + 1]) {
          [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
          setArray([...arr])
        }
      }
      setSorted(prev => [...prev, n - 1 - i])
    }
    setComparing([])
    setIsPlaying(false)
  }

  const binarySearch = async (target) => {
    const arr = [...array].sort((a, b) => a - b)
    setArray(arr)
    let left = 0, right = arr.length - 1
    
    while (left <= right) {
      const mid = Math.floor((left + right) / 2)
      setComparing([mid])
      await sleep(speed)
      
      if (arr[mid] === target) {
        setSorted([mid])
        setIsPlaying(false)
        return
      } else if (arr[mid] < target) {
        left = mid + 1
      } else {
        right = mid - 1
      }
    }
    setComparing([])
    setIsPlaying(false)
  }

  const handlePlay = () => {
    setIsPlaying(true)
    setSorted([])
    setComparing([])
    
    if (algorithm === 'bubbleSort') {
      bubbleSort()
    } else if (algorithm === 'binarySearch') {
      binarySearch(array[Math.floor(Math.random() * array.length)])
    }
  }

  const handleReset = () => {
    setArray(data || [64, 34, 25, 12, 22, 11, 90])
    setSorted([])
    setComparing([])
    setIsPlaying(false)
  }

  const generateRandom = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100))
    setArray(newArray)
    setSorted([])
    setComparing([])
  }

  return (
    <div className="card">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">{algorithm === 'bubbleSort' ? 'Bubble Sort' : 'Binary Search'}</h2>
        <div className="flex gap-2">
          <button onClick={handlePlay} disabled={isPlaying} className="btn-primary disabled:opacity-50">
            ▶ Play
          </button>
          <button onClick={handleReset} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
            ↻ Reset
          </button>
          <button onClick={generateRandom} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg">
            🎲 Random
          </button>
        </div>
      </div>

      <div className="mb-4">
        <label className="block mb-2">Speed: {speed}ms</label>
        <input 
          type="range" 
          min="100" 
          max="1000" 
          value={speed} 
          onChange={(e) => setSpeed(Number(e.target.value))}
          className="w-full"
        />
      </div>

      <div className="flex items-end justify-center gap-2 h-64">
        {array.map((value, idx) => (
          <motion.div
            key={idx}
            initial={{ height: 0 }}
            animate={{ height: `${(value / Math.max(...array)) * 100}%` }}
            className={`w-12 flex items-end justify-center text-white font-bold rounded-t ${
              sorted.includes(idx) ? 'bg-green-500' :
              comparing.includes(idx) ? 'bg-yellow-500' :
              'bg-primary'
            }`}
          >
            <span className="mb-2">{value}</span>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
