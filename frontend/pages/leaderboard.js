import { useState, useEffect } from 'react'
import Navbar from '../components/ui/Navbar'

export default function Leaderboard({ darkMode, toggleDarkMode }) {
  const [users, setUsers] = useState([])

  useEffect(() => {
    fetch('http://localhost:5000/api/users/leaderboard')
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err))
  }, [])

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">Leaderboard</h1>

        <div className="card">
          <table className="w-full">
            <thead>
              <tr className="border-b dark:border-gray-700">
                <th className="text-left py-4 px-4">Rank</th>
                <th className="text-left py-4 px-4">User</th>
                <th className="text-center py-4 px-4">Easy</th>
                <th className="text-center py-4 px-4">Medium</th>
                <th className="text-center py-4 px-4">Hard</th>
                <th className="text-center py-4 px-4">Total</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id} className="border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800">
                  <td className="py-4 px-4">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                      idx === 0 ? 'bg-yellow-400 text-white' :
                      idx === 1 ? 'bg-gray-400 text-white' :
                      idx === 2 ? 'bg-orange-400 text-white' :
                      'bg-gray-200 dark:bg-gray-700'
                    }`}>
                      {idx + 1}
                    </div>
                  </td>
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center text-white font-bold">
                        {user.name.charAt(0).toUpperCase()}
                      </div>
                      <span className="font-semibold">{user.name}</span>
                    </div>
                  </td>
                  <td className="text-center py-4 px-4 text-green-600 font-semibold">
                    {user.progress.easy}
                  </td>
                  <td className="text-center py-4 px-4 text-yellow-600 font-semibold">
                    {user.progress.medium}
                  </td>
                  <td className="text-center py-4 px-4 text-red-600 font-semibold">
                    {user.progress.hard}
                  </td>
                  <td className="text-center py-4 px-4 font-bold text-primary">
                    {user.progress.easy + user.progress.medium + user.progress.hard}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}
