"use client"

import { useEffect } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useInterests } from "@/lib/contexts/interests-context"
import { interestToFormState, formStateToInterest, type InterestFormState } from "@/lib/interest-form-mapper"
import { InterestForm } from "@/components/cliente/interest-form"

export default function EditarInteressePage() {
  const router = useRouter()
  const params = useParams()
  const id = params.id as string
  const { getInterestById, updateInterest } = useInterests()
  const interest = getInterestById(id)

  useEffect(() => {
    if (id && !interest) {
      router.replace("/cliente/interesses")
    }
  }, [id, interest, router])

  if (!interest) {
    return null
  }

  const initialData = interestToFormState(interest)

  const handleSubmit = (data: InterestFormState) => {
    const updated = formStateToInterest(data, interest)
    updateInterest(id, updated)
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
      <InterestForm
        initialData={initialData}
        isEdit
        onSubmit={handleSubmit}
      />
    </div>
  )
}
