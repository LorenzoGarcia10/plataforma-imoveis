"use client"

import React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"

const propertyTypes = [
  "Apartamento",
  "Casa",
  "Cobertura",
  "Studio",
  "Terreno",
  "Comercial",
  "Rural",
]

const features = [
  "Varanda",
  "Vaga de garagem",
  "Piscina",
  "Academia",
  "Churrasqueira",
  "Área de lazer",
  "Portaria 24h",
  "Pet friendly",
  "Mobiliado",
  "Suite",
  "Quintal",
  "Elevador",
]

const locations = [
  "São Paulo - Zona Sul",
  "São Paulo - Zona Norte",
  "São Paulo - Zona Leste",
  "São Paulo - Zona Oeste",
  "São Paulo - Centro",
  "Santo André",
  "São Bernardo do Campo",
  "São Caetano do Sul",
  "Guarulhos",
  "Osasco",
  "Campinas",
  "Outras regiões",
]

export default function NewInterestPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState({
    propertyType: "",
    location: "",
    minPrice: "",
    maxPrice: "",
    bedrooms: "",
    bathrooms: "",
    features: [] as string[],
    notes: "",
  })

  const handleFeatureToggle = (feature: string) => {
    setFormData((prev) => ({
      ...prev,
      features: prev.features.includes(feature)
        ? prev.features.filter((f) => f !== feature)
        : [...prev.features, feature],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

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

      <Card>
        <CardHeader>
          <CardTitle>Novo interesse em imóvel</CardTitle>
          <CardDescription>
            Preencha as informações do imóvel que você está procurando.
            Corretores especializados serão notificados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="propertyType">Tipo de imóvel</Label>
                <Select
                  value={formData.propertyType}
                  onValueChange={(value) =>
                    setFormData({ ...formData, propertyType: value })
                  }
                >
                  <SelectTrigger id="propertyType">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {propertyTypes.map((type) => (
                      <SelectItem key={type} value={type}>
                        {type}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="location">Localização</Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) =>
                    setFormData({ ...formData, location: value })
                  }
                >
                  <SelectTrigger id="location">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {locations.map((loc) => (
                      <SelectItem key={loc} value={loc}>
                        {loc}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="minPrice">Preço mínimo (R$)</Label>
                <Input
                  id="minPrice"
                  type="number"
                  placeholder="Ex: 300000"
                  value={formData.minPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, minPrice: e.target.value })
                  }
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="maxPrice">Preço máximo (R$)</Label>
                <Input
                  id="maxPrice"
                  type="number"
                  placeholder="Ex: 500000"
                  value={formData.maxPrice}
                  onChange={(e) =>
                    setFormData({ ...formData, maxPrice: e.target.value })
                  }
                />
              </div>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Quartos</Label>
                <Select
                  value={formData.bedrooms}
                  onValueChange={(value) =>
                    setFormData({ ...formData, bedrooms: value })
                  }
                >
                  <SelectTrigger id="bedrooms">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}+ quarto{num > 1 ? "s" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bathrooms">Banheiros</Label>
                <Select
                  value={formData.bathrooms}
                  onValueChange={(value) =>
                    setFormData({ ...formData, bathrooms: value })
                  }
                >
                  <SelectTrigger id="bathrooms">
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num}+ banheiro{num > 1 ? "s" : ""}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <Label>Características desejadas</Label>
              <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center space-x-2">
                    <Checkbox
                      id={feature}
                      checked={formData.features.includes(feature)}
                      onCheckedChange={() => handleFeatureToggle(feature)}
                    />
                    <label
                      htmlFor={feature}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {feature}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Observações adicionais</Label>
              <Textarea
                id="notes"
                placeholder="Descreva outras preferências ou requisitos específicos..."
                value={formData.notes}
                onChange={(e) =>
                  setFormData({ ...formData, notes: e.target.value })
                }
                rows={4}
              />
            </div>

            <div className="flex gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => router.back()}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button type="submit" disabled={isLoading} className="flex-1">
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Enviar interesse
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
