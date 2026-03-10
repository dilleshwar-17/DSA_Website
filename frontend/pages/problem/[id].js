import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'
import Navbar from '../../components/ui/Navbar'
import ArrayVisualizer from '../../components/visualizations/ArrayVisualizer'

const MonacoEditor = dynamic(() => import('@monaco-editor/react'), { ssr: false })

export default function ProblemDetail({ darkMode, toggleDarkMode }) {
  const router = useRouter()
  const { id } = router.query
  const [problem, setProblem] = useState(null)
  const [code, setCode] = useState('')
  const [language, setLanguage] = useState('python')
  const [output, setOutput] = useState('')
  const [activeTab, setActiveTab] = useState('description')

  useEffect(() => {
    if (id) {
      fetch(`/api/problems/${id}`)
        .then(res => res.json())
        .then(data => {
          setProblem(data)
          setCode(data.starterCode[language] || '')
        })
        .catch(err => console.error(err))
    }
  }, [id])

  const handleLanguageChange = (lang) => {
    setLanguage(lang)
    if (problem) {
      const defaultTemplates = {
          python: "def solution():\n    pass",
          java: "class Solution {\n    public static void main(String[] args) {\n        // Test your code here\n        System.out.println(\"Hello Java!\");\n    }\n    \n    public void solve() {\n        \n    }\n}",
          cpp: "#include <iostream>\nusing namespace std;\n\nclass Solution {\npublic:\n    void solve() {\n        \n    }\n};\n\nint main() {\n    Solution sol;\n    // Test your code here\n    cout << \"Hello C++!\" << endl;\n    return 0;\n}",
          c: "#include <stdio.h>\n#include <stdlib.h>\n\nvoid solve() {\n    \n}\n\nint main() {\n    // Test your code here\n    printf(\"Hello C!\\n\");\n    return 0;\n}",
          javascript: "function solve() {\n    \n}\n\n// Test your code here\nconsole.log(\"Hello JavaScript!\");"
      }
      setCode(problem.starterCode[lang] || defaultTemplates[lang])
    }
  }

  const runCode = async () => {
    setOutput('Running code...');
    try {
      const res = await fetch(`/api/execute`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ code, language })
      });
      const result = await res.json();
      
      if (res.ok && !result.error) {
          setOutput(result.output);
      } else {
          setOutput(`Error: ${result.error || result.message || 'Unknown execution error'}`);
      }
    } catch (err) {
      setOutput(`Execution failed: ${err.message}`);
    }
  }

  const submitCode = async () => {
    try {
      const token = localStorage.getItem('token')
      const res = await fetch(`/api/submissions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ problemId: id, code, language })
      })
      const result = await res.json()
      setOutput(`Submission ${result.status}\n\nTest Cases Passed: ${result.testCasesPassed}/${result.totalTestCases}\nRuntime: ${result.runtime}ms\nMemory: ${result.memory}MB`)
    } catch (err) {
      setOutput('Error submitting code. Please login first.')
    }
  }

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
      
      <div 
        className="flex h-screen"
        onCopy={(e) => { e.preventDefault(); alert("Copying is disabled on this platform."); }}
        onPaste={(e) => { e.preventDefault(); alert("Pasting is disabled. Please type your code."); }}
      >
        <div 
          className="w-1/2 overflow-y-auto p-6 border-r dark:border-gray-700 select-none"
          onContextMenu={(e) => e.preventDefault()}
        >
          <h1 className="text-3xl font-bold mb-4">{problem.title}</h1>
          
          <div className="flex gap-2 mb-4">
            <span className={`px-3 py-1 rounded-full text-sm ${
              problem.difficulty === 'Easy' ? 'bg-green-100 text-green-800' :
              problem.difficulty === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {problem.difficulty}
            </span>
            <span className="px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800">
              {problem.category}
            </span>
          </div>

          <div className="flex gap-4 mb-4 border-b dark:border-gray-700">
            <button 
              onClick={() => setActiveTab('description')}
              className={`pb-2 ${activeTab === 'description' ? 'border-b-2 border-primary text-primary' : ''}`}
            >
              Description
            </button>
            <button 
              onClick={() => setActiveTab('hints')}
              className={`pb-2 ${activeTab === 'hints' ? 'border-b-2 border-primary text-primary' : ''}`}
            >
              Hints
            </button>
            {showVisualization && (
              <button 
                onClick={() => setActiveTab('visualization')}
                className={`pb-2 flex items-center gap-1 ${activeTab === 'visualization' ? 'border-b-2 border-primary text-primary' : ''}`}
              >
                <span className="text-xl">✨</span> Visualization
              </button>
            )}
          </div>

          {activeTab === 'description' && (
            <div>
              <h2 className="text-xl font-bold mb-2">Problem Description</h2>
              <p className="mb-4">{problem.description}</p>

              <h3 className="font-bold mb-2">Examples:</h3>
              {problem.examples?.map((ex, i) => (
                <div key={i} className="bg-gray-100 dark:bg-dark-light p-4 rounded-lg mb-4">
                  <p><strong>Input:</strong> {ex.input}</p>
                  <p><strong>Output:</strong> {ex.output}</p>
                  <p><strong>Explanation:</strong> {ex.explanation}</p>
                </div>
              ))}

              <h3 className="font-bold mb-2">Constraints:</h3>
              <p className="mb-4">{problem.constraints}</p>

              <h3 className="font-bold mb-2">Complexity:</h3>
              <p>Time: {problem.timeComplexity}</p>
              <p>Space: {problem.spaceComplexity}</p>
            </div>
          )}

          {activeTab === 'hints' && (
            <div>
              <h2 className="text-xl font-bold mb-4">Hints</h2>
              {problem.hints?.map((hint, i) => (
                <div key={i} className="bg-gray-100 dark:bg-dark-light p-4 rounded-lg mb-2">
                  <p><strong>Hint {i + 1}:</strong> {hint}</p>
                </div>
              ))}
            </div>
          )}

          {activeTab === 'visualization' && showVisualization && (
            <div className="mt-4">
              <p className="text-sm text-gray-500 mb-4">
                Use this interactive visualization to understand the underlying mechanics before writing your solution.
              </p>
              <ArrayVisualizer 
                algorithm={problem.title.toLowerCase().includes('search') ? 'binarySearch' : 'bubbleSort'} 
                data={defaultVisArray} 
              />
            </div>
          )}
        </div>

        <div className="w-1/2 flex flex-col">
          <div className="p-4 border-b dark:border-gray-700 flex justify-between items-center">
            <select 
              value={language}
              onChange={(e) => handleLanguageChange(e.target.value)}
              className="px-4 py-2 rounded-lg border dark:bg-dark-light"
            >
              <option value="python">Python</option>
              <option value="java">Java</option>
              <option value="cpp">C++</option>
              <option value="c">C</option>
              <option value="javascript">JavaScript</option>
            </select>

            <div className="flex gap-2">
              <button onClick={runCode} className="px-4 py-2 bg-gray-200 dark:bg-gray-700 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-600">
                Run Code
              </button>
              <button onClick={submitCode} className="btn-primary">
                Submit
              </button>
            </div>
          </div>

          <div className="flex-1">
            <MonacoEditor
              height="60%"
              language={language === 'cpp' ? 'cpp' : language}
              theme={darkMode ? 'vs-dark' : 'light'}
              value={code}
              onChange={(value) => setCode(value)}
              options={{
                minimap: { enabled: false },
                fontSize: 14,
                contextmenu: false,
                copyWithSyntaxHighlighting: false
              }}
            />
          </div>

          <div className="h-40 border-t dark:border-gray-700 p-4 overflow-y-auto bg-gray-50 dark:bg-gray-900">
            <h3 className="font-bold mb-2">Output:</h3>
            <pre className="text-sm">{output || 'Run your code to see output...'}</pre>
          </div>
        </div>
      </div>
    </>
  )
}
