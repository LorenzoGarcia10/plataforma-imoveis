import Link from "next/link"
import { Building2 } from "lucide-react"

export function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="md:col-span-2">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <Building2 className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">ImobiConnect</span>
            </Link>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-muted-foreground">
              Conectando clientes qualificados aos melhores corretores do mercado imobiliário.
              Encontre o imóvel dos seus sonhos de forma simples e eficiente.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Para Clientes</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/cadastro/cliente" className="text-sm text-muted-foreground hover:text-foreground">
                  Cadastrar
                </Link>
              </li>
              <li>
                <Link href="/login/cliente" className="text-sm text-muted-foreground hover:text-foreground">
                  Entrar
                </Link>
              </li>
              <li>
                <Link href="#como-funciona" className="text-sm text-muted-foreground hover:text-foreground">
                  Como funciona
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Para Corretores</h3>
            <ul className="mt-4 space-y-3">
              <li>
                <Link href="/cadastro/corretor" className="text-sm text-muted-foreground hover:text-foreground">
                  Cadastrar
                </Link>
              </li>
              <li>
                <Link href="/login/corretor" className="text-sm text-muted-foreground hover:text-foreground">
                  Entrar
                </Link>
              </li>
              <li>
                <Link href="#corretores" className="text-sm text-muted-foreground hover:text-foreground">
                  Benefícios
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} ImobiConnect. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  )
}
