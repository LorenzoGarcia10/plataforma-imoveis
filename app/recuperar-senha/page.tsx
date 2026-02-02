"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { Building2, Loader2, ArrowLeft, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export default function RecoverPasswordPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setSubmitted(true)
    setIsLoading(false)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-4 py-12">
      <div className="mx-auto w-full max-w-sm">
        <div className="flex justify-center">
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
              <Building2 className="h-6 w-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">ImobiConnect</span>
          </Link>
        </div>

        {!submitted ? (
          <>
            <h2 className="mt-8 text-center text-2xl font-bold tracking-tight text-foreground">
              Recuperar senha
            </h2>
            <p className="mt-2 text-center text-sm text-muted-foreground">
              Digite seu email para receber as instruções de recuperação
            </p>

            <form onSubmit={handleSubmit} className="mt-8 space-y-6">
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

              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Enviar instruções
              </Button>
            </form>
          </>
        ) : (
          <div className="mt-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-accent/20">
              <CheckCircle2 className="h-8 w-8 text-accent" />
            </div>
            <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
              Email enviado!
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              Enviamos as instruções de recuperação para <strong>{email}</strong>.
              Verifique sua caixa de entrada e spam.
            </p>
          </div>
        )}

        <div className="mt-8 flex justify-center">
          <Link
            href="/login/cliente"
            className="flex items-center gap-2 text-sm font-medium text-primary hover:underline"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar para o login
          </Link>
        </div>
      </div>
    </div>
  )
}
