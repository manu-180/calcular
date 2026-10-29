import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "np.income-tax-2083-84",
    fecha: "2026-10-29",
    titulo: "New income tax slabs for the 2083/84 income year",
    texto:
      "From 1 Shrawan 2083 (mid-July 2026) the Inland Revenue Department applies 1% up to NPR 10 lakh, 10% to NPR 15 lakh, 20% to NPR 25 lakh, 27% to NPR 40 lakh and 29% above that, with the same table for single people and couples. Our income tax and salary calculators already use it.",
    vigenteDesde: "2026-07-17",
    calculadoras: ["np.income-tax-calculator", "np.salary-calculator"],
    fuente: {
      organismo: "Inland Revenue Department",
      titulo: "Income tax rates for natural persons, income year 2083/84",
      url: "https://ird.gov.np/content/13609/tax-rate-for-natural-persons-for-the/",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
  {
    id: "np.minimum-wage-2082",
    fecha: "2026-10-29",
    titulo: "Minimum remuneration of NPR 19,550 a month",
    texto:
      "Since 1 Shrawan 2082 (17 July 2025) the minimum remuneration is NPR 12,170 basic pay plus NPR 7,380 dearness allowance a month, NPR 754 a day and NPR 101 an hour. Our minimum wage calculator uses it.",
    vigenteDesde: "2025-07-17",
    calculadoras: ["np.minimum-wage-in-nepal"],
    fuente: {
      organismo: "Ministry of Labour, Employment and Social Security",
      titulo: "Press release on minimum remuneration",
      url: "https://www.moless.gov.np/content/13291/press-release-related-press-release-remuneration-remained/",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
  {
    id: "np.ssf-fifth-amendment",
    fecha: "2026-10-29",
    titulo: "Social Security Fund: 11% from the worker, 20% from the employer",
    texto:
      "The fifth amendment of the Social Security Operation Procedure, in force from 1 Baisakh 2082, sets the contribution at 11% of basic pay from the worker and 20% from the employer, a total of 31% shared among four schemes. Our SSF, salary and employer cost calculators use it.",
    vigenteDesde: "2025-04-14",
    calculadoras: ["np.ssf-calculator", "np.salary-calculator", "np.employer-cost-calculator"],
    fuente: {
      organismo: "Social Security Fund",
      titulo: "Social Security Scheme Operation Procedure, 2075, with the fifth amendment",
      url: "https://ssf.gov.np/list/act_regulation/social-security-operation-procedure-2075-with-5th-ammendment",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
];
