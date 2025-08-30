import { Search, HelpCircle, Bell, Menu } from "lucide-react"
import { Button } from "../ui/button"
import { ThemeToggle } from "../ui/theme-toggle"
import { useState } from "react"

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="flex h-14 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center space-x-4">
          <h1 className="text-lg sm:text-xl font-bold">DemoApp</h1>
        </div>
        
        <div className="hidden sm:flex items-center space-x-2">
          <Button variant="ghost" size="sm">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
          <Button variant="ghost" size="sm">
            <HelpCircle className="h-4 w-4" />
            <span className="sr-only">Help</span>
          </Button>
          <Button variant="ghost" size="sm">
            <Bell className="h-4 w-4" />
            <span className="sr-only">Notifications</span>
          </Button>
          <ThemeToggle />
        </div>

        <div className="flex sm:hidden items-center space-x-2">
          <ThemeToggle />
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Menu className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMobileMenuOpen && (
        <div className="sm:hidden border-t bg-background p-4 space-y-2">
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Search className="h-4 w-4 mr-2" />
            Search
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <HelpCircle className="h-4 w-4 mr-2" />
            Help
          </Button>
          <Button variant="ghost" size="sm" className="w-full justify-start">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
        </div>
      )}
    </header>
  )
}
