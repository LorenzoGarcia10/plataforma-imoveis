"use client"

import React from "react"

import { useState } from "react"
import { Loader2, User, BadgeCheck, CreditCard } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/lib/auth-context"

export default function BrokerProfilePage() {
  const { user } = useAuth()
  const [isLoading, setIsLoading] = useState(false)
  const [isSaved, setIsSaved] = useState(false)
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: user?.phone || "",
    creci: user?.creci || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1000))
    setIsLoading(false)
    setIsSaved(true)
    setTimeout(() => setIsSaved(false), 3000)
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Meu Perfil</h1>
        <p className="text-muted-foreground">
          Gerencie suas informações e assinatura
        </p>
      </div>

      {/* Subscription Card */}
      <Card className="border-accent/50 bg-accent/5">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/20">
                <BadgeCheck className="h-5 w-5 text-accent" />
              </div>
              <div>
                <CardTitle className="text-accent">Plano Profissional</CardTitle>
                <CardDescription>Ativo até 15/02/2026</CardDescription>
              </div>
            </div>
            <span className="text-lg font-bold text-foreground">R$ 199/mês</span>
          </div>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-4 text-sm">
            <span className="text-muted-foreground">Leads ilimitados</span>
            <span className="text-muted-foreground">Chat ilimitado</span>
            <span className="text-muted-foreground">Suporte prioritário</span>
          </div>
          <div className="mt-4 flex gap-3">
            <Button variant="outline" size="sm">
              <CreditCard className="mr-2 h-4 w-4" />
              Gerenciar pagamento
            </Button>
            <Button variant="outline" size="sm">
              Alterar plano
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Profile Card */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <User className="h-8 w-8 text-accent" />
            </div>
            <div>
              <CardTitle>{user?.name}</CardTitle>
              <CardDescription>CRECI: {user?.creci}</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nome completo</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="phone">Telefone</Label>
                <Input
                  id="phone"
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="creci">CRECI</Label>
                <Input
                  id="creci"
                  value={formData.creci}
                  disabled
                />
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Button type="submit" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Salvar alterações
              </Button>
              {isSaved && (
                <span className="text-sm text-accent">
                  Alterações salvas com sucesso!
                </span>
              )}
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Password Card */}
      <Card>
        <CardHeader>
          <CardTitle>Alterar senha</CardTitle>
          <CardDescription>
            Atualize sua senha de acesso
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="currentPassword">Senha atual</Label>
              <Input id="currentPassword" type="password" />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="newPassword">Nova senha</Label>
                <Input id="newPassword" type="password" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="confirmPassword">Confirmar nova senha</Label>
                <Input id="confirmPassword" type="password" />
              </div>
            </div>
            <Button type="button">Alterar senha</Button>
          </form>
        </CardContent>
      </Card>

      {/* Stats Card */}
      <Card>
        <CardHeader>
          <CardTitle>Estatísticas</CardTitle>
          <CardDescription>Seu desempenho na plataforma</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">156</p>
              <p className="text-xs text-muted-foreground">Total de leads</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">89</p>
              <p className="text-xs text-muted-foreground">Conversas</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-foreground">32%</p>
              <p className="text-xs text-muted-foreground">Conversão</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-accent">4.8</p>
              <p className="text-xs text-muted-foreground">Avaliação</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
