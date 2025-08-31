import { useEffect } from "react"
import { Layout } from "@/components/layout/Layout"
import { useAppStore } from "@/store/useAppStore"
import { Outlet } from "react-router-dom"

export default function App() {
  const theme = useAppStore(s => s.theme)
  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark")
  }, [theme])

  return (
    <Layout>
      <Outlet />
    </Layout>
  )
}
