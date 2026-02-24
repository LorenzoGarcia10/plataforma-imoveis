"use client"

import React, { useState, useRef } from "react"
import { useRouter } from "next/navigation"
import { Loader2, MapPin, Target, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import { formatBrlForInput, parseBrlFromInput } from "@/lib/currency"
import type { InterestFormState } from "@/lib/interest-form-mapper"

const compraOuAluguelOptions = [
  { value: "compra", label: "Compra" },
  { value: "aluguel", label: "Aluguel" },
]

const finalidadeOptions = [
  { value: "residencial", label: "Residencial" },
  { value: "comercial", label: "Comercial" },
]

const tipoImovelOptions = [
  { value: "terreno_via_publica", label: "Terreno em via pública" },
  { value: "terreno_condominio", label: "Terreno em condomínio" },
  { value: "casa_condominio", label: "Casa em condomínio" },
  { value: "casa_via_publica", label: "Casa em via pública" },
  { value: "galpao", label: "Galpão" },
  { value: "apartamento", label: "Apartamento" },
  { value: "sobrado", label: "Sobrado" },
  { value: "outro", label: "Outro" },
]

const tipoCasaOptions = [
  { value: "sobrado", label: "Sobrado" },
  { value: "terreo", label: "Térreo" },
]

const mobiliaOptions = [
  { value: "100_mobiliado", label: "100% mobiliado" },
  { value: "somente_planejados", label: "Somente planejados" },
  { value: "sem_mobilia", label: "Sem mobília" },
]

const opcionaisPorSecao: { titulo: string; opcoes: string[] }[] = [
  { titulo: "Características do Edifício", opcoes: ["Administração", "Ar Condicionado", "Perto da rodovia", "Perto de transporte público", "Reformado"] },
  { titulo: "Características Comerciais", opcoes: ["Sistema de alarme"] },
  { titulo: "Utilidades", opcoes: ["Academia", "Aquecimento", "Banheira", "Cabeamento estruturado", "Câmera de segurança", "Carregador eletrônico para carro e bicicleta", "Elevador", "Energia solar", "Lava-louças", "Pista de cooper", "Poço Artesiano", "Porta automática", "Registro de Água Individual", "Ronda/Vigilância", "Tanque de Água", "TV a Cabo"] },
  { titulo: "Recursos e Conveniências do Empreendimento", opcoes: ["Acesso à praia", "Área de lazer", "Coleta seletiva de lixo", "Condomínio inteligente", "Piscina semi-olímpica", "Quadra de futebol", "Quadra de tênis", "Recepção Edifício", "Segurança 24h", "Vigia"] },
  { titulo: "Localização", opcoes: ["Aberta", "Acessível com tráfego bom", "Acessível de Barco", "Área residencial", "Casa de Campo", "Centro da Cidade", "Com Vista para o Mar", "Em rua movimentada", "Em rua tranquila", "Espaço Verde / Parque", "Perto da estação ferroviária", "Perto da Igreja", "Perto das escolas", "Perto de Lojas", "Perto de ônibus", "Perto do Aeroporto", "Perto do hospital", "Perto do metrô", "Perto do parque", "Praça", "Remoto (distante)", "Rua asfaltada"] },
  { titulo: "Geral", opcoes: ["Aceita Financiamento", "Aceita Permuta", "Casa de Caseiro", "Condomínio sustentável", "Edícula", "Edifício Novo", "Escritório", "Fechadura digital", "Geminada", "Mais de um andar", "Piscina coletiva", "Serviço de lavanderia", "Zelador"] },
]

const tiposCasaRelevantes = ["casa_condominio", "casa_via_publica", "sobrado"]
const quantityButtons = [
  { value: "1", label: "+1" },
  { value: "2", label: "+2" },
  { value: "3", label: "+3" },
  { value: "4", label: "+4" },
]

const defaultFormState: InterestFormState = {
  localizacoes: [],
  compraOuAluguel: "",
  finalidade: "",
  tipoImovel: "",
  tipoCasa: "",
  quartos: "",
  suites: "",
  banheiros: "",
  garagens: "",
  metragemTerreno: "",
  areaConstruida: "",
  mobilia: "",
  valorMinimo: 0,
  valorMaximo: 0,
  caracteristicas: [],
  observacoes: "",
}

function QuantityRow({
  label,
  value,
  onChange,
}: {
  label: string
  value: string
  onChange: (v: string) => void
}) {
  return (
    <div className="space-y-2">
      <p className="text-sm font-medium text-foreground">{label}</p>
      <div className="flex gap-2">
        {quantityButtons.map((btn) => (
          <button
            key={btn.value}
            type="button"
            onClick={() => onChange(value === btn.value ? "" : btn.value)}
            className={cn(
              "flex-1 rounded-lg border px-3 py-2 text-sm font-medium transition-colors",
              value === btn.value
                ? "border-primary bg-primary text-primary-foreground"
                : "border-input bg-muted/50 text-muted-foreground hover:bg-muted"
            )}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  )
}

type Props = {
  initialData?: InterestFormState
  isEdit?: boolean
  onSubmit: (data: InterestFormState) => void
}

export function InterestForm({ initialData, isEdit, onSubmit }: Props) {
  const router = useRouter()
  const inputLocRef = useRef<HTMLInputElement>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [localizacaoInput, setLocalizacaoInput] = useState("")
  const [formData, setFormData] = useState<InterestFormState>(initialData ?? defaultFormState)

  const showTipoCasa =
    formData.tipoImovel && tiposCasaRelevantes.includes(formData.tipoImovel)

  const addLocalizacao = (text: string) => {
    const t = text.trim()
    if (!t || formData.localizacoes.includes(t)) return
    setFormData((prev) => ({
      ...prev,
      localizacoes: [...prev.localizacoes, t],
    }))
    setLocalizacaoInput("")
    inputLocRef.current?.focus()
  }

  const removeLocalizacao = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      localizacoes: prev.localizacoes.filter((_, i) => i !== index),
    }))
  }

  const handlePertoDeMim = () => {
    if (typeof navigator !== "undefined" && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        () => addLocalizacao("Perto de mim") as unknown as void,
        () => addLocalizacao("Perto de mim")
      )
    } else {
      addLocalizacao("Perto de mim")
    }
  }

  const handleCaracteristicaToggle = (item: string) => {
    setFormData((prev) => ({
      ...prev,
      caracteristicas: prev.caracteristicas.includes(item)
        ? prev.caracteristicas.filter((c) => c !== item)
        : [...prev.caracteristicas, item],
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 500))
    onSubmit(formData)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          {isEdit ? "Editar interesse em imóvel" : "Novo interesse em imóvel"}
        </CardTitle>
        <CardDescription>
          {isEdit
            ? "Altere os campos que desejar e salve."
            : "Preencha os campos obrigatórios e, se quiser, as opções específicas. Corretores especializados serão notificados."}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <Label className="text-base font-semibold">Localização</Label>
              <button
                type="button"
                onClick={handlePertoDeMim}
                className="flex items-center gap-1.5 text-sm font-medium text-destructive hover:underline"
              >
                <Target className="h-4 w-4" />
                Perto de mim
              </button>
            </div>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                ref={inputLocRef}
                placeholder="Digite bairro, rua ou cidade"
                value={localizacaoInput}
                onChange={(e) => setLocalizacaoInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addLocalizacao(localizacaoInput)
                  }
                }}
                className="h-11 rounded-lg bg-muted/50 pl-9"
              />
            </div>
            {formData.localizacoes.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {formData.localizacoes.map((loc, i) => (
                  <span
                    key={`${loc}-${i}`}
                    className="inline-flex items-center gap-1.5 rounded-full bg-destructive px-3 py-1 text-sm font-medium text-destructive-foreground"
                  >
                    {loc}
                    <button
                      type="button"
                      aria-label="Remover"
                      onClick={() => removeLocalizacao(i)}
                      className="rounded-full p-0.5 hover:bg-destructive-foreground/20"
                    >
                      <X className="h-3.5 w-3.5" />
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-sm">Compra ou aluguel</Label>
              <Select
                value={formData.compraOuAluguel}
                onValueChange={(v) => setFormData({ ...formData, compraOuAluguel: v })}
              >
                <SelectTrigger className="h-9 rounded-lg">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {compraOuAluguelOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Finalidade</Label>
              <Select
                value={formData.finalidade}
                onValueChange={(v) => setFormData({ ...formData, finalidade: v })}
              >
                <SelectTrigger className="h-9 rounded-lg">
                  <SelectValue placeholder="Residencial ou comercial" />
                </SelectTrigger>
                <SelectContent>
                  {finalidadeOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Tipo do imóvel</Label>
              <Select
                value={formData.tipoImovel}
                onValueChange={(v) => setFormData({ ...formData, tipoImovel: v, tipoCasa: "" })}
              >
                <SelectTrigger className="h-9 rounded-lg">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {tipoImovelOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Mobília</Label>
              <Select
                value={formData.mobilia}
                onValueChange={(v) => setFormData({ ...formData, mobilia: v })}
              >
                <SelectTrigger className="h-9 rounded-lg">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {mobiliaOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {showTipoCasa && (
            <div className="max-w-[200px] space-y-1.5">
              <Label className="text-sm">Sobrado ou térreo</Label>
              <Select
                value={formData.tipoCasa}
                onValueChange={(v) => setFormData({ ...formData, tipoCasa: v })}
              >
                <SelectTrigger className="h-9 rounded-lg">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  {tipoCasaOptions.map((o) => (
                    <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="space-y-3 border-t pt-4">
            <p className="text-sm font-medium text-foreground">Preço</p>
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">à partir de</Label>
                <Input
                  placeholder="R$ 0"
                  value={formatBrlForInput(formData.valorMinimo)}
                  onChange={(e) =>
                    setFormData({ ...formData, valorMinimo: parseBrlFromInput(e.target.value) })
                  }
                  className="h-10 rounded-lg bg-muted/50"
                />
              </div>
              <div className="space-y-1.5">
                <Label className="text-xs text-muted-foreground">Até</Label>
                <Input
                  placeholder="R$ 0"
                  value={formatBrlForInput(formData.valorMaximo)}
                  onChange={(e) =>
                    setFormData({ ...formData, valorMaximo: parseBrlFromInput(e.target.value) })
                  }
                  className="h-10 rounded-lg bg-muted/50"
                />
              </div>
            </div>
          </div>

          <div className="space-y-4 border-t pt-4">
            <QuantityRow
              label="Quantidade de quartos"
              value={formData.quartos}
              onChange={(v) => setFormData({ ...formData, quartos: v })}
            />
            <QuantityRow
              label="Suítes"
              value={formData.suites}
              onChange={(v) => setFormData({ ...formData, suites: v })}
            />
            <QuantityRow
              label="Banheiros"
              value={formData.banheiros}
              onChange={(v) => setFormData({ ...formData, banheiros: v })}
            />
            <QuantityRow
              label="Garagens"
              value={formData.garagens}
              onChange={(v) => setFormData({ ...formData, garagens: v })}
            />
          </div>

          <div className="grid gap-4 border-t pt-4 sm:grid-cols-2">
            <div className="space-y-1.5">
              <Label className="text-sm">Metragem do terreno (m²)</Label>
              <Input
                type="number"
                min={0}
                placeholder="Ex: 300"
                value={formData.metragemTerreno}
                onChange={(e) =>
                  setFormData({ ...formData, metragemTerreno: e.target.value })
                }
                className="h-9 rounded-lg"
              />
            </div>
            <div className="space-y-1.5">
              <Label className="text-sm">Área construída (m²)</Label>
              <Input
                type="number"
                min={0}
                placeholder="Ex: 150"
                value={formData.areaConstruida}
                onChange={(e) =>
                  setFormData({ ...formData, areaConstruida: e.target.value })
                }
                className="h-9 rounded-lg"
              />
            </div>
          </div>

          <div className="space-y-4 rounded-lg border border-dashed bg-muted/20 p-4">
            <p className="text-sm font-medium text-muted-foreground">
              Características desejadas (opcional)
            </p>
            {opcionaisPorSecao.map((sec) => (
              <div key={sec.titulo} className="space-y-2">
                <p className="text-sm font-medium text-foreground">{sec.titulo}</p>
                <div className="grid grid-cols-2 gap-x-4 gap-y-1.5 sm:grid-cols-3">
                  {sec.opcoes.map((item) => (
                    <div key={item} className="flex items-center space-x-2">
                      <Checkbox
                        id={`${sec.titulo}-${item}`}
                        checked={formData.caracteristicas.includes(item)}
                        onCheckedChange={() => handleCaracteristicaToggle(item)}
                      />
                      <label
                        htmlFor={`${sec.titulo}-${item}`}
                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        {item}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="observacoes" className="text-sm">
              Informações adicionais (opcional)
            </Label>
            <Textarea
              id="observacoes"
              placeholder="Alguma informação que não foi contemplada nos campos acima..."
              value={formData.observacoes}
              onChange={(e) =>
                setFormData({ ...formData, observacoes: e.target.value })
              }
              rows={3}
              className="rounded-lg"
            />
          </div>

          <div className="flex gap-3 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.back()}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isLoading} className="flex-1">
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isEdit ? "Salvar alterações" : "Enviar interesse"}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
