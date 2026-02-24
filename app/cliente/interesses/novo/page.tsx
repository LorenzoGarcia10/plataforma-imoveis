"use client"

import React from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { InterestForm } from "@/components/cliente/interest-form"
import { useInterests } from "@/lib/contexts/interests-context"
import { useAuth } from "@/lib/auth-context"
import { createNewInterest } from "@/lib/interest-form-mapper"

export default function NewInterestPage() {
  const router = useRouter()
  const { setInterests } = useInterests()
  const { user } = useAuth()

  const handleSubmit = (data: Parameters<typeof createNewInterest>[0]) => {
    const newInterest = createNewInterest(data, {
      id: `pi-${Date.now()}`,
      clientId: "1",
      clientName: user?.name ?? "Cliente",
      clientPhone: "(11) 99999-9999",
      clientEmail: user?.email ?? "cliente@email.com",
    })
    setInterests((prev) => [...prev, newInterest])
    router.push("/cliente/interesses")
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="sm" asChild>
          <Link href="/cliente/interesses">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar
          </Link>
        </Button>
      </div>
      <InterestForm onSubmit={handleSubmit} />
    </div>
  )
}
