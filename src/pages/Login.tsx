import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useNavigate } from "react-router-dom"
import { useAuthStore } from "@/store/useAuthStore"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select"

const schema = z.object({
  username: z.string().min(2, "Username must be at least 2 characters"),
  password: z.string().min(4, "Password must be at least 4 characters"),
  role: z.enum(["ADMIN", "BROKER", "ANALYST", "VIEWER"])
})

type LoginFormData = z.infer<typeof schema>
type UserRole = LoginFormData["role"]

export default function Login() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)

  const form = useForm<LoginFormData>({
    resolver: zodResolver(schema),
    defaultValues: { 
      username: "", 
      password: "", 
      role: "VIEWER" as const
    }
  })

  const onSubmit = (values: LoginFormData) => {
    login({ 
      id: crypto.randomUUID?.() || "u1", 
      name: values.username, 
      role: values.role 
    })
    navigate("/dashboard")
  }

  const quickLogin = (name: string, role: UserRole) => {
    login({ 
      id: crypto.randomUUID?.() || "u1", 
      name, 
      role 
    })
    navigate("/dashboard")
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80')`
        }}
      />
      
      <div className="absolute inset-0 bg-gradient-to-br from-background/95 via-background/90 to-background/95 dark:from-background/90 dark:via-background/85 dark:to-background/90" />
      
      <div className="absolute inset-0 backdrop-blur-sm" />
      
      <div className="relative z-10 w-full max-w-sm mx-4">
        <div className="bg-card/80 backdrop-blur-lg border border-border/20 rounded-xl shadow-2xl p-8">
          <div className="mb-6">
            <h1 className="text-2xl font-semibold text-foreground">Welcome Back</h1>
            <p className="text-sm text-muted-foreground mt-1">
              Use demo credentials below. Any valid input accepted.
            </p>
          </div>

          <Form {...form}>
            <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
              <FormField 
                name="username" 
                control={form.control} 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input 
                        autoFocus 
                        placeholder="Enter your username" 
                        className="bg-background/50 backdrop-blur-sm"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} 
              />

              <FormField 
                name="password" 
                control={form.control} 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Enter your password" 
                        className="bg-background/50 backdrop-blur-sm"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} 
              />

              <FormField 
                name="role" 
                control={form.control} 
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Role</FormLabel>
                    <FormControl>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <SelectTrigger 
                          className="bg-background/50 backdrop-blur-sm"
                          data-testid="role-select-trigger"
                        >
                          <SelectValue placeholder="Select your role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="ADMIN" data-value="ADMIN">Administrator</SelectItem>
                          <SelectItem value="BROKER" data-value="BROKER">Broker</SelectItem>
                          <SelectItem value="ANALYST" data-value="ANALYST">Analyst</SelectItem>
                          <SelectItem value="VIEWER" data-value="VIEWER">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )} 
              />

              <Button type="submit" className="w-full bg-primary hover:bg-primary/90">
                Sign In
              </Button>
            </form>
          </Form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-border/30" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-card px-2 text-muted-foreground">Quick roles</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 mt-4">
              <Button 
                onClick={() => quickLogin("alice.admin", "ADMIN")} 
                variant="outline" 
                size="sm"
                className="bg-background/30 hover:bg-background/50"
              >
                Admin
              </Button>
              <Button 
                onClick={() => quickLogin("ben.broker", "BROKER")} 
                variant="outline" 
                size="sm"
                className="bg-background/30 hover:bg-background/50"
              >
                Broker
              </Button>
              <Button 
                onClick={() => quickLogin("amy.analyst", "ANALYST")} 
                variant="outline" 
                size="sm"
                className="bg-background/30 hover:bg-background/50"
              >
                Analyst
              </Button>
              <Button 
                onClick={() => quickLogin("vic.viewer", "VIEWER")} 
                variant="outline" 
                size="sm"
                className="bg-background/30 hover:bg-background/50"
              >
                Viewer
              </Button>
            </div>
          </div>

          <p className="text-[11px] text-muted-foreground mt-6 text-center">
            By continuing, you agree to our Terms and acknowledge our Privacy Policy.
          </p>
        </div>
      </div>
    </div>
  )
}
