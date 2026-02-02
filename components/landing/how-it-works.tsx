import { ClipboardList, Bell, MessageCircle, Home } from "lucide-react"

const steps = [
  {
    icon: ClipboardList,
    title: "1. Cadastre seu interesse",
    description:
      "Preencha um formulário simples com as características do imóvel que você procura: localização, tipo, faixa de preço e recursos desejados.",
  },
  {
    icon: Bell,
    title: "2. Corretores são notificados",
    description:
      "Corretores especializados na sua região e tipo de imóvel recebem seu interesse e avaliam se podem ajudá-lo.",
  },
  {
    icon: MessageCircle,
    title: "3. Converse diretamente",
    description:
      "Os corretores interessados iniciam uma conversa com você pelo chat integrado da plataforma, podendo enviar fotos e informações.",
  },
  {
    icon: Home,
    title: "4. Encontre seu imóvel",
    description:
      "Compare as opções, agende visitas e encontre o imóvel perfeito com o auxílio de profissionais qualificados.",
  },
]

export function HowItWorks() {
  return (
    <section id="como-funciona" className="bg-background py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Como funciona
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Processo simples e eficiente para encontrar seu imóvel ideal
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step, index) => (
            <div
              key={index}
              className="relative flex flex-col items-center text-center"
            >
              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="absolute left-1/2 top-10 hidden h-0.5 w-full bg-border lg:block" />
              )}

              <div className="relative z-10 flex h-20 w-20 items-center justify-center rounded-full border-2 border-primary bg-background">
                <step.icon className="h-8 w-8 text-primary" />
              </div>
              <h3 className="mt-6 text-lg font-semibold text-foreground">
                {step.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
