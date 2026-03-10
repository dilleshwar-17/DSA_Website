import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { FaPlay, FaPause, FaStepBackward, FaStepForward, FaUndo, FaRandom } from 'react-icons/fa'

export default function ArrayVisualizer({ algorithm, data }) {
  // State for the array and UI
  const [array, setArray] = useState(data || [64, 34, 25, 12, 22, 11, 90])
  const [customInput, setCustomInput] = useState(array.join(', '))
  const [speed, setSpeed] = useState(500)
  
  // State for frame-based animation
  const [frames, setFrames] = useState([])
  const [currentFrameIndex, setCurrentFrameIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  // Generate frames based on the algorithm
  useEffect(() => {
    generateFrames(array)
  }, [array, algorithm])

  // Playback effect
  useEffect(() => {
    let interval;
    if (isPlaying && currentFrameIndex < frames.length - 1) {
      interval = setInterval(() => {
        setCurrentFrameIndex(prev => prev + 1)
      }, speed)
    } else if (currentFrameIndex >= frames.length - 1) {
      setIsPlaying(false)
    }
    return () => clearInterval(interval)
  }, [isPlaying, currentFrameIndex, frames, speed])

  const generateFrames = (initialArray) => {
    let newFrames = []
    
    // Always start with the initial state
    newFrames.push({
      array: [...initialArray],
      comparing: [],
      sorted: []
    })

    if (algorithm === 'bubbleSort') {
      const arr = [...initialArray]
      const n = arr.length
      let sortedIndices = []
      
      for (let i = 0; i < n - 1; i++) {
        for (let j = 0; j < n - i - 1; j++) {
          newFrames.push({
            array: [...arr],
            comparing: [j, j + 1],
            sorted: [...sortedIndices]
          })
          
          if (arr[j] > arr[j + 1]) {
            [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]
            newFrames.push({
              array: [...arr],
              comparing: [j, j + 1],
              sorted: [...sortedIndices]
            })
          }
        }
        sortedIndices.push(n - 1 - i)
        newFrames.push({
          array: [...arr],
          comparing: [],
          sorted: [...sortedIndices]
        })
      }
      sortedIndices.push(0)
      newFrames.push({
        array: [...arr],
        comparing: [],
        sorted: [...sortedIndices]
      })
    } else if (algorithm === 'binarySearch') {
      const arr = [...initialArray].sort((a, b) => a - b)
      const target = arr[Math.floor(Math.random() * arr.length)]
      
      // Update the base array to be sorted for binary search
      if (initialArray.join(',') !== arr.join(',')) {
          setArray(arr)
          return // This will trigger a re-render and call generateFrames again with the sorted array
      }

      let left = 0, right = arr.length - 1
      
      while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        newFrames.push({
          array: [...arr],
          comparing: [mid],
          sorted: []
        })
        
        if (arr[mid] === target) {
          newFrames.push({
            array: [...arr],
            comparing: [],
            sorted: [mid]
          })
          break
        } else if (arr[mid] < target) {
          left = mid + 1
        } else {
          right = mid - 1
        }
      }
    }
    
    setFrames(newFrames)
    setCurrentFrameIndex(0)
    setIsPlaying(false)
  }

  const handlePlayPause = () => {
    if (currentFrameIndex >= frames.length - 1 && !isPlaying) {
      setCurrentFrameIndex(0) // Restart if at the end
    }
    setIsPlaying(!isPlaying)
  }

  const handleNext = () => {
    setIsPlaying(false)
    if (currentFrameIndex < frames.length - 1) {
      setCurrentFrameIndex(prev => prev + 1)
    }
  }

  const handlePrev = () => {
    setIsPlaying(false)
    if (currentFrameIndex > 0) {
      setCurrentFrameIndex(prev => prev - 1)
    }
  }

  const handleReset = () => {
    setArray(data || [64, 34, 25, 12, 22, 11, 90])
    setCustomInput((data || [64, 34, 25, 12, 22, 11, 90]).join(', '))
    setCurrentFrameIndex(0)
    setIsPlaying(false)
  }

  const generateRandom = () => {
    const newArray = Array.from({ length: 10 }, () => Math.floor(Math.random() * 100))
    setArray(newArray)
    setCustomInput(newArray.join(', '))
  }

  const handleCustomInputChange = (e) => {
    setCustomInput(e.target.value)
  }

  const handleApplyCustomInput = () => {
    try {
        const newArray = customInput.split(',').map(item => parseInt(item.trim(), 10)).filter(num => !isNaN(num))
        if(newArray.length > 0) {
            setArray(newArray)
        }
    } catch(err) {
        console.error("Invalid input")
    }
  }

  // Get current state from frames
  const currentFrame = frames[currentFrameIndex] || { array: array, comparing: [], sorted: [] }
  const renderArray = currentFrame.array
  const comparing = currentFrame.comparing
  const sorted = currentFrame.sorted

  return (
    <div className="card">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
        <h2 className="text-2xl font-bold">{algorithm === 'bubbleSort' ? 'Bubble Sort' : 'Binary Search'}</h2>
        
        {/* User Input Section */}
        <div className="flex gap-2 w-full md:w-auto">
            <input 
                type="text" 
                value={customInput} 
                onChange={handleCustomInputChange}
                placeholder="e.g. 10, 2, 53, 1"
                className="px-3 py-2 border rounded-lg dark:bg-dark-light w-full md:w-48 text-sm"
            />
            <button onClick={handleApplyCustomInput} className="px-3 py-2 bg-primary text-white rounded-lg text-sm hover:bg-primary-dark">
                Apply
            </button>
        </div>
      </div>

      {/* Controls Section */}
      <div className="flex justify-between items-center mb-6 bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
          <div className="flex gap-3">
              <button onClick={handlePrev} disabled={currentFrameIndex === 0} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50" title="Previous Step">
                  <FaStepBackward />
              </button>
              <button onClick={handlePlayPause} className="p-2 bg-primary text-white rounded-full hover:bg-primary-dark w-10 h-10 flex items-center justify-center" title={isPlaying ? "Pause" : "Play"}>
                  {isPlaying ? <FaPause /> : <FaPlay />}
              </button>
              <button onClick={handleNext} disabled={currentFrameIndex >= frames.length - 1} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 disabled:opacity-50" title="Next Step">
                  <FaStepForward />
              </button>
          </div>
          
          <div className="flex gap-2 items-center">
            <span className="text-xs text-gray-500">Speed:</span>
            <input 
              type="range" 
              min="100" 
              max="1000" 
              step="100"
              value={1100 - speed} // Invert so right is faster
              onChange={(e) => setSpeed(1100 - Number(e.target.value))}
              className="w-24"
            />
          </div>

          <div className="flex gap-2">
              <button onClick={handleReset} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center gap-1" title="Reset">
                  <FaUndo /> <span className="hidden sm:inline text-sm">Reset</span>
              </button>
              <button onClick={generateRandom} className="p-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600 flex items-center gap-1" title="Randomize">
                  <FaRandom /> <span className="hidden sm:inline text-sm">Random</span>
              </button>
          </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-gray-200 rounded-full h-1.5 mb-6 dark:bg-gray-700">
        <div className="bg-primary h-1.5 rounded-full" style={{ width: `${(currentFrameIndex / Math.max(1, frames.length - 1)) * 100}%` }}></div>
      </div>

      {/* Visualization Canvas */}
      <div className="flex items-end justify-center gap-2 h-64 border-b dark:border-gray-700 pb-4">
        {renderArray.map((value, idx) => (
          <motion.div
            key={idx}
            initial={false}
            animate={{ height: `${(value / Math.max(...renderArray, 1)) * 100}%` }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className={`w-12 flex flex-col items-center justify-end text-white font-bold rounded-t ${
              sorted.includes(idx) ? 'bg-green-500' :
              comparing.includes(idx) ? 'bg-yellow-500' :
              'bg-primary'
            }`}
          >
            <span className="mb-2 text-xs">{value}</span>
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-4 text-sm text-gray-500">
          Step {currentFrameIndex + 1} of {frames.length || 1}
      </div>
    </div>
  )
}
