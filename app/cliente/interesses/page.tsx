"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Trash2, Edit, MoreVertical } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { mockPropertyInterests, formatCurrency, formatDate, type PropertyInterest } from "@/lib/mock-data"

export default function ClientInterestsPage() {
  const [interests, setInterests] = useState<PropertyInterest[]>(mockPropertyInterests)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const handleDelete = (id: string) => {
    setInterests(interests.filter((i) => i.id !== id))
    setDeleteId(null)
  }

  const toggleActive = (id: string) => {
    setInterests(
      interests.map((i) =>
        i.id === id ? { ...i, isActive: !i.isActive } : i
      )
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Meus Interesses</h1>
          <p className="text-muted-foreground">
            Gerencie seus formulários de interesse em imóveis
          </p>
        </div>
        <Button asChild>
          <Link href="/cliente/interesses/novo">
            <Plus className="mr-2 h-4 w-4" />
            Novo interesse
          </Link>
        </Button>
      </div>

      {interests.length > 0 ? (
        <div className="grid gap-4 md:grid-cols-2">
          {interests.map((interest) => (
            <Card key={interest.id}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-lg">
                    {interest.propertyType}
                  </CardTitle>
                  <CardDescription>{interest.location}</CardDescription>
                </div>
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${
                      interest.isActive
                        ? "bg-accent/20 text-accent"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {interest.isActive ? "Ativo" : "Inativo"}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                        <span className="sr-only">Abrir menu</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem asChild>
                        <Link href={`/cliente/interesses/${interest.id}/editar`}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => toggleActive(interest.id)}>
                        {interest.isActive ? "Desativar" : "Ativar"}
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => setDeleteId(interest.id)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remover
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Faixa de preço:</span>
                    <span className="font-medium text-foreground">
                      {formatCurrency(interest.minPrice)} - {formatCurrency(interest.maxPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Quartos:</span>
                    <span className="font-medium text-foreground">{interest.bedrooms}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Banheiros:</span>
                    <span className="font-medium text-foreground">{interest.bathrooms}</span>
                  </div>
                  {interest.features.length > 0 && (
                    <div className="flex flex-wrap gap-1 pt-2">
                      {interest.features.map((feature, index) => (
                        <span
                          key={index}
                          className="inline-flex rounded-full bg-secondary px-2 py-1 text-xs text-secondary-foreground"
                        >
                          {feature}
                        </span>
                      ))}
                    </div>
                  )}
                  {interest.notes && (
                    <p className="border-t border-border pt-3 text-sm text-muted-foreground">
                      {interest.notes}
                    </p>
                  )}
                  <div className="border-t border-border pt-3 text-xs text-muted-foreground">
                    Criado em {formatDate(interest.createdAt)}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <p className="text-muted-foreground">
              Você ainda não tem interesses cadastrados
            </p>
            <Button asChild className="mt-4">
              <Link href="/cliente/interesses/novo">
                <Plus className="mr-2 h-4 w-4" />
                Cadastrar interesse
              </Link>
            </Button>
          </CardContent>
        </Card>
      )}

      <AlertDialog open={!!deleteId} onOpenChange={() => setDeleteId(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remover interesse?</AlertDialogTitle>
            <AlertDialogDescription>
              Esta ação não pode ser desfeita. O formulário de interesse será
              permanentemente removido e os corretores não poderão mais visualizá-lo.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => deleteId && handleDelete(deleteId)}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Remover
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
