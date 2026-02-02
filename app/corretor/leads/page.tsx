"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { MessageCircle, Phone, Mail, MapPin, Home, DollarSign, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { mockLeads, formatCurrency, formatDate, type Lead } from "@/lib/mock-data"

export default function BrokerLeadsPage() {
  const router = useRouter()
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [leads] = useState(mockLeads)

  const handleStartConversation = (leadId: string) => {
    // In a real app, this would create a conversation and redirect
    router.push(`/corretor/chat/conv-${leadId}`)
  }

  const getStatusBadge = (status: Lead["status"]) => {
    const variants: Record<Lead["status"], { label: string; className: string }> = {
      new: { label: "Novo", className: "bg-accent/20 text-accent" },
      contacted: { label: "Contatado", className: "bg-primary/20 text-primary" },
      in_progress: { label: "Em andamento", className: "bg-chart-4/20 text-chart-4" },
      closed: { label: "Fechado", className: "bg-muted text-muted-foreground" },
    }
    return variants[status]
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Leads Disponíveis</h1>
        <p className="text-muted-foreground">
          Clientes interessados em imóveis na sua região
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2">
        <Badge variant="secondary" className="cursor-pointer hover:bg-secondary/80">
          Todos
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-muted">
          Apartamento
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-muted">
          Casa
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-muted">
          Zona Sul
        </Badge>
        <Badge variant="outline" className="cursor-pointer hover:bg-muted">
          Até R$ 500k
        </Badge>
      </div>

      {leads.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {leads.map((lead) => {
            const badge = getStatusBadge(lead.status)
            return (
              <Card key={lead.id} className="flex flex-col">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">
                        {lead.interest.propertyType}
                      </CardTitle>
                      <CardDescription className="flex items-center gap-1">
                        <MapPin className="h-3 w-3" />
                        {lead.interest.location}
                      </CardDescription>
                    </div>
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${badge.className}`}>
                      {badge.label}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 text-sm">
                      <DollarSign className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">
                        {formatCurrency(lead.interest.minPrice)} - {formatCurrency(lead.interest.maxPrice)}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      <Home className="h-4 w-4 text-muted-foreground" />
                      <span className="text-foreground">
                        {lead.interest.bedrooms} quartos, {lead.interest.bathrooms} banheiros
                      </span>
                    </div>
                    {lead.interest.features.length > 0 && (
                      <div className="flex flex-wrap gap-1">
                        {lead.interest.features.slice(0, 3).map((feature, idx) => (
                          <span
                            key={idx}
                            className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground"
                          >
                            {feature}
                          </span>
                        ))}
                        {lead.interest.features.length > 3 && (
                          <span className="rounded-full bg-secondary px-2 py-0.5 text-xs text-secondary-foreground">
                            +{lead.interest.features.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  <div className="mt-4 border-t border-border pt-4">
                    <p className="text-xs text-muted-foreground">
                      Criado em {formatDate(lead.createdAt)}
                    </p>
                    <div className="mt-3 flex gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        className="flex-1 bg-transparent"
                        onClick={() => setSelectedLead(lead)}
                      >
                        <Eye className="mr-1 h-4 w-4" />
                        Detalhes
                      </Button>
                      {lead.interest.isActive && (
                        <Button
                          size="sm"
                          className="flex-1"
                          onClick={() => handleStartConversation(lead.id)}
                        >
                          <MessageCircle className="mr-1 h-4 w-4" />
                          Contatar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">
              Nenhum lead disponível no momento
            </p>
            <p className="text-sm text-muted-foreground">
              Novos leads aparecerão aqui assim que disponíveis
            </p>
          </CardContent>
        </Card>
      )}

      {/* Lead Detail Dialog */}
      <Dialog open={!!selectedLead} onOpenChange={() => setSelectedLead(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Detalhes do Lead</DialogTitle>
            <DialogDescription>
              Informações completas do interesse do cliente
            </DialogDescription>
          </DialogHeader>
          {selectedLead && (
            <div className="space-y-4">
              <div className="rounded-lg border border-border p-4">
                <h4 className="font-medium text-foreground">
                  {selectedLead.interest.clientName}
                </h4>
                <div className="mt-2 space-y-1">
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Phone className="h-4 w-4" />
                    {selectedLead.interest.clientPhone}
                  </p>
                  <p className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Mail className="h-4 w-4" />
                    {selectedLead.interest.clientEmail}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">Interesse</h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Tipo:</span>{" "}
                    <span className="text-foreground">{selectedLead.interest.propertyType}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Local:</span>{" "}
                    <span className="text-foreground">{selectedLead.interest.location}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Preço:</span>{" "}
                    <span className="text-foreground">
                      {formatCurrency(selectedLead.interest.minPrice)} - {formatCurrency(selectedLead.interest.maxPrice)}
                    </span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Quartos:</span>{" "}
                    <span className="text-foreground">{selectedLead.interest.bedrooms}</span>
                  </div>
                </div>
              </div>

              {selectedLead.interest.features.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Características desejadas</h4>
                  <div className="flex flex-wrap gap-1">
                    {selectedLead.interest.features.map((feature, idx) => (
                      <span
                        key={idx}
                        className="rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                      >
                        {feature}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {selectedLead.interest.notes && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Observações</h4>
                  <p className="text-sm text-muted-foreground">
                    {selectedLead.interest.notes}
                  </p>
                </div>
              )}
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setSelectedLead(null)}>
              Fechar
            </Button>
            {selectedLead?.interest.isActive && (
              <Button onClick={() => {
                setSelectedLead(null)
                handleStartConversation(selectedLead.id)
              }}>
                <MessageCircle className="mr-2 h-4 w-4" />
                Iniciar conversa
              </Button>
            )}
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
