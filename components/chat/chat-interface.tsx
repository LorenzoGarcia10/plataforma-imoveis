"use client"

import React from "react"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { Send, ImagePlus, ArrowLeft, MoreVertical, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { type Conversation, type Message, formatDateTime } from "@/lib/mock-data"

interface ChatInterfaceProps {
  conversation: Conversation
  currentUserId: string
  currentUserType: "client" | "broker"
  onBack: () => void
  leadId?: string
}

export function ChatInterface({
  conversation,
  currentUserId,
  currentUserType,
  onBack,
  leadId,
}: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>(conversation.messages)
  const [newMessage, setNewMessage] = useState("")
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [previewImage, setPreviewImage] = useState<string | null>(null)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const otherUserName =
    currentUserType === "client" ? conversation.brokerName : conversation.clientName

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newMessage.trim() && !selectedImage) return

    const message: Message = {
      id: `msg-${Date.now()}`,
      senderId: currentUserId,
      senderType: currentUserType,
      content: newMessage,
      imageUrl: selectedImage || undefined,
      createdAt: new Date(),
    }

    setMessages([...messages, message])
    setNewMessage("")
    setSelectedImage(null)
  }

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelectedImage(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="flex h-[calc(100vh-8rem)] flex-col rounded-lg border border-border bg-card">
      {/* Chat Header */}
      <div className="flex items-center justify-between border-b border-border px-4 py-3">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm" onClick={onBack} className="lg:hidden">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
            <span className="text-sm font-medium text-primary">
              {otherUserName.charAt(0)}
            </span>
          </div>
          <div>
            <h2 className="font-semibold text-foreground">{otherUserName}</h2>
            <p className="text-xs text-muted-foreground">
              {conversation.propertyInterest}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreVertical className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              {currentUserType === "broker" && leadId && (
                <DropdownMenuItem asChild>
                  <Link href="/corretor/leads">Ver detalhes do lead</Link>
                </DropdownMenuItem>
              )}
              <DropdownMenuItem className="text-destructive">
                Encerrar conversa
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((message) => {
            const isFromBroker = message.senderType === "broker"
            return (
              <div
                key={message.id}
                className={`flex ${isFromBroker ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] rounded-2xl px-4 py-2 ${
                    isFromBroker
                      ? "bg-accent text-accent-foreground"
                      : "bg-muted text-foreground"
                  }`}
                >
                  {message.imageUrl && (
                    <button
                      type="button"
                      onClick={() => setPreviewImage(message.imageUrl!)}
                      className="mb-2 block"
                    >
                      <img
                        src={message.imageUrl || "/placeholder.svg"}
                        alt="Imagem anexada"
                        className="max-h-48 rounded-lg"
                      />
                    </button>
                  )}
                  {message.content && (
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  )}
                  <p
                    className={`mt-1 text-xs ${
                      isFromBroker ? "text-accent-foreground/70" : "text-muted-foreground"
                    }`}
                  >
                    {formatDateTime(message.createdAt)}
                  </p>
                </div>
              </div>
            )
          })}
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Selected Image Preview */}
      {selectedImage && (
        <div className="border-t border-border px-4 py-2">
          <div className="relative inline-block">
            <img
              src={selectedImage || "/placeholder.svg"}
              alt="Imagem selecionada"
              className="h-20 rounded-lg"
            />
            <button
              type="button"
              onClick={() => setSelectedImage(null)}
              className="absolute -right-2 -top-2 rounded-full bg-destructive p-1 text-destructive-foreground"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      {/* Message Input */}
      <form
        onSubmit={handleSendMessage}
        className="flex items-center gap-2 border-t border-border p-4"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageSelect}
          className="hidden"
        />
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={() => fileInputRef.current?.click()}
        >
          <ImagePlus className="h-5 w-5 text-muted-foreground" />
        </Button>
        <Input
          placeholder="Digite sua mensagem..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1"
        />
        <Button
          type="submit"
          size="sm"
          disabled={!newMessage.trim() && !selectedImage}
        >
          <Send className="h-4 w-4" />
        </Button>
      </form>

      {/* Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4"
          onClick={() => setPreviewImage(null)}
        >
          <button
            type="button"
            className="absolute right-4 top-4 rounded-full bg-white/20 p-2 text-white hover:bg-white/30"
            onClick={() => setPreviewImage(null)}
          >
            <X className="h-6 w-6" />
          </button>
          <img
            src={previewImage || "/placeholder.svg"}
            alt="Preview"
            className="max-h-[90vh] max-w-[90vw] rounded-lg"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  )
}
