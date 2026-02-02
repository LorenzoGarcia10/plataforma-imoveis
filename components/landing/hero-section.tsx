"use client"

import Link from "next/link"
import { ArrowRight, Search, Users, MessageCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-secondary/50 to-background py-20 sm:py-32">
      {/* Background decoration */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-3xl" />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Encontre o imóvel dos seus sonhos com os{" "}
            <span className="text-primary">melhores corretores</span>
          </h1>
          <p className="mt-6 text-pretty text-lg leading-relaxed text-muted-foreground sm:text-xl">
            Plataforma que conecta clientes qualificados a corretores especializados.
            Preencha seus interesses e receba atendimento personalizado dos melhores profissionais do mercado.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button size="lg" asChild className="w-full sm:w-auto">
              <Link href="/cadastro/cliente">
                Buscar meu imóvel
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild className="w-full sm:w-auto bg-transparent">
              <Link href="#corretores">Sou corretor</Link>
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-20 grid grid-cols-1 gap-8 sm:grid-cols-3">
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <span className="text-3xl font-bold text-foreground">5.000+</span>
            <span className="text-sm text-muted-foreground">Imóveis encontrados</span>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-accent/20">
              <Users className="h-6 w-6 text-accent" />
            </div>
            <span className="text-3xl font-bold text-foreground">500+</span>
            <span className="text-sm text-muted-foreground">Corretores ativos</span>
          </div>
          <div className="flex flex-col items-center gap-2 rounded-2xl border border-border bg-card p-6 text-center shadow-sm">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
              <MessageCircle className="h-6 w-6 text-primary" />
            </div>
            <span className="text-3xl font-bold text-foreground">98%</span>
            <span className="text-sm text-muted-foreground">Satisfação dos clientes</span>
          </div>
        </div>
      </div>
    </section>
  )
}
