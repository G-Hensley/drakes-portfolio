'use client'

import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('dark')

  useEffect(() => {
    // Check for saved theme preference or default to dark
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null
    if (savedTheme) {
      setTheme(savedTheme)
      document.documentElement.classList.toggle('dark', savedTheme === 'dark')
    } else {
      document.documentElement.classList.add('dark')
    }
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark'
    setTheme(newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
    localStorage.setItem('theme', newTheme)
  }

  return (
    <button
      onClick={toggleTheme}
      className="w-12 h-12 group rounded-xl bg-card border border-border cursor-pointer flex items-center justify-center hover:bg-accent hover:text-accent-foreground transition-colors shadow-lg"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-5 h-5 text-accent transition-colors duration-300 ease-in-out group-hover:text-accent-foreground" />
      ) : (
        <Moon className="w-5 h-5 text-accent transition-colors duration-300 ease-in-out group-hover:text-accent-foreground" />
      )}
    </button>
  )
}
