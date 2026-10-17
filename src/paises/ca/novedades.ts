import type { Novedad } from "@/motor/tipos";

const T4127_JUL = {
  organismo: "Canada Revenue Agency",
  titulo: "T4127 Payroll Deductions Formulas, 123rd edition (July 1, 2026)",
  url: "https://www.canada.ca/en/revenue-agency/services/forms-publications/payroll/t4127-payroll-deductions-formulas/t4127-jul/t4127-jul-payroll-deductions-formulas.html",
  tipo: "primaria",
  verificadoEl: "2026-10-14",
} as const;

export const novedades: readonly Novedad[] = [
  {
    id: "ca.minimum-wage-october-2026",
    fecha: "2026-10-14",
    titulo: "Minimum wage went up on October 1 in five provinces",
    texto: "Manitoba, Nova Scotia, Ontario, Prince Edward Island and Saskatchewan raised their general minimum wage on October 1, 2026. The minimum wage calculator already uses the new rates.",
    vigenteDesde: "2026-10-01",
    calculadoras: ["ca.minimum-wage"],
    fuente: {
      organismo: "Employment and Social Development Canada (Labour Program)",
      titulo: "Current and Forthcoming General Minimum Wage Rates in Canada",
      url: "https://minwage-salairemin.service.canada.ca/en/general.html",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "ca.ccb-july-2026",
    fecha: "2026-10-14",
    titulo: "New Canada child benefit amounts from July 2026",
    texto: "For July 2026 to June 2027 the CCB is based on your 2025 family income, with new maximums and income thresholds.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["ca.canada-child-benefit"],
    fuente: {
      organismo: "Canada Revenue Agency",
      titulo: "Canada child benefit: how much you can get",
      url: "https://www.canada.ca/en/revenue-agency/services/child-family-benefits/canada-child-benefit/how-much.html",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "ca.bc-lowest-rate-2026",
    fecha: "2026-10-14",
    titulo: "BC raised its lowest income tax rate to 5.6% for 2026",
    texto: "British Columbia increased its lowest personal income tax rate from 5.06% to 5.60% and the BC tax reduction to $690, both for the whole 2026 tax year.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ca.income-tax-calculator", "ca.take-home-pay", "ca.capital-gains-tax"],
    fuente: T4127_JUL,
  },
  {
    id: "ca.pe-new-bracket-2026",
    fecha: "2026-10-14",
    titulo: "Prince Edward Island adds a 20% bracket above $200,000",
    texto: "From the 2026 tax year, PEI taxes income above $200,000 at 20%.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ca.income-tax-calculator", "ca.take-home-pay", "ca.capital-gains-tax"],
    fuente: T4127_JUL,
  },
  {
    id: "ca.nl-bpa-2026",
    fecha: "2026-10-14",
    titulo: "Newfoundland and Labrador raises its basic personal amount",
    texto: "The Newfoundland and Labrador basic personal amount goes from $11,188 to $13,094 for the 2026 tax year.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ca.income-tax-calculator", "ca.take-home-pay", "ca.capital-gains-tax"],
    fuente: T4127_JUL,
  },
];
