"use client"

import { useParams, useRouter } from "next/navigation"
import { ChatInterface } from "@/components/chat/chat-interface"
import { useAuth } from "@/lib/auth-context"
import { mockConversations } from "@/lib/mock-data"

export default function BrokerChatPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()

  const conversationId = params.id as string
  
  // Find existing conversation or create a mock one for new lead conversations
  let conversation = mockConversations.find((c) => c.id === conversationId)

  // If conversation starts with "conv-lead-", it's a new conversation from a lead
  if (!conversation && conversationId.startsWith("conv-lead-")) {
    conversation = {
      id: conversationId,
      clientId: "1",
      clientName: "Maria Silva",
      brokerId: user?.id || "2",
      brokerName: user?.name || "Corretor",
      leadId: conversationId.replace("conv-", ""),
      propertyInterest: "Apartamento - São Paulo Zona Sul",
      messages: [],
      updatedAt: new Date(),
    }
  }

  if (!conversation) {
    return (
      <div className="flex h-[calc(100vh-8rem)] items-center justify-center">
        <p className="text-muted-foreground">Conversa não encontrada</p>
      </div>
    )
  }

  return (
    <ChatInterface
      conversation={conversation}
      currentUserId={user?.id || "2"}
      currentUserType="broker"
      onBack={() => router.push("/corretor/conversas")}
    />
  )
}
