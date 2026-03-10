import { useState, useEffect } from 'react'

export default function DPVisualizer({ algorithm = 'knapsack' }) {
  const [grid, setGrid] = useState([])
  const [activeCell, setActiveCell] = useState(null)
  
  // Example dummy data for a simple 0/1 knapsack tabulature
  const rows = 5;
  const cols = 6;

  useEffect(() => {
    // Generate a basic empty grid
    let newGrid = Array(rows).fill().map(() => Array(cols).fill(0));
    setGrid(newGrid);
  }, [algorithm])

  const simulateCalculation = () => {
    let currentGrid = JSON.parse(JSON.stringify(grid));
    
    // Simulate filling the DP table step by step
    let i = 1;
    let j = 1;
    
    const interval = setInterval(() => {
      if (i >= rows) {
        clearInterval(interval);
        setActiveCell(null);
        return;
      }
      
      // Dummy calculation (just for visual representation)
      currentGrid[i][j] = Math.floor(Math.random() * 50) + currentGrid[i-1][j];
      setGrid([...currentGrid]);
      setActiveCell({ r: i, c: j });
      
      j++;
      if (j >= cols) {
        j = 1;
        i++;
      }
    }, 500);
  }

  return (
    <div className="card w-full max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">Dynamic Programming Table</h2>
          <p className="text-gray-500 text-sm">Visualizing the 2D array tabulation approach</p>
        </div>
        
        <button onClick={simulateCalculation} className="btn-primary">
          Start Computation
        </button>
      </div>

      <div className="overflow-x-auto p-4 bg-slate-50 dark:bg-dark-light rounded-xl">
        <table className="w-full border-collapse">
          <tbody>
            {grid.map((row, rIndex) => (
              <tr key={rIndex}>
                {row.map((val, cIndex) => (
                  <td 
                    key={cIndex}
                    className={`
                      w-16 h-16 border-2 text-center font-bold transition-all duration-300
                      ${rIndex === 0 || cIndex === 0 ? 'bg-slate-200 dark:bg-slate-800 text-slate-500' : 'bg-white dark:bg-dark border-slate-300 dark:border-slate-600'}
                      ${activeCell?.r === rIndex && activeCell?.c === cIndex ? 'bg-green-100 dark:bg-green-900 border-green-500 shadow-lg scale-110 z-10 relative' : ''}
                    `}
                  >
                    {val}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-6 flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
        <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-slate-200 dark:bg-slate-800 border"></div> Base Cases (Init)
        </div>
        <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-green-100 dark:bg-green-900 border border-green-500"></div> Active Computation Cell
        </div>
      </div>
    </div>
  )
}
