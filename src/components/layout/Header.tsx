import { Search, HelpCircle, Bell, Menu } from "lucide-react"
import { Button } from "@/components/ui/button"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useState } from "react"
import { useAuthStore } from "@/store/useAuthStore"
import { useLocation } from "react-router-dom"

export function Header() {
  const [open, setOpen] = useState(false)
  const user = useAuthStore(s => s.user)
  const logout = useAuthStore(s => s.logout)
  const { pathname } = useLocation()

  const isLoginPage = pathname === "/login"
  
  const showMobileMenu = !!user && !isLoginPage
  const showActionIcons = !!user && !isLoginPage

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">
        <h1 className="text-lg sm:text-xl font-bold truncate">DemoApp</h1>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-2 shrink-0">
            {showActionIcons && (
              <>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Search className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <HelpCircle className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Bell className="h-4 w-4" />
                </Button>
              </>
            )}
            
            <ThemeToggle />
            
            {user && !isLoginPage && (
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            )}
          </div>

          <div className="flex sm:hidden items-center gap-2">
            {isLoginPage && <ThemeToggle />}
            
            {showMobileMenu && (
              <Button variant="ghost" size="icon" onClick={() => setOpen(!open)}>
                <Menu className="h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>

      {showMobileMenu && open && (
        <div className="sm:hidden border-t bg-background p-4 space-y-2">
          <Button variant="ghost" className="w-full justify-start">
            <Search className="h-4 w-4 mr-2" />Search
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <HelpCircle className="h-4 w-4 mr-2" />Help
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            <Bell className="h-4 w-4 mr-2" />Notifications
          </Button>
          
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Theme</span>
            <ThemeToggle />
          </div>
          
          {user && !isLoginPage && (
            <Button variant="outline" className="w-full" onClick={logout}>
              Logout
            </Button>
          )}
        </div>
      )}
    </header>
  )
}
