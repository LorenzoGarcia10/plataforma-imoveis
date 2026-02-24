"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Trash2, Edit, MoreVertical, Eye } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
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
import { useInterests } from "@/lib/contexts/interests-context"
import { formatCurrency, formatDate, type PropertyInterest } from "@/lib/mock-data"
import {
  getCompraOuAluguelLabel,
  getFinalidadeLabel,
  getTipoImovelLabel,
  getTipoCasaLabel,
  getMobiliaLabel,
} from "@/lib/interest-labels"

export default function ClientInterestsPage() {
  const { interests, setInterests } = useInterests()
  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [detailInterest, setDetailInterest] = useState<PropertyInterest | null>(null)

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
                    {getTipoImovelLabel(interest.tipoImovel)}
                  </CardTitle>
                  <CardDescription>
                    {interest.locations.join(", ")}
                  </CardDescription>
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
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Compra ou aluguel:</span>
                    <span className="font-medium text-foreground">{getCompraOuAluguelLabel(interest.compraOuAluguel)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Finalidade:</span>
                    <span className="font-medium text-foreground">{getFinalidadeLabel(interest.finalidade)}</span>
                  </div>
                  {interest.tipoCasa && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sobrado ou térreo:</span>
                      <span className="font-medium text-foreground">{getTipoCasaLabel(interest.tipoCasa)}</span>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Quartos / Suítes:</span>
                    <span className="font-medium text-foreground">{interest.quartos} / {interest.suites}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Terreno / Área const.:</span>
                    <span className="font-medium text-foreground">{interest.metragemTerreno}m² / {interest.areaConstruida}m²</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Mobília:</span>
                    <span className="font-medium text-foreground">{getMobiliaLabel(interest.mobilia)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Valor:</span>
                    <span className="font-medium text-foreground">
                      {formatCurrency(interest.minPrice)} - {formatCurrency(interest.maxPrice)}
                    </span>
                  </div>
                  <div className="border-t border-border pt-3 text-xs text-muted-foreground">
                    Criado em {formatDate(interest.createdAt)}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full"
                    onClick={() => setDetailInterest(interest)}
                  >
                    <Eye className="mr-2 h-4 w-4" />
                    Ver detalhes
                  </Button>
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

      <Dialog open={!!detailInterest} onOpenChange={() => setDetailInterest(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Detalhes do interesse</DialogTitle>
            <DialogDescription>
              Informações obrigatórias e opcionais selecionadas
            </DialogDescription>
          </DialogHeader>
          {detailInterest && (
            <div className="space-y-4">
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-foreground">Informações obrigatórias</h4>
                <div className="grid gap-2 text-sm">
                  <div>
                    <span className="text-muted-foreground">Localização:</span>{" "}
                    <span className="text-foreground">{detailInterest.locations.join(", ")}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Compra ou aluguel:</span>{" "}
                    <span className="text-foreground">{getCompraOuAluguelLabel(detailInterest.compraOuAluguel)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Finalidade:</span>{" "}
                    <span className="text-foreground">{getFinalidadeLabel(detailInterest.finalidade)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Tipo do imóvel:</span>{" "}
                    <span className="text-foreground">{getTipoImovelLabel(detailInterest.tipoImovel)}</span>
                  </div>
                  {detailInterest.tipoCasa && (
                    <div>
                      <span className="text-muted-foreground">Sobrado ou térreo:</span>{" "}
                      <span className="text-foreground">{getTipoCasaLabel(detailInterest.tipoCasa)}</span>
                    </div>
                  )}
                  <div>
                    <span className="text-muted-foreground">Quartos / Suítes:</span>{" "}
                    <span className="text-foreground">{detailInterest.quartos} / {detailInterest.suites}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Metragem terreno / Área construída:</span>{" "}
                    <span className="text-foreground">{detailInterest.metragemTerreno}m² / {detailInterest.areaConstruida}m²</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Mobília:</span>{" "}
                    <span className="text-foreground">{getMobiliaLabel(detailInterest.mobilia)}</span>
                  </div>
                  <div>
                    <span className="text-muted-foreground">Valor:</span>{" "}
                    <span className="text-foreground">
                      {formatCurrency(detailInterest.minPrice)} - {formatCurrency(detailInterest.maxPrice)}
                    </span>
                  </div>
                </div>
              </div>
              {detailInterest.features.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Características desejadas (opcional)</h4>
                  <div className="flex flex-wrap gap-1">
                    {detailInterest.features.map((feature, idx) => (
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
              {detailInterest.notes && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium text-foreground">Observações (opcional)</h4>
                  <p className="text-sm text-muted-foreground">{detailInterest.notes}</p>
                </div>
              )}
              <p className="text-xs text-muted-foreground">
                Criado em {formatDate(detailInterest.createdAt)}
              </p>
            </div>
          )}
        </DialogContent>
      </Dialog>

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
