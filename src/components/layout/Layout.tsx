import { ReactNode } from "react"
import { Header } from "./Header"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto p-4 sm:p-6 max-w-7xl">
        {children}
      </main>
    </div>
  )
}
