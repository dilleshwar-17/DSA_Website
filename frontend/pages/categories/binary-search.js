import Navbar from '../../components/ui/Navbar'
import Link from 'next/link'

export default function BinarySearch({ darkMode, toggleDarkMode }) {
  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Binary Search</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-8">Master binary search techniques and patterns</p>
        <Link href="/problems?category=Binary Search" className="btn-primary">View All Problems</Link>
      </div>
    </>
  )
}
