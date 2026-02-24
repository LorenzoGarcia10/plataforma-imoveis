const compraOuAluguel: Record<string, string> = {
  compra: "Compra",
  aluguel: "Aluguel",
}

const finalidade: Record<string, string> = {
  residencial: "Residencial",
  comercial: "Comercial",
}

const tipoImovel: Record<string, string> = {
  terreno_via_publica: "Terreno em via pública",
  terreno_condominio: "Terreno em condomínio",
  casa_condominio: "Casa em condomínio",
  casa_via_publica: "Casa em via pública",
  galpao: "Galpão",
  apartamento: "Apartamento",
  sobrado: "Sobrado",
  outro: "Outro",
}

const tipoCasa: Record<string, string> = {
  sobrado: "Sobrado",
  terreo: "Térreo",
}

const mobilia: Record<string, string> = {
  "100_mobiliado": "100% mobiliado",
  somente_planejados: "Somente planejados",
  sem_mobilia: "Sem mobília",
}

export function getCompraOuAluguelLabel(value: string) {
  return compraOuAluguel[value] ?? value
}

export function getFinalidadeLabel(value: string) {
  return finalidade[value] ?? value
}

export function getTipoImovelLabel(value: string) {
  return tipoImovel[value] ?? value
}

export function getTipoCasaLabel(value: string) {
  return tipoCasa[value] ?? value
}

export function getMobiliaLabel(value: string) {
  return mobilia[value] ?? value
}
