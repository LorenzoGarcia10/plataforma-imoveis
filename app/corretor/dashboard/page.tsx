"use client"

import Link from "next/link"
import { Users, MessageCircle, TrendingUp, ArrowRight, Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockLeads, mockConversations, formatCurrency, formatDate } from "@/lib/mock-data"

export default function BrokerDashboardPage() {
  const newLeads = mockLeads.filter((l) => l.status === "new")
  const activeConversations = mockConversations

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Gerencie seus leads e conversas</p>
        </div>
        <Button asChild>
          <Link href="/corretor/leads">
            <Bell className="mr-2 h-4 w-4" />
            Ver novos leads
          </Link>
        </Button>
      </div>

      {/* Stats */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Novos Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-accent">{newLeads.length}</div>
            <p className="text-xs text-muted-foreground">aguardando contato</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversas Ativas</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeConversations.length}</div>
            <p className="text-xs text-muted-foreground">em andamento</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Leads este mês</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">23</div>
            <p className="text-xs text-accent">+15% vs mês anterior</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Taxa de conversão</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">32%</div>
            <p className="text-xs text-muted-foreground">leads convertidos</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* New Leads */}
        <Card>
          <CardHeader>
            <CardTitle>Novos Leads</CardTitle>
            <CardDescription>Leads aguardando seu contato</CardDescription>
          </CardHeader>
          <CardContent>
            {newLeads.length > 0 ? (
              <div className="space-y-4">
                {newLeads.map((lead) => (
                  <div
                    key={lead.id}
                    className="flex items-center justify-between rounded-lg border border-border p-4"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">
                        {lead.interest.clientName}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {lead.interest.propertyType} - {lead.interest.location}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(lead.interest.minPrice)} - {formatCurrency(lead.interest.maxPrice)}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center rounded-full bg-accent/20 px-2 py-1 text-xs font-medium text-accent">
                        Novo
                      </span>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDate(lead.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" asChild className="w-full">
                  <Link href="/corretor/leads">
                    Ver todos os leads
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <Users className="h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">
                  Nenhum lead novo no momento
                </p>
                <p className="text-sm text-muted-foreground">
                  Novos leads aparecerão aqui assim que disponíveis
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Recent Conversations */}
        <Card>
          <CardHeader>
            <CardTitle>Conversas recentes</CardTitle>
            <CardDescription>Suas últimas interações com clientes</CardDescription>
          </CardHeader>
          <CardContent>
            {activeConversations.length > 0 ? (
              <div className="space-y-4">
                {activeConversations.map((conversation) => (
                  <Link
                    key={conversation.id}
                    href={`/corretor/chat/${conversation.id}`}
                    className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-accent/10">
                      <span className="text-sm font-medium text-accent">
                        {conversation.clientName.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-medium text-foreground">
                        {conversation.clientName}
                      </p>
                      <p className="truncate text-sm text-muted-foreground">
                        {conversation.messages[conversation.messages.length - 1]?.content}
                      </p>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {formatDate(conversation.updatedAt)}
                    </div>
                  </Link>
                ))}
                <Button variant="ghost" asChild className="w-full">
                  <Link href="/corretor/conversas">
                    Ver todas as conversas
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">
                  Nenhuma conversa ativa
                </p>
                <p className="text-sm text-muted-foreground">
                  Inicie uma conversa a partir de um lead
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
