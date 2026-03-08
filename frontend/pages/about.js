import Navbar from '../components/ui/Navbar'

export default function About({ darkMode, toggleDarkMode }) {
  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8">About DSA Platform</h1>
        <div className="card max-w-4xl mx-auto">
          <p className="text-lg mb-4">
            DSA Platform is a comprehensive learning platform designed to help developers master Data Structures and Algorithms.
          </p>
          <p className="text-lg mb-4">
            With 500+ coding problems, 200+ interactive visualizations, and structured learning paths, we provide everything you need to ace technical interviews.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Our Mission</h2>
          <p className="text-lg mb-4">
            To make DSA learning accessible, interactive, and effective for developers worldwide.
          </p>
          <h2 className="text-2xl font-bold mt-8 mb-4">Why Choose Us?</h2>
          <ul className="space-y-2 text-lg">
            <li>✓ Comprehensive problem collection</li>
            <li>✓ Interactive visualizations</li>
            <li>✓ Structured learning paths</li>
            <li>✓ Progress tracking</li>
            <li>✓ Community support</li>
          </ul>
        </div>
      </div>
    </>
  )
}
