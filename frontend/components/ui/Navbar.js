import Link from 'next/link'
import { useState } from 'react'

export default function Navbar({ darkMode, toggleDarkMode }) {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <nav className="bg-white dark:bg-dark-light shadow-lg sticky top-0 z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="text-2xl font-bold text-primary">
            DSA Platform
          </Link>

          <div className="hidden md:flex items-center gap-6">
            <Link href="/problems" className="hover:text-primary transition">Problems</Link>
            <Link href="/visualizations" className="hover:text-primary transition">Visualizations</Link>
            <Link href="/forum" className="hover:text-primary transition">Forum</Link>
            <Link href="/roadmap" className="hover:text-primary transition">Roadmap</Link>
            <Link href="/leaderboard" className="hover:text-primary transition">Leaderboard</Link>
            <button onClick={toggleDarkMode} className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800">
              {darkMode ? '☀️' : '🌙'}
            </button>
            <Link href="/login" className="hover:text-primary transition">Login</Link>
            <Link href="/signup" className="btn-primary">Sign Up</Link>
          </div>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4">
            <Link href="/problems" className="block py-2 hover:text-primary">Problems</Link>
            <Link href="/visualizations" className="block py-2 hover:text-primary">Visualizations</Link>
            <Link href="/forum" className="block py-2 hover:text-primary">Forum</Link>
            <Link href="/roadmap" className="block py-2 hover:text-primary">Roadmap</Link>
            <Link href="/login" className="block py-2 hover:text-primary">Login</Link>
          </div>
        )}
      </div>
    </nav>
  )
}
