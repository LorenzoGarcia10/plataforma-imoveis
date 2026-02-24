export function formatBrlForInput(value: number): string {
  if (value === 0) return ""
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value)
}

export function parseBrlFromInput(str: string): number {
  const digits = str.replace(/\D/g, "")
  const n = parseInt(digits, 10)
  return isNaN(n) ? 0 : n
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value)
}
