"use client"

import Link from "next/link"
import { FileText, MessageCircle, Plus, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockPropertyInterests, mockConversations, formatCurrency, formatDate } from "@/lib/mock-data"
import { getTipoImovelLabel } from "@/lib/interest-labels"

export default function ClientDashboardPage() {
  const activeInterests = mockPropertyInterests.filter((i) => i.isActive)
  const recentConversations = mockConversations.slice(0, 3)

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Acompanhe suas buscas por imóveis</p>
        </div>
        <Button asChild>
          <Link href="/cliente/interesses/novo">
            <Plus className="mr-2 h-4 w-4" />
            Novo interesse
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Interesses ativos</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{activeInterests.length}</div>
            <p className="text-xs text-muted-foreground">
              formulários submetidos
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversas ativas</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentConversations.length}</div>
            <p className="text-xs text-muted-foreground">
              com corretores
            </p>
          </CardContent>
        </Card>
        <Card className="sm:col-span-2 lg:col-span-1">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Respostas recebidas</CardTitle>
            <MessageCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              de corretores interessados
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Meus interesses recentes</CardTitle>
            <CardDescription>Formulários de interesse submetidos</CardDescription>
          </CardHeader>
          <CardContent>
            {activeInterests.length > 0 ? (
              <div className="space-y-4">
                {activeInterests.map((interest) => (
                  <div
                    key={interest.id}
                    className="flex items-center justify-between rounded-lg border border-border p-4"
                  >
                    <div className="space-y-1">
                      <p className="font-medium text-foreground">
                        {getTipoImovelLabel(interest.tipoImovel)} - {interest.locations.join(", ")}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {formatCurrency(interest.minPrice)} - {formatCurrency(interest.maxPrice)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {interest.quartos} quartos • {interest.suites} suítes
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center rounded-full bg-accent/20 px-2 py-1 text-xs font-medium text-accent">
                        Ativo
                      </span>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {formatDate(interest.createdAt)}
                      </p>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" asChild className="w-full">
                  <Link href="/cliente/interesses">
                    Ver todos
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <FileText className="h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">
                  Você ainda não tem interesses cadastrados
                </p>
                <Button asChild className="mt-4">
                  <Link href="/cliente/interesses/novo">
                    <Plus className="mr-2 h-4 w-4" />
                    Cadastrar interesse
                  </Link>
                </Button>
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conversas recentes</CardTitle>
            <CardDescription>Suas últimas conversas com corretores</CardDescription>
          </CardHeader>
          <CardContent>
            {recentConversations.length > 0 ? (
              <div className="space-y-4">
                {recentConversations.map((conversation) => (
                  <Link
                    key={conversation.id}
                    href={`/cliente/chat/${conversation.id}`}
                    className="flex items-center gap-4 rounded-lg border border-border p-4 transition-colors hover:bg-muted/50"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-sm font-medium text-primary">
                        {conversation.brokerName.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1 overflow-hidden">
                      <p className="font-medium text-foreground">
                        {conversation.brokerName}
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
                  <Link href="/cliente/conversas">
                    Ver todas
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <MessageCircle className="h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">
                  Nenhuma conversa iniciada ainda
                </p>
                <p className="text-sm text-muted-foreground">
                  Cadastre um interesse para receber contatos de corretores
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
