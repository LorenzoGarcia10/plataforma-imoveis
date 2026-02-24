import type { PropertyInterest } from "@/lib/mock-data"

export function createNewInterest(
  state: InterestFormState,
  overrides: {
    id: string
    clientId: string
    clientName: string
    clientPhone: string
    clientEmail: string
  }
): PropertyInterest {
  return {
    ...overrides,
    locations: state.localizacoes,
    compraOuAluguel: state.compraOuAluguel,
    finalidade: state.finalidade,
    tipoImovel: state.tipoImovel,
    tipoCasa: state.tipoCasa,
    quartos: state.quartos,
    suites: state.suites,
    metragemTerreno: state.metragemTerreno,
    areaConstruida: state.areaConstruida,
    mobilia: state.mobilia,
    minPrice: state.valorMinimo,
    maxPrice: state.valorMaximo,
    features: state.caracteristicas,
    notes: state.observacoes,
    createdAt: new Date(),
    isActive: true,
  }
}

export type InterestFormState = {
  localizacoes: string[]
  compraOuAluguel: string
  finalidade: string
  tipoImovel: string
  tipoCasa: string
  quartos: string
  suites: string
  banheiros: string
  garagens: string
  metragemTerreno: string
  areaConstruida: string
  mobilia: string
  valorMinimo: number
  valorMaximo: number
  caracteristicas: string[]
  observacoes: string
}

export function interestToFormState(interest: PropertyInterest): InterestFormState {
  return {
    localizacoes: [...interest.locations],
    compraOuAluguel: interest.compraOuAluguel,
    finalidade: interest.finalidade,
    tipoImovel: interest.tipoImovel,
    tipoCasa: interest.tipoCasa ?? "",
    quartos: interest.quartos,
    suites: interest.suites,
    banheiros: "",
    garagens: "",
    metragemTerreno: interest.metragemTerreno,
    areaConstruida: interest.areaConstruida,
    mobilia: interest.mobilia,
    valorMinimo: interest.minPrice,
    valorMaximo: interest.maxPrice,
    caracteristicas: [...interest.features],
    observacoes: interest.notes ?? "",
  }
}

export function formStateToInterest(
  state: InterestFormState,
  existing: PropertyInterest
): PropertyInterest {
  return {
    ...existing,
    locations: state.localizacoes,
    compraOuAluguel: state.compraOuAluguel,
    finalidade: state.finalidade,
    tipoImovel: state.tipoImovel,
    tipoCasa: state.tipoCasa,
    quartos: state.quartos,
    suites: state.suites,
    metragemTerreno: state.metragemTerreno,
    areaConstruida: state.areaConstruida,
    mobilia: state.mobilia,
    minPrice: state.valorMinimo,
    maxPrice: state.valorMaximo,
    features: state.caracteristicas,
    notes: state.observacoes,
  }
}
