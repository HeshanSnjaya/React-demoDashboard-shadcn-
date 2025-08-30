import { useEffect } from 'react'
import { Layout } from './components/layout/Layout'
import { Dashboard } from './pages/Dashboard'
import { useAppStore } from './store/useAppStore'

function App() {
  const theme = useAppStore(state => state.theme)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return (
    <Layout>
      <Dashboard />
    </Layout>
  )
}

export default App
