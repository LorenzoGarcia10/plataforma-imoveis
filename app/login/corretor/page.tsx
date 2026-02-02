"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Building2, Eye, EyeOff, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"

export default function BrokerLoginPage() {
  const router = useRouter()
  const { login } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const success = await login(email, password, "broker")
    if (success) {
      router.push("/corretor/dashboard")
    } else {
      setError("Email ou senha incorretos")
    }
    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">ImobiConnect</span>
            </Link>
          </div>

          <h2 className="mt-8 text-2xl font-bold tracking-tight text-foreground">
            Acesso para Corretores
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Ainda não tem conta?{" "}
            <Link href="/cadastro/corretor" className="font-medium text-primary hover:underline">
              Cadastre-se
            </Link>
          </p>

          <div className="mt-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="seu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Senha</Label>
                <div className="relative">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="********"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                    aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-end">
                <Link
                  href="/recuperar-senha"
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Esqueceu a senha?
                </Link>
              </div>

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Entrar
              </Button>
            </form>

            <div className="mt-8 rounded-lg border border-border bg-muted/50 p-4">
              <h4 className="font-medium text-foreground">Credenciais de teste</h4>
              <p className="mt-1 text-sm text-muted-foreground">
                Email: joao@corretor.com<br />
                Senha: 123456
              </p>
            </div>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              É cliente?{" "}
              <Link href="/login/cliente" className="font-medium text-primary hover:underline">
                Acesse aqui
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Image/Decoration */}
      <div className="relative hidden flex-1 lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-accent to-primary">
          <div className="flex h-full flex-col items-center justify-center p-12 text-primary-foreground">
            <div className="max-w-md text-center">
              <h3 className="text-3xl font-bold">Gerencie seus leads</h3>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Acesse seu dashboard para visualizar novos leads, gerenciar conversas
                e aumentar suas vendas.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/10 p-4 text-center">
                  <span className="text-2xl font-bold">+45%</span>
                  <p className="mt-1 text-sm text-primary-foreground/80">Conversões</p>
                </div>
                <div className="rounded-xl bg-white/10 p-4 text-center">
                  <span className="text-2xl font-bold">10x</span>
                  <p className="mt-1 text-sm text-primary-foreground/80">Mais leads</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
