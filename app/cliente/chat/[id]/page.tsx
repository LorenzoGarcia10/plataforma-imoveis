"use client"

import { useParams, useRouter } from "next/navigation"
import { ChatInterface } from "@/components/chat/chat-interface"
import { useAuth } from "@/lib/auth-context"
import { mockConversations } from "@/lib/mock-data"

export default function ClientChatPage() {
  const params = useParams()
  const router = useRouter()
  const { user } = useAuth()

  const conversationId = params.id as string
  const conversation = mockConversations.find((c) => c.id === conversationId)

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
      currentUserId={user?.id || "1"}
      currentUserType="client"
      onBack={() => router.push("/cliente/conversas")}
    />
  )
}
