import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "za.tax-year-2027",
    fecha: "2026-10-14",
    titulo: "New SARS tax tables for 2026/27",
    texto:
      "From 1 March 2026 the tax brackets and rebates went up with inflation. The primary rebate is now R17 820 and a person under 65 pays no tax below R99 000 a year. Our take-home pay and income tax calculators already use the new tables.",
    vigenteDesde: "2026-03-01",
    calculadoras: ["za.take-home-pay", "za.income-tax-calculator"],
    fuente: {
      organismo: "SARS",
      titulo: "Rates of tax for individuals",
      url: "https://www.sars.gov.za/tax-rates/income-tax/rates-of-tax-for-individuals/",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "za.retirement-cap-2027",
    fecha: "2026-10-14",
    titulo: "Higher cap on retirement fund deductions",
    texto: "From 1 March 2026 you can deduct retirement fund contributions up to R430 000 a year, still limited to 27.5% of your remuneration or taxable income.",
    vigenteDesde: "2026-03-01",
    calculadoras: ["za.take-home-pay", "za.retirement-annuity-tax"],
    fuente: {
      organismo: "SARS",
      titulo: "Budget 2026 Tax Guide (pocket guide 2026/27)",
      url: "https://www.treasury.gov.za/documents/National%20Budget/2026/sars/Budget%202026%20Tax%20guide.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "za.cgt-exclusions-2027",
    fecha: "2026-10-14",
    titulo: "Capital gains exclusions go up",
    texto:
      "From 1 March 2026 the annual exclusion for individuals is R50 000, the primary residence exclusion is R3 million and the exclusion in the year of death is R440 000. The inclusion rate stays at 40%.",
    vigenteDesde: "2026-03-01",
    calculadoras: ["za.capital-gains-tax"],
    fuente: {
      organismo: "SARS",
      titulo: "Capital gains tax: annual exclusion",
      url: "https://www.sars.gov.za/types-of-tax/capital-gains-tax/proceeds/calculation-of-taxable-capital-gains-and-assessed-capital-losses/annual-exclusion/",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "za.minimum-wage-march-2026",
    fecha: "2026-10-14",
    titulo: "National minimum wage rises to R30,23 an hour",
    texto:
      "Since 1 March 2026 the national minimum wage is R30,23 for each ordinary hour, also for farm and domestic workers. Workers on the Expanded Public Works Programme get at least R16,62 an hour.",
    vigenteDesde: "2026-03-01",
    calculadoras: ["za.minimum-wage"],
    fuente: {
      organismo: "Department of Employment and Labour",
      titulo: "GN R.7083, Government Gazette 54075, 3 February 2026",
      url: "https://www.gov.za/sites/default/files/gcis_document/202602/54075rg11941gon7083.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "za.bcea-threshold-may-2026",
    fecha: "2026-10-14",
    titulo: "New BCEA earnings threshold",
    texto:
      "From 1 May 2026 employees earning more than R269 900,90 a year are outside the BCEA rules on working hours, overtime, Sunday pay and night work. Below that amount the legal minimums apply.",
    vigenteDesde: "2026-05-01",
    calculadoras: ["za.overtime-calculator"],
    fuente: {
      organismo: "Department of Employment and Labour",
      titulo: "Department of Employment and Labour sets a new threshold in the protection of employees",
      url: "https://www.labour.gov.za/Media-Desk/Media-Statements/Pages/Department-of-Employment-and-Labour-sets-a-new-threshold-in-the-protection-of-employees-.aspx",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
];
