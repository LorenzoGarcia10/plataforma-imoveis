"use client"

import { createContext, useContext, useState, type ReactNode } from "react"

export type UserType = "client" | "broker" | null

export interface User {
  id: string
  name: string
  email: string
  phone: string
  cpf?: string
  type: UserType
  avatar?: string
  creci?: string
  subscriptionActive?: boolean
}

interface AuthContextType {
  user: User | null
  userType: UserType
  login: (email: string, password: string, type: UserType) => Promise<boolean>
  loginWithGoogle: () => Promise<boolean>
  loginWithFacebook: () => Promise<boolean>
  register: (userData: Partial<User> & { password: string }) => Promise<boolean>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock users for demonstration
const mockUsers: (User & { password: string })[] = [
  {
    id: "1",
    name: "Maria Silva",
    email: "maria@email.com",
    phone: "(11) 99999-9999",
    cpf: "123.456.789-00",
    type: "client",
    password: "123456",
  },
  {
    id: "2",
    name: "João Corretor",
    email: "joao@corretor.com",
    phone: "(11) 98888-8888",
    type: "broker",
    creci: "12345-SP",
    subscriptionActive: true,
    password: "123456",
  },
]

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)

  const login = async (email: string, password: string, type: UserType): Promise<boolean> => {
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 500))

    const foundUser = mockUsers.find(
      (u) => u.email === email && u.password === password && u.type === type
    )

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser
      setUser(userWithoutPassword)
      return true
    }
    return false
  }

  const loginWithGoogle = async (): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    // Mock Google login - creates a new client user
    setUser({
      id: "google-" + Date.now(),
      name: "Usuário Google",
      email: "usuario@gmail.com",
      phone: "",
      type: "client",
    })
    return true
  }

  const loginWithFacebook = async (): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    // Mock Facebook login
    setUser({
      id: "fb-" + Date.now(),
      name: "Usuário Facebook",
      email: "usuario@facebook.com",
      phone: "",
      type: "client",
    })
    return true
  }

  const register = async (userData: Partial<User> & { password: string }): Promise<boolean> => {
    await new Promise((resolve) => setTimeout(resolve, 500))
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name || "",
      email: userData.email || "",
      phone: userData.phone || "",
      cpf: userData.cpf,
      type: userData.type || "client",
      creci: userData.creci,
      subscriptionActive: userData.type === "broker" ? false : undefined,
    }
    setUser(newUser)
    return true
  }

  const logout = () => {
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        userType: user?.type || null,
        login,
        loginWithGoogle,
        loginWithFacebook,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
