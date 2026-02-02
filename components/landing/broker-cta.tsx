import Link from "next/link"
import { ArrowRight, BadgeCheck, TrendingUp, Users } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BrokerCTA() {
  return (
    <section id="corretores" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-primary">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="p-8 sm:p-12 lg:p-16">
              <span className="inline-flex items-center rounded-full bg-primary-foreground/20 px-3 py-1 text-sm font-medium text-primary-foreground">
                Para Corretores
              </span>
              <h2 className="mt-6 text-3xl font-bold tracking-tight text-primary-foreground sm:text-4xl">
                É um corretor? Aumente suas vendas com leads qualificados
              </h2>
              <p className="mt-4 text-lg leading-relaxed text-primary-foreground/80">
                Cadastre-se na plataforma e receba clientes que realmente estão procurando
                imóveis na sua região e especialidade. Economize tempo e aumente suas conversões.
              </p>

              <ul className="mt-8 space-y-4">
                <li className="flex items-center gap-3 text-primary-foreground">
                  <BadgeCheck className="h-5 w-5 flex-shrink-0" />
                  <span>Leads filtrados por região e tipo de imóvel</span>
                </li>
                <li className="flex items-center gap-3 text-primary-foreground">
                  <TrendingUp className="h-5 w-5 flex-shrink-0" />
                  <span>Dashboard completo para gestão de clientes</span>
                </li>
                <li className="flex items-center gap-3 text-primary-foreground">
                  <Users className="h-5 w-5 flex-shrink-0" />
                  <span>Chat integrado para comunicação direta</span>
                </li>
              </ul>

              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button
                  size="lg"
                  variant="secondary"
                  asChild
                  className="bg-primary-foreground text-primary hover:bg-primary-foreground/90"
                >
                  <Link href="/cadastro/corretor">
                    Cadastrar como corretor
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  asChild
                  className="border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10 bg-transparent"
                >
                  <Link href="/login/corretor">Já tenho conta</Link>
                </Button>
              </div>
            </div>

            <div className="hidden items-center justify-center bg-primary-foreground/5 p-8 lg:flex">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-primary-foreground/10 p-6 text-center">
                  <span className="text-4xl font-bold text-primary-foreground">500+</span>
                  <p className="mt-2 text-sm text-primary-foreground/80">Corretores ativos</p>
                </div>
                <div className="rounded-2xl bg-primary-foreground/10 p-6 text-center">
                  <span className="text-4xl font-bold text-primary-foreground">10k+</span>
                  <p className="mt-2 text-sm text-primary-foreground/80">Leads gerados</p>
                </div>
                <div className="rounded-2xl bg-primary-foreground/10 p-6 text-center">
                  <span className="text-4xl font-bold text-primary-foreground">85%</span>
                  <p className="mt-2 text-sm text-primary-foreground/80">Taxa de conversão</p>
                </div>
                <div className="rounded-2xl bg-primary-foreground/10 p-6 text-center">
                  <span className="text-4xl font-bold text-primary-foreground">4.9</span>
                  <p className="mt-2 text-sm text-primary-foreground/80">Avaliação média</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
