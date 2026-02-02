"use client"

import React from "react"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Building2, Eye, EyeOff, Loader2, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/lib/auth-context"

const subscriptionPlans = [
  {
    name: "Básico",
    price: "R$ 99/mês",
    features: ["Até 20 leads/mês", "Chat ilimitado", "Suporte por email"],
  },
  {
    name: "Profissional",
    price: "R$ 199/mês",
    features: ["Leads ilimitados", "Chat ilimitado", "Suporte prioritário", "Destaque nos resultados"],
    popular: true,
  },
  {
    name: "Premium",
    price: "R$ 349/mês",
    features: ["Leads ilimitados", "Chat ilimitado", "Suporte 24/7", "Destaque máximo", "Relatórios avançados"],
  },
]

export default function BrokerRegisterPage() {
  const router = useRouter()
  const { register } = useAuth()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    creci: "",
    password: "",
    confirmPassword: "",
  })
  const [selectedPlan, setSelectedPlan] = useState("Profissional")
  const [showPassword, setShowPassword] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")

    if (formData.password !== formData.confirmPassword) {
      setError("As senhas não coincidem")
      return
    }

    if (formData.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres")
      return
    }

    setStep(2)
  }

  const handleFinish = async () => {
    setIsLoading(true)

    const success = await register({
      ...formData,
      type: "broker",
      subscriptionActive: true,
    })

    if (success) {
      router.push("/corretor/dashboard")
    } else {
      setError("Erro ao criar conta. Tente novamente.")
    }
    setIsLoading(false)
  }

  const formatPhone = (value: string) => {
    const numbers = value.replace(/\D/g, "")
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
    }
    return value
  }

  return (
    <div className="flex min-h-screen">
      {/* Left side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-md lg:w-[28rem]">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <Building2 className="h-6 w-6 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">ImobiConnect</span>
            </Link>
          </div>

          {/* Progress indicator */}
          <div className="mt-8 flex items-center gap-4">
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 1 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              1
            </div>
            <div className={`h-1 flex-1 rounded ${step >= 2 ? 'bg-primary' : 'bg-muted'}`} />
            <div className={`flex h-8 w-8 items-center justify-center rounded-full ${step >= 2 ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'}`}>
              2
            </div>
          </div>

          {step === 1 && (
            <>
              <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
                Cadastro de Corretor
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Já tem conta?{" "}
                <Link href="/login/corretor" className="font-medium text-primary hover:underline">
                  Entrar
                </Link>
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                {error && (
                  <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Seu nome"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="seu@email.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(11) 99999-9999"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: formatPhone(e.target.value) })}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="creci">CRECI</Label>
                    <Input
                      id="creci"
                      type="text"
                      placeholder="12345-SP"
                      value={formData.creci}
                      onChange={(e) => setFormData({ ...formData, creci: e.target.value })}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="password">Senha</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Mínimo 6 caracteres"
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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

                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Confirmar senha</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Repita a senha"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    required
                  />
                </div>

                <Button type="submit" className="w-full">
                  Continuar
                </Button>
              </form>
            </>
          )}

          {step === 2 && (
            <>
              <h2 className="mt-6 text-2xl font-bold tracking-tight text-foreground">
                Escolha seu plano
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Selecione o plano que melhor atende suas necessidades
              </p>

              <div className="mt-8 space-y-4">
                {subscriptionPlans.map((plan) => (
                  <button
                    key={plan.name}
                    type="button"
                    onClick={() => setSelectedPlan(plan.name)}
                    className={`relative w-full rounded-xl border-2 p-4 text-left transition-all ${
                      selectedPlan === plan.name
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    {plan.popular && (
                      <span className="absolute -top-3 right-4 rounded-full bg-accent px-3 py-1 text-xs font-medium text-accent-foreground">
                        Popular
                      </span>
                    )}
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-foreground">{plan.name}</h3>
                        <p className="text-lg font-bold text-primary">{plan.price}</p>
                      </div>
                      <div className={`flex h-6 w-6 items-center justify-center rounded-full border-2 ${
                        selectedPlan === plan.name ? 'border-primary bg-primary' : 'border-border'
                      }`}>
                        {selectedPlan === plan.name && (
                          <CheckCircle2 className="h-4 w-4 text-primary-foreground" />
                        )}
                      </div>
                    </div>
                    <ul className="mt-3 space-y-1">
                      {plan.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <CheckCircle2 className="h-4 w-4 text-accent" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </button>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <Button variant="outline" onClick={() => setStep(1)} className="flex-1">
                  Voltar
                </Button>
                <Button onClick={handleFinish} className="flex-1" disabled={isLoading}>
                  {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                  Finalizar cadastro
                </Button>
              </div>

              <p className="mt-4 text-center text-xs text-muted-foreground">
                Ao continuar, você concorda com nossos Termos de Uso e Política de Privacidade.
                O pagamento será processado após a verificação do CRECI.
              </p>
            </>
          )}

          <p className="mt-6 text-center text-sm text-muted-foreground">
            É cliente?{" "}
            <Link href="/cadastro/cliente" className="font-medium text-primary hover:underline">
              Cadastre-se aqui
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Image/Decoration */}
      <div className="relative hidden flex-1 lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-accent to-primary">
          <div className="flex h-full flex-col items-center justify-center p-12 text-primary-foreground">
            <div className="max-w-md text-center">
              <h3 className="text-3xl font-bold">Cresça sua carteira de clientes</h3>
              <p className="mt-4 text-lg text-primary-foreground/80">
                Receba leads qualificados diretamente na sua plataforma.
                Clientes que realmente estão procurando imóveis na sua região.
              </p>
              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white/10 p-4 text-center">
                  <span className="text-2xl font-bold">500+</span>
                  <p className="mt-1 text-sm text-primary-foreground/80">Corretores</p>
                </div>
                <div className="rounded-xl bg-white/10 p-4 text-center">
                  <span className="text-2xl font-bold">10k+</span>
                  <p className="mt-1 text-sm text-primary-foreground/80">Leads/mês</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
