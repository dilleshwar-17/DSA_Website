import Navbar from '../components/ui/Navbar'
import { motion } from 'framer-motion'

export default function Features({ darkMode, toggleDarkMode }) {
  const features = [
    {
      title: '500+ Coding Problems',
      description: 'Comprehensive collection of interview problems from top tech companies',
      icon: '💻',
      details: ['Easy to Hard difficulty', 'Real interview questions', 'Detailed solutions', 'Multiple languages']
    },
    {
      title: '200+ Visualizations',
      description: 'Interactive algorithm visualizations to understand concepts deeply',
      icon: '🎨',
      details: ['Step-by-step execution', 'Speed control', 'Custom inputs', 'Visual explanations']
    },
    {
      title: 'Code Playground',
      description: 'Write, test, and submit code in multiple programming languages',
      icon: '⚡',
      details: ['Python, Java, C++, JavaScript', 'Real-time execution', 'Test cases', 'Performance metrics']
    },
    {
      title: 'Learning Roadmap',
      description: 'Structured learning paths from beginner to advanced',
      icon: '🎯',
      details: ['Beginner track', 'Intermediate track', 'Advanced track', 'Topic-wise organization']
    },
    {
      title: 'Progress Tracking',
      description: 'Track your learning journey with detailed analytics',
      icon: '📊',
      details: ['Solved problems', 'Daily streaks', 'Difficulty distribution', 'Weekly activity']
    },
    {
      title: 'Community Features',
      description: 'Learn and compete with thousands of developers',
      icon: '👥',
      details: ['Discussion forums', 'Leaderboards', 'Coding contests', 'Interview experiences']
    }
  ]

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold mb-4">Platform Features</h1>
          <p className="text-xl text-gray-600 dark:text-gray-400">
            Everything you need to master Data Structures & Algorithms
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="card"
            >
              <div className="text-6xl mb-4">{feature.icon}</div>
              <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-4">{feature.description}</p>
              <ul className="space-y-2">
                {feature.details.map((detail, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="text-primary">✓</span>
                    <span>{detail}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </>
  )
}
