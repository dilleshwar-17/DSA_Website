import '../styles/globals.css'
import { useState, useEffect } from 'react'

export default function App({ Component, pageProps }) {
  const [darkMode, setDarkMode] = useState(false)

  useEffect(() => {
    const isDark = localStorage.getItem('darkMode') === 'true'
    setDarkMode(isDark)
    if (isDark) {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleDarkMode = () => {
    setDarkMode(!darkMode)
    document.documentElement.classList.toggle('dark')
    localStorage.setItem('darkMode', !darkMode)
  }

  useEffect(() => {
    const handleCopy = (e) => {
      e.preventDefault()
      alert("Copying is disabled on this platform.")
    }

    const handlePaste = (e) => {
      e.preventDefault()
      alert("Pasting is disabled. Please type your code.")
    }

    const handleContextMenu = (e) => {
      e.preventDefault()
    }

    document.addEventListener('copy', handleCopy, { capture: true })
    document.addEventListener('paste', handlePaste, { capture: true })
    document.addEventListener('contextmenu', handleContextMenu, { capture: true })

    return () => {
      document.removeEventListener('copy', handleCopy, { capture: true })
      document.removeEventListener('paste', handlePaste, { capture: true })
      document.removeEventListener('contextmenu', handleContextMenu, { capture: true })
    }
  }, [])

  return (
    <div onCopyCapture={(e) => e.preventDefault()} onPasteCapture={(e) => e.preventDefault()} onContextMenuCapture={(e) => e.preventDefault()}>
        <Component {...pageProps} darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  )
}
