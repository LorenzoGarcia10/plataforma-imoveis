"use client"

import Link from "next/link"
import { Building2, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <Building2 className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">ImobiConnect</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden items-center gap-6 md:flex">
          <Link href="#como-funciona" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Como Funciona
          </Link>
          <Link href="#beneficios" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Benefícios
          </Link>
          <Link href="#corretores" className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
            Para Corretores
          </Link>
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <Button variant="ghost" asChild>
            <Link href="/login/cliente">Entrar</Link>
          </Button>
          <Button asChild>
            <Link href="/cadastro/cliente">Cadastrar</Link>
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          type="button"
          className="md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {mobileMenuOpen ? (
            <X className="h-6 w-6 text-foreground" />
          ) : (
            <Menu className="h-6 w-6 text-foreground" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <nav className="flex flex-col gap-4 px-4 py-4">
            <Link
              href="#como-funciona"
              className="text-sm font-medium text-muted-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Como Funciona
            </Link>
            <Link
              href="#beneficios"
              className="text-sm font-medium text-muted-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Benefícios
            </Link>
            <Link
              href="#corretores"
              className="text-sm font-medium text-muted-foreground"
              onClick={() => setMobileMenuOpen(false)}
            >
              Para Corretores
            </Link>
            <div className="flex flex-col gap-2 pt-4">
              <Button variant="outline" asChild className="w-full bg-transparent">
                <Link href="/login/cliente">Entrar</Link>
              </Button>
              <Button asChild className="w-full">
                <Link href="/cadastro/cliente">Cadastrar</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
