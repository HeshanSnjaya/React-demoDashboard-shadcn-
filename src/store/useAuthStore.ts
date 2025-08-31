import { create } from "zustand"

export type Role = "ADMIN" | "BROKER" | "ANALYST" | "VIEWER"
interface User { id: string; name: string; role: Role; token?: string }

interface AuthState {
  user: User | null
  login: (u: User) => void
  logout: () => void
  hasRole: (...roles: Role[]) => boolean
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  login: (u) => set({ user: u }),
  logout: () => set({ user: null }),
  hasRole: (...roles) => {
    const u = get().user
    return !!u && roles.includes(u.role)
  },
}))
