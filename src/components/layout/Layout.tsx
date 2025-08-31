import { ReactNode } from "react"
import { Header } from "./Header"

interface LayoutProps {
  children: ReactNode
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main
        className="
          mx-auto w-full
          max-w-[1400px]
          px-3 sm:px-4 lg:px-3 xl:px-4 2xl:px-5
          py-4 sm:py-6
        "
      >
        {children}
      </main>
    </div>
  )
}
