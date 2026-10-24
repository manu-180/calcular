import type { Novedad } from "@/motor/tipos";

const GRA_ACT_1178 = {
  organismo: "GRA",
  titulo: "Amendments: Income Tax Act, 2026 (Act 1178)",
  url: "https://gra.gov.gh/wp-content/uploads/2026/09/Amendments-To-The-Income-Tax-2015-Act-896_Updated-1.pdf",
  tipo: "primaria",
  verificadoEl: "2026-10-18",
} as const;

export const novedades: readonly Novedad[] = [
  {
    id: "gh.paye-bands-september-2026",
    fecha: "2026-10-18",
    titulo: "New income tax bands from 1 September 2026",
    texto:
      "The Income Tax (Amendment) Act, 2026 (Act 1178) changed the bands for resident individuals. The first GH₵7,056 of chargeable income a year is now tax-free. Our PAYE and take-home pay calculators already use the new bands.",
    vigenteDesde: "2026-09-01",
    calculadoras: ["gh.paye-calculator", "gh.take-home-pay"],
    fuente: GRA_ACT_1178,
  },
  {
    id: "gh.mts-threshold-2026",
    fecha: "2026-10-18",
    titulo: "Modified Taxation Scheme now covers turnover up to GH₵750,000",
    texto: "From 1 September 2026, individuals with a yearly business turnover above GH₵20,000 and up to GH₵750,000 pay a presumptive tax of 3% of turnover.",
    vigenteDesde: "2026-09-01",
    calculadoras: ["gh.modified-taxation-scheme"],
    fuente: GRA_ACT_1178,
  },
  {
    id: "gh.vat-reform-2026",
    fecha: "2026-10-18",
    titulo: "VAT reform: COVID-19 levy removed, levies on the same base",
    texto:
      "Since 1 January 2026, VAT of 15%, NHIL of 2.5% and GETFund Levy of 2.5% are all charged on the same value, and the 1% COVID-19 Health Recovery Levy is gone. Our VAT calculator uses the new method.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["gh.vat-calculator"],
    fuente: {
      organismo: "GRA",
      titulo: "Value Added Tax: VAT reforms 2026",
      url: "https://gra.gov.gh/domestic-tax/tax-types/vat/",
      tipo: "primaria",
      verificadoEl: "2026-10-18",
    },
  },
];
