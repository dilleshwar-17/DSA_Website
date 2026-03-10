import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Navbar from '../components/ui/Navbar'
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function Dashboard({ darkMode, toggleDarkMode }) {
  const router = useRouter()
  const [user, setUser] = useState(null)
  const [stats, setStats] = useState({
    easy: 0,
    medium: 0,
    hard: 0,
    streak: 0,
    totalSolved: 0
  })

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (!token) {
      router.push('/login')
      return
    }

    fetch(`/api/users/profile`, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        setUser(data)
        setStats({
          easy: data.progress.easy,
          medium: data.progress.medium,
          hard: data.progress.hard,
          streak: data.streak,
          totalSolved: data.solvedProblems.length
        })
      })
      .catch(err => console.error(err))
  }, [])

  const difficultyData = [
    { name: 'Easy', value: stats.easy, color: '#10b981' },
    { name: 'Medium', value: stats.medium, color: '#f59e0b' },
    { name: 'Hard', value: stats.hard, color: '#ef4444' }
  ]

  const weeklyData = [
    { day: 'Mon', solved: 3 },
    { day: 'Tue', solved: 5 },
    { day: 'Wed', solved: 2 },
    { day: 'Thu', solved: 7 },
    { day: 'Fri', solved: 4 },
    { day: 'Sat', solved: 6 },
    { day: 'Sun', solved: 3 }
  ]

  if (!user) return <div>Loading...</div>

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="card text-center">
            <div className="text-4xl font-bold text-primary">{stats.totalSolved}</div>
            <div className="text-gray-600 dark:text-gray-400">Problems Solved</div>
          </div>
          
          <div className="card text-center">
            <div className="text-4xl font-bold text-green-500">{stats.easy}</div>
            <div className="text-gray-600 dark:text-gray-400">Easy</div>
          </div>
          
          <div className="card text-center">
            <div className="text-4xl font-bold text-yellow-500">{stats.medium}</div>
            <div className="text-gray-600 dark:text-gray-400">Medium</div>
          </div>
          
          <div className="card text-center">
            <div className="text-4xl font-bold text-red-500">{stats.hard}</div>
            <div className="text-gray-600 dark:text-gray-400">Hard</div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Difficulty Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={difficultyData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {difficultyData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="card">
            <h2 className="text-2xl font-bold mb-4">Weekly Activity</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={weeklyData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="solved" fill="#3b82f6" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card">
          <h2 className="text-2xl font-bold mb-4">Learning Progress</h2>
          
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Beginner Track</span>
                <span>{user.learningPath.beginner.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div 
                  className="bg-primary h-4 rounded-full transition-all"
                  style={{ width: `${user.learningPath.beginner.progress}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Intermediate Track</span>
                <span>{user.learningPath.intermediate.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div 
                  className="bg-secondary h-4 rounded-full transition-all"
                  style={{ width: `${user.learningPath.intermediate.progress}%` }}
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-2">
                <span className="font-semibold">Advanced Track</span>
                <span>{user.learningPath.advanced.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-4">
                <div 
                  className="bg-green-500 h-4 rounded-full transition-all"
                  style={{ width: `${user.learningPath.advanced.progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
