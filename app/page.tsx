import { Header } from "@/components/landing/header"
import { HeroSection } from "@/components/landing/hero-section"
import { HowItWorks } from "@/components/landing/how-it-works"
import { BenefitsSection } from "@/components/landing/benefits-section"
import { BrokerCTA } from "@/components/landing/broker-cta"
import { Footer } from "@/components/landing/footer"

export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <HowItWorks />
        <BenefitsSection />
        <BrokerCTA />
      </main>
      <Footer />
    </div>
  )
}
