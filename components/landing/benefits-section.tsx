import { Shield, Clock, Filter, Star, Lock, Smartphone } from "lucide-react"

const clientBenefits = [
  {
    icon: Filter,
    title: "Filtros personalizados",
    description: "Defina exatamente o que procura e receba apenas ofertas relevantes.",
  },
  {
    icon: Shield,
    title: "Corretores verificados",
    description: "Todos os corretores são verificados e possuem CRECI ativo.",
  },
  {
    icon: Clock,
    title: "Economia de tempo",
    description: "Não perca tempo com imóveis que não atendem suas necessidades.",
  },
  {
    icon: Lock,
    title: "Dados protegidos",
    description: "Suas informações são criptografadas e protegidas.",
  },
]

const brokerBenefits = [
  {
    icon: Star,
    title: "Leads qualificados",
    description: "Receba apenas clientes que realmente estão buscando imóveis na sua área de atuação.",
  },
  {
    icon: Smartphone,
    title: "Gestão simplificada",
    description: "Dashboard intuitivo para gerenciar todos os seus leads e conversas.",
  },
]

export function BenefitsSection() {
  return (
    <section id="beneficios" className="bg-secondary/30 py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Benefícios para você
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Vantagens exclusivas para clientes e corretores
          </p>
        </div>

        <div className="mt-16">
          <h3 className="mb-8 text-center text-xl font-semibold text-foreground">
            Para Clientes
          </h3>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {clientBenefits.map((benefit, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <benefit.icon className="h-6 w-6 text-primary" />
                </div>
                <h4 className="mt-4 font-semibold text-foreground">{benefit.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <h3 className="mb-8 text-center text-xl font-semibold text-foreground">
            Para Corretores
          </h3>
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2">
            {brokerBenefits.map((benefit, index) => (
              <div
                key={index}
                className="rounded-xl border border-border bg-card p-6 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-accent/20">
                  <benefit.icon className="h-6 w-6 text-accent" />
                </div>
                <h4 className="mt-4 font-semibold text-foreground">{benefit.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {benefit.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
