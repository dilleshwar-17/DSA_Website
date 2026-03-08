import Head from 'next/head'
import Link from 'next/link'
import { motion } from 'framer-motion'
import Navbar from '../components/ui/Navbar'

export default function Home({ darkMode, toggleDarkMode }) {
  return (
    <>
      <Head>
        <title>DSA Platform - Master Data Structures & Algorithms</title>
      </Head>
      
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      
      <main className="min-h-screen">
        <section className="gradient-bg text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl font-bold mb-6"
            >
              Master DSA & Ace Interviews
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl mb-8"
            >
              500+ Problems • 200+ Visualizations • Interactive Learning
            </motion.p>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="flex gap-4 justify-center"
            >
              <Link href="/signup" className="btn-primary text-lg px-8 py-3">
                Get Started Free
              </Link>
              <Link href="/problems" className="bg-white text-primary hover:bg-gray-100 font-semibold py-3 px-8 rounded-lg transition-all">
                Explore Problems
              </Link>
            </motion.div>
          </div>
        </section>

        <section className="py-20">
          <div className="container mx-auto px-4">
            <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
            <div className="grid md:grid-cols-3 gap-8">
              {[
                { title: '500+ Problems', desc: 'Curated coding challenges from easy to hard', icon: '💻' },
                { title: '200+ Visualizations', desc: 'Interactive algorithm visualizations', icon: '🎨' },
                { title: 'Code Playground', desc: 'Write and test code in multiple languages', icon: '⚡' },
                { title: 'Learning Paths', desc: 'Structured roadmaps for all levels', icon: '🎯' },
                { title: 'Progress Tracking', desc: 'Track your learning journey', icon: '📊' },
                { title: 'Community', desc: 'Learn with thousands of developers', icon: '👥' }
              ].map((feature, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="card text-center"
                >
                  <div className="text-5xl mb-4">{feature.icon}</div>
                  <h3 className="text-2xl font-bold mb-2">{feature.title}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gray-100 dark:bg-dark-light py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Start Learning?</h2>
            <p className="text-xl mb-8">Join thousands of developers mastering DSA</p>
            <Link href="/signup" className="btn-primary text-lg px-8 py-3">
              Sign Up Now
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}
