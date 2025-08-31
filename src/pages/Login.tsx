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

export default function Login() {
  const navigate = useNavigate()
  const login = useAuthStore((s) => s.login)

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: { username: "", password: "", role: "VIEWER" }
  })

  const onSubmit = (values) => {
    login({ id: crypto.randomUUID?.() || "u1", name: values.username, role: values.role })
    navigate("/dashboard")
  }

  const quickLogin = (name, role) => {
    login({ id: crypto.randomUUID?.() || "u1", name, role })
    navigate("/dashboard")
  }

  return (
    <div className="min-h-[calc(100vh-3.5rem)] flex items-center justify-center px-4 sm:px-6">
      <div className="w-full max-w-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Sign in</h1>
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
                    <Input autoFocus placeholder="jane.doe" {...field} />
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
                    <Input type="password" placeholder="••••••••" {...field} />
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
                      <SelectTrigger>
                        <SelectValue placeholder="Select role" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ADMIN">Admin</SelectItem>
                        <SelectItem value="BROKER">Broker</SelectItem>
                        <SelectItem value="ANALYST">Analyst</SelectItem>
                        <SelectItem value="VIEWER">Viewer</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )} 
            />

            <Button type="submit" className="w-full">
              Continue
            </Button>
          </form>
        </Form>

        <div className="mt-6">
          <p className="text-xs text-muted-foreground mb-2">Quick roles</p>
          <div className="flex flex-wrap gap-2">
            <Button 
              onClick={() => quickLogin("alice.admin", "ADMIN")} 
              variant="outline" 
              size="sm"
            >
              Admin
            </Button>
            <Button 
              onClick={() => quickLogin("ben.broker", "BROKER")} 
              variant="outline" 
              size="sm"
            >
              Broker
            </Button>
            <Button 
              onClick={() => quickLogin("amy.analyst", "ANALYST")} 
              variant="outline" 
              size="sm"
            >
              Analyst
            </Button>
            <Button 
              onClick={() => quickLogin("vic.viewer", "VIEWER")} 
              variant="outline" 
              size="sm"
            >
              Viewer
            </Button>
          </div>
        </div>

        <p className="text-[11px] text-muted-foreground mt-6">
          By continuing, you agree to our Terms and acknowledge our Privacy Policy.
        </p>
      </div>
    </div>
  )
}
