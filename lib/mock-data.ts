export interface PropertyInterest {
  id: string
  clientId: string
  clientName: string
  clientPhone: string
  clientEmail: string
  propertyType: string
  location: string
  minPrice: number
  maxPrice: number
  bedrooms: number
  bathrooms: number
  features: string[]
  notes: string
  createdAt: Date
  isActive: boolean
}

export interface Lead {
  id: string
  interest: PropertyInterest
  brokerId?: string
  status: "new" | "contacted" | "in_progress" | "closed"
  createdAt: Date
}

export interface Message {
  id: string
  senderId: string
  senderType: "client" | "broker"
  content: string
  imageUrl?: string
  createdAt: Date
}

export interface Conversation {
  id: string
  clientId: string
  clientName: string
  clientAvatar?: string
  brokerId: string
  brokerName: string
  brokerAvatar?: string
  leadId: string
  propertyInterest: string
  messages: Message[]
  lastMessage?: Message
  updatedAt: Date
}

export interface Broker {
  id: string
  name: string
  email: string
  phone: string
  creci: string
  avatar?: string
  specialties: string[]
  rating: number
  totalLeads: number
}

// Mock Property Interests
export const mockPropertyInterests: PropertyInterest[] = [
  {
    id: "pi-1",
    clientId: "1",
    clientName: "Maria Silva",
    clientPhone: "(11) 99999-9999",
    clientEmail: "maria@email.com",
    propertyType: "Apartamento",
    location: "São Paulo - Zona Sul",
    minPrice: 300000,
    maxPrice: 500000,
    bedrooms: 2,
    bathrooms: 1,
    features: ["Varanda", "Vaga de garagem", "Piscina"],
    notes: "Preferência por condomínio com área de lazer completa",
    createdAt: new Date("2026-01-15"),
    isActive: true,
  },
  {
    id: "pi-2",
    clientId: "1",
    clientName: "Maria Silva",
    clientPhone: "(11) 99999-9999",
    clientEmail: "maria@email.com",
    propertyType: "Casa",
    location: "Santo André",
    minPrice: 450000,
    maxPrice: 700000,
    bedrooms: 3,
    bathrooms: 2,
    features: ["Quintal", "Churrasqueira", "Suite"],
    notes: "Aceito imóvel na planta",
    createdAt: new Date("2026-01-20"),
    isActive: true,
  },
]

// Mock Leads
export const mockLeads: Lead[] = [
  {
    id: "lead-1",
    interest: mockPropertyInterests[0],
    status: "new",
    createdAt: new Date("2026-01-15"),
  },
  {
    id: "lead-2",
    interest: mockPropertyInterests[1],
    brokerId: "2",
    status: "in_progress",
    createdAt: new Date("2026-01-20"),
  },
]

// Mock Conversations
export const mockConversations: Conversation[] = [
  {
    id: "conv-1",
    clientId: "1",
    clientName: "Maria Silva",
    brokerId: "2",
    brokerName: "João Corretor",
    leadId: "lead-2",
    propertyInterest: "Casa em Santo André - R$ 450k a R$ 700k",
    messages: [
      {
        id: "msg-1",
        senderId: "2",
        senderType: "broker",
        content: "Olá Maria! Vi que você está procurando uma casa em Santo André. Tenho algumas opções excelentes para você!",
        createdAt: new Date("2026-01-20T10:00:00"),
      },
      {
        id: "msg-2",
        senderId: "1",
        senderType: "client",
        content: "Oi João! Que ótimo, estou bem interessada. Pode me contar mais sobre as opções?",
        createdAt: new Date("2026-01-20T10:05:00"),
      },
      {
        id: "msg-3",
        senderId: "2",
        senderType: "broker",
        content: "Claro! Tenho uma casa de 3 quartos, sendo 1 suíte, com quintal e churrasqueira no bairro Jardim. O valor é R$ 580.000. Posso agendar uma visita?",
        createdAt: new Date("2026-01-20T10:10:00"),
      },
      {
        id: "msg-4",
        senderId: "1",
        senderType: "client",
        content: "Parece ótimo! Pode ser sábado pela manhã?",
        createdAt: new Date("2026-01-20T10:15:00"),
      },
    ],
    updatedAt: new Date("2026-01-20T10:15:00"),
  },
]

// Mock Brokers
export const mockBrokers: Broker[] = [
  {
    id: "2",
    name: "João Corretor",
    email: "joao@corretor.com",
    phone: "(11) 98888-8888",
    creci: "12345-SP",
    specialties: ["Apartamentos", "Casas", "Imóveis de luxo"],
    rating: 4.8,
    totalLeads: 156,
  },
  {
    id: "3",
    name: "Ana Imóveis",
    email: "ana@imobiliaria.com",
    phone: "(11) 97777-7777",
    creci: "54321-SP",
    specialties: ["Comercial", "Terrenos", "Lançamentos"],
    rating: 4.9,
    totalLeads: 203,
  },
]

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}

export function formatDate(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }).format(date)
}

export function formatDateTime(date: Date): string {
  return new Intl.DateTimeFormat("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }).format(date)
}
