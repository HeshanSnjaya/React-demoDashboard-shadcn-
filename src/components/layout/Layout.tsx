import { ReactNode } from "react"
import { Header } from "./Header"

export function Layout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <Header />
      <main className="mx-auto w-full max-w-[1400px] px-3 sm:px-4 lg:px-3 xl:px-4 2xl:px-5 py-4 sm:py-6">
        {children}
      </main>
    </div>
  )
}
