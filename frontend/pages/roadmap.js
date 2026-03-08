import Link from 'next/link'
import Navbar from '../components/ui/Navbar'
import { motion } from 'framer-motion'

export default function Roadmap({ darkMode, toggleDarkMode }) {
  const tracks = {
    beginner: {
      title: 'Beginner Track',
      description: 'Start your DSA journey with fundamental concepts',
      color: 'bg-green-500',
      topics: [
        { name: 'Arrays', problems: 25, completed: false },
        { name: 'Two Pointers', problems: 15, completed: false },
        { name: 'Sliding Window', problems: 12, completed: false },
        { name: 'Binary Search', problems: 18, completed: false }
      ]
    },
    intermediate: {
      title: 'Intermediate Track',
      description: 'Level up with advanced data structures',
      color: 'bg-yellow-500',
      topics: [
        { name: 'Stacks & Queues', problems: 20, completed: false },
        { name: 'Heaps', problems: 15, completed: false },
        { name: 'Greedy Algorithms', problems: 18, completed: false },
        { name: 'Trees', problems: 30, completed: false },
        { name: 'Graphs', problems: 25, completed: false }
      ]
    },
    advanced: {
      title: 'Advanced Track',
      description: 'Master complex algorithms and problem-solving',
      color: 'bg-red-500',
      topics: [
        { name: 'Backtracking', problems: 20, completed: false },
        { name: 'Dynamic Programming', problems: 40, completed: false },
        { name: 'Advanced DP', problems: 25, completed: false },
        { name: 'Hard Problems', problems: 30, completed: false }
      ]
    }
  }

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-4">Learning Roadmap</h1>
        <p className="text-xl text-gray-600 dark:text-gray-400 mb-12">
          Follow our structured learning paths to master DSA
        </p>

        <div className="space-y-8">
          {Object.entries(tracks).map(([key, track], idx) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.2 }}
              className="card"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 ${track.color} rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                  {idx + 1}
                </div>
                <div>
                  <h2 className="text-2xl font-bold">{track.title}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{track.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {track.topics.map((topic, i) => (
                  <Link
                    key={i}
                    href={`/problems?category=${topic.name}`}
                    className="p-4 border dark:border-gray-700 rounded-lg hover:border-primary hover:shadow-lg transition-all"
                  >
                    <h3 className="font-bold mb-2">{topic.name}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {topic.problems} problems
                    </p>
                    <div className="mt-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                      <div className={`${track.color} h-2 rounded-full`} style={{ width: '0%' }} />
                    </div>
                  </Link>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-12 card bg-gradient-to-r from-primary to-secondary text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start?</h2>
          <p className="text-xl mb-6">
            Begin with the Beginner Track and work your way up to become a DSA expert!
          </p>
          <Link href="/problems" className="inline-block bg-white text-primary font-semibold px-8 py-3 rounded-lg hover:bg-gray-100 transition-all">
            Start Learning
          </Link>
        </div>
      </div>
    </>
  )
}
