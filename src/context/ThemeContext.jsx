// src/context/ThemeContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'

const ThemeContext = createContext(null)

const applyColorVars = (colors, isDark) => {
  const root = document.documentElement
  const palette = isDark ? colors?.dark : colors?.light
  if (!palette) {
    // Remove variáveis forçadas – volta ao CSS padrão
    root.style.removeProperty('--primary')
    root.style.removeProperty('--primary-hover')
    root.style.removeProperty('--secondary')
    root.style.removeProperty('--bg-card')
    return
  }

  root.style.setProperty('--primary',       palette.primary       || (isDark ? '#00eeff' : '#0284c7'))
  root.style.setProperty('--primary-hover', palette.primaryHover  || (isDark ? '#22e3ff' : '#0369a1'))
  root.style.setProperty('--secondary',     palette.secondary     || (isDark ? '#a855f7' : '#7c3aed'))
  root.style.setProperty('--bg-card',       palette.cardBg        || (isDark ? '#0d0d1a' : '#ffffff'))
}

export const ThemeProvider = ({ children }) => {
  const [isDark, setIsDark] = useState(() => {
    const saved = localStorage.getItem('portfolio_theme')
    return saved ? saved === 'dark' : true
  })
  const [colors, setColors] = useState({ dark: {}, light: {} })

  useEffect(() => {
    const html = document.documentElement
    if (isDark) {
      html.classList.remove('light')
      html.classList.add('dark')
    } else {
      html.classList.add('light')
      html.classList.remove('dark')
    }
    localStorage.setItem('portfolio_theme', isDark ? 'dark' : 'light')
    applyColorVars(colors, isDark)
  }, [isDark, colors])

  const toggleTheme = () => setIsDark(p => !p)

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme, colors, setColors }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be within ThemeProvider')
  return ctx
}