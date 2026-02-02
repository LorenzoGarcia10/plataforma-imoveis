"use client"

import Link from "next/link"
import { MessageCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockConversations, formatDate } from "@/lib/mock-data"

export default function ClientConversationsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Minhas Conversas</h1>
        <p className="text-muted-foreground">
          Histórico de conversas com corretores
        </p>
      </div>

      {mockConversations.length > 0 ? (
        <div className="space-y-4">
          {mockConversations.map((conversation) => {
            const lastMessage = conversation.messages[conversation.messages.length - 1]
            return (
              <Link
                key={conversation.id}
                href={`/cliente/chat/${conversation.id}`}
              >
                <Card className="transition-colors hover:bg-muted/50">
                  <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                      <span className="text-lg font-medium text-primary">
                        {conversation.brokerName.charAt(0)}
                      </span>
                    </div>
                    <div className="flex-1">
                      <CardTitle className="text-base">
                        {conversation.brokerName}
                      </CardTitle>
                      <CardDescription>
                        {conversation.propertyInterest}
                      </CardDescription>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-muted-foreground">
                        {formatDate(conversation.updatedAt)}
                      </p>
                      <span className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
                        {conversation.messages.length}
                      </span>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="truncate text-sm text-muted-foreground">
                      {lastMessage?.senderType === "client" ? "Você: " : ""}
                      {lastMessage?.content}
                    </p>
                  </CardContent>
                </Card>
              </Link>
            )
          })}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <MessageCircle className="h-12 w-12 text-muted-foreground/50" />
            <p className="mt-4 text-muted-foreground">
              Nenhuma conversa iniciada ainda
            </p>
            <p className="text-sm text-muted-foreground">
              Cadastre um interesse para receber contatos de corretores
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
