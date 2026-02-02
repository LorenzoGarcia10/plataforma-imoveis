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

export default function ClientLoginPage() {
  const router = useRouter()
  const { login, loginWithGoogle, loginWithFacebook } = useAuth()
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError("")

    const success = await login(email, password, "client")
    if (success) {
      router.push("/cliente/dashboard")
    } else {
      setError("Email ou senha incorretos")
    }
    setIsLoading(false)
  }

  const handleGoogleLogin = async () => {
    setIsLoading(true)
    await loginWithGoogle()
    router.push("/cliente/dashboard")
  }

  const handleFacebookLogin = async () => {
    setIsLoading(true)
    await loginWithFacebook()
    router.push("/cliente/dashboard")
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
            Entrar como Cliente
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Ainda não tem conta?{" "}
            <Link href="/cadastro/cliente" className="font-medium text-primary hover:underline">
              Cadastre-se
            </Link>
          </p>

          <div className="mt-8">
            <div className="flex flex-col gap-3">
              <Button
                variant="outline"
                onClick={handleGoogleLogin}
                disabled={isLoading}
                className="w-full bg-transparent"
              >
                <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24" aria-hidden="true">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Continuar com Google
              </Button>
              <Button
                variant="outline"
                onClick={handleFacebookLogin}
                disabled={isLoading}
                className="w-full bg-transparent"
              >
                <svg className="mr-2 h-5 w-5" fill="#1877F2" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                Continuar com Facebook
              </Button>
            </div>

            <div className="relative my-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-border" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="bg-background px-2 text-muted-foreground">ou</span>
              </div>
            </div>

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

            <p className="mt-6 text-center text-sm text-muted-foreground">
              É corretor?{" "}
              <Link href="/login/corretor" className="font-medium text-primary hover:underline">
                Acesse aqui
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Image/Decoration */}
      <div className="relative hidden flex-1 lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-accent">
          <div className="flex h-full flex-col items-center justify-center p-12 text-primary-foreground">
            <div className="max-w-md text-center">
              <h3 className="text-3xl font-bold">Encontre o imóvel perfeito</h3>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Acesse sua conta para visualizar suas conversas, formulários de interesse
                e encontrar o imóvel dos seus sonhos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
