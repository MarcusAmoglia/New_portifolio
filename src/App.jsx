// src/App.jsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { DataProvider, useData } from './context/DataContext'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import Navbar from './components/layout/Navbar/Navbar'
import Footer from './components/layout/Footer/Footer'
import Home from './pages/Home'
import ProjectsPage from './pages/ProjectsPage'
import CertificationsPage from './pages/CertificationsPage'
import Admin from './pages/Admin/Admin'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }) }, [pathname])
  return null
}

function ColorSync() {
  const { data } = useData()
  const { setColors } = useTheme()
  useEffect(() => { if (data?.colors) setColors(data.colors) }, [data?.colors])
  return null
}

function AppLayout() {
  return (
    <div className="min-h-screen flex flex-col overflow-x-hidden" style={{ background: 'var(--bg)' }}>
      <ColorSync />
      <Navbar />
      <main className="flex-grow">
        <ScrollToTop />
        <AnimatePresence mode="wait">
          <Routes>
            <Route path="/"              element={<Home />} />
            <Route path="/projetos"      element={<ProjectsPage />} />
            <Route path="/certificacoes" element={<CertificationsPage />} />
            <Route path="/admin"         element={<Admin />} />
          </Routes>
        </AnimatePresence>
      </main>
      <Footer />
    </div>
  )
}

function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <DataProvider>
        <ThemeProvider>
          <AppLayout />
        </ThemeProvider>
      </DataProvider>
    </BrowserRouter>
  )
}

export default App