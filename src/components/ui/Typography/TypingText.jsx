// src/components/ui/Typography/TypingText.jsx
import { useState, useEffect } from 'react'
import { useData } from '../../../context/DataContext'
import { useTranslation } from 'react-i18next'

const TypingText = () => {
  const { data } = useData()
  const { i18n } = useTranslation()
  const lang = i18n.language
  const roles = data.typingRoles?.[lang] || data.typingRoles?.pt || ['Product Owner', 'QA Tester', 'Engenheiro de Software']
  const [index, setIndex] = useState(0)
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      setTimeout(() => {
        setIndex(prev => (prev + 1) % roles.length)
        setTimeout(() => setVisible(true), 250)
      }, 250)
    }, 2800)
    return () => clearTimeout(timer)
  }, [index, roles.length])

  return (
    <span
      className="font-semibold transition-all duration-300"
      style={{
        color: 'var(--primary)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(4px)',
        display: 'inline-block',
      }}
    >
      {roles[index]}
    </span>
  )
}

export default TypingText
