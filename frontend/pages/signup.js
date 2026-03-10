import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Navbar from '../components/ui/Navbar'

export default function Signup({ darkMode, toggleDarkMode }) {
  const router = useRouter()
  const [formData, setFormData] = useState({ name: '', email: '', password: '' })
  const [error, setError] = useState('')
  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      const res = await fetch(`/api/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      
      const data = await res.json()
      
      if (res.ok) {
        localStorage.setItem('token', data.token)
        localStorage.setItem('user', JSON.stringify(data.user))
        router.push('/dashboard')
      } else {
        setError(data.message)
      }
    } catch (err) {
      setError('Server error. Please try again.')
    }
  }

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="card max-w-md w-full">
          <h1 className="text-3xl font-bold mb-6 text-center">Sign Up</h1>
          
          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block mb-2 font-semibold">Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-dark-light"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Email</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-dark-light"
                required
              />
            </div>

            <div>
              <label className="block mb-2 font-semibold">Password</label>
              <input
                type="password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-dark-light"
                required
              />
            </div>

            <button type="submit" className="w-full btn-primary">
              Sign Up
            </button>
          </form>

          <p className="mt-6 text-center">
            Already have an account? <Link href="/login" className="text-primary hover:underline">Login</Link>
          </p>
        </div>
      </div>
    </>
  )
}
