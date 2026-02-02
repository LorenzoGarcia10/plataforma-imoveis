"use client"

import React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Building2,
  LayoutDashboard,
  Users,
  MessageCircle,
  User,
  LogOut,
  Menu,
  X,
  BadgeCheck,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/lib/auth-context"
import { useState } from "react"

const navigation = [
  { name: "Dashboard", href: "/corretor/dashboard", icon: LayoutDashboard },
  { name: "Leads Disponíveis", href: "/corretor/leads", icon: Users },
  { name: "Conversas", href: "/corretor/conversas", icon: MessageCircle },
  { name: "Meu Perfil", href: "/corretor/perfil", icon: User },
]

export default function BrokerLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const { user, logout, isAuthenticated } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  useEffect(() => {
    if (!isAuthenticated) {
      router.push("/login/corretor")
    }
  }, [isAuthenticated, router])

  const handleLogout = () => {
    logout()
    router.push("/")
  }

  if (!isAuthenticated) {
    return null
  }

  return (
    <div className="flex min-h-screen bg-background">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-border bg-card transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex h-16 items-center justify-between border-b border-border px-4">
            <Link href="/corretor/dashboard" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent">
                <Building2 className="h-5 w-5 text-accent-foreground" />
              </div>
              <span className="font-bold text-foreground">ImobiConnect</span>
            </Link>
            <button
              type="button"
              className="lg:hidden"
              onClick={() => setSidebarOpen(false)}
              aria-label="Fechar menu"
            >
              <X className="h-6 w-6 text-muted-foreground" />
            </button>
          </div>

          {/* Subscription badge */}
          <div className="border-b border-border p-4">
            <div className="flex items-center gap-2 rounded-lg bg-accent/10 px-3 py-2">
              <BadgeCheck className="h-4 w-4 text-accent" />
              <span className="text-sm font-medium text-accent">Plano Profissional</span>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 space-y-1 p-4">
            {navigation.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-accent text-accent-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </nav>

          {/* User info */}
          <div className="border-t border-border p-4">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                <User className="h-5 w-5 text-accent" />
              </div>
              <div className="flex-1 overflow-hidden">
                <p className="truncate text-sm font-medium text-foreground">
                  {user?.name}
                </p>
                <p className="truncate text-xs text-muted-foreground">
                  CRECI: {user?.creci}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              className="mt-4 w-full justify-start text-muted-foreground"
              onClick={handleLogout}
            >
              <LogOut className="mr-2 h-4 w-4" />
              Sair
            </Button>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex flex-1 flex-col">
        {/* Top bar */}
        <header className="flex h-16 items-center gap-4 border-b border-border bg-card px-4 lg:px-6">
          <button
            type="button"
            className="lg:hidden"
            onClick={() => setSidebarOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="h-6 w-6 text-foreground" />
          </button>
          <div className="flex-1" />
          <span className="text-sm text-muted-foreground">
            Olá, {user?.name?.split(" ")[0]}!
          </span>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 lg:p-6">{children}</main>
      </div>
    </div>
  )
}
