import { useState } from 'react'
import Navbar from '../components/ui/Navbar'

export default function Contact({ darkMode, toggleDarkMode }) {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })

  const handleSubmit = (e) => {
    e.preventDefault()
    alert('Message sent! We will get back to you soon.')
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">Contact Us</h1>
        <div className="card max-w-2xl mx-auto">
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
              <label className="block mb-2 font-semibold">Message</label>
              <textarea
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
                className="w-full px-4 py-2 rounded-lg border dark:bg-dark-light h-32"
                required
              />
            </div>
            <button type="submit" className="w-full btn-primary">Send Message</button>
          </form>
        </div>
      </div>
    </>
  )
}
