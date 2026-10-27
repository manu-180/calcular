import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "lk.minimum-wage-january-2026",
    fecha: "2026-10-26",
    titulo: "National minimum wage up to Rs. 30,000 from January 2026",
    texto:
      "Under the National Minimum Wage of Workers (Amendment) Act, No. 11 of 2025, the national minimum monthly wage is Rs. 30,000 and the daily wage Rs. 1,200 from 1 January 2026. Our minimum wage calculator already uses the new figures.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["lk.minimum-wage"],
    fuente: {
      organismo: "Department of Labour",
      titulo: "Notice on the National Minimum Wage of Workers (Amendment) Act, No. 11 of 2025",
      url: "https://labourdept.gov.lk/wp-content/uploads/2025/07/minimum-wages-ammend-2025-july.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-26",
    },
  },
  {
    id: "lk.cgt-15-percent-2026",
    fecha: "2026-10-26",
    titulo: "Capital gains tax for individuals rises to 15%",
    texto:
      "The Inland Revenue (Amendment) Act, No. 11 of 2026 raises the tax on gains from the realisation of investment assets by individuals from 10% to 15%. It applies from 3 June 2026, the date the Act was certified. Our capital gains tax calculator uses the rate for the date you choose.",
    vigenteDesde: "2026-06-03",
    calculadoras: ["lk.capital-gains-tax-calculator"],
    fuente: {
      organismo: "Inland Revenue Department",
      titulo: "Inland Revenue (Amendment) Act, No. 11 of 2026",
      url: "https://www.ird.gov.lk/en/publications/Acts_Income%20Tax_2017/IR_Act_No_11-2026_E.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-26",
    },
  },
];
