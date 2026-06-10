// src/context/DataContext.jsx
import { createContext, useContext, useEffect, useState } from 'react'
import { loadData, saveData, resetData } from '../utils/dataManager'

const DataContext = createContext(null)

export const DataProvider = ({ children }) => {
  const [data, setData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  const refreshData = async () => {
    const loaded = await loadData()
    setData(loaded)
    setIsLoading(false)
  }

  useEffect(() => {
    refreshData()
    const handleStorage = () => refreshData()
    window.addEventListener('storage', handleStorage)
    return () => window.removeEventListener('storage', handleStorage)
  }, [])

  const handleSave = (newData) => {
    saveData(newData)
    setData(newData)
  }

  const handleReset = async () => {
    const defaultData = await resetData()
    setData(defaultData)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center" style={{ background: 'var(--bg)' }}>
        <div className="relative">
          <div className="w-16 h-16 rounded-full border-2 border-transparent border-t-[var(--primary)] animate-spin" />
          <div className="absolute inset-0 w-16 h-16 rounded-full border-2 border-[var(--primary)] opacity-10" />
        </div>
        <p className="mt-4 text-sm font-display tracking-widest uppercase opacity-50" style={{ color: 'var(--primary)' }}>Loading</p>
      </div>
    )
  }

  return (
    <DataContext.Provider value={{ data, setData: handleSave, resetData: handleReset, refreshData }}>
      {children}
    </DataContext.Provider>
  )
}

export const useData = () => {
  const context = useContext(DataContext)
  if (!context) throw new Error('useData must be used within a DataProvider')
  return context
}
