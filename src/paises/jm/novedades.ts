import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "jm.minimum-wage-july-2026",
    fecha: "2026-10-24",
    titulo: "Minimum wage rises to J$17,000 a week",
    texto:
      "From July 1, 2026 the national minimum wage is J$17,000 for a 40-hour week, or J$425 an hour. Overtime is J$637.50 an hour and double time J$850. Industrial security guards move to the same weekly minimum. Our minimum wage and overtime calculators already use the new rates.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["jm.minimum-wage-calculator", "jm.overtime-calculator"],
    fuente: {
      organismo: "Jamaica Information Service (Government of Jamaica)",
      titulo: "Minimum Wage Moves to $17,000, Up from $16,000",
      url: "https://jis.gov.jm/minimum-wage-moves-to-17000-up-from-16000/",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
  {
    id: "jm.income-tax-threshold-april-2026",
    fecha: "2026-10-24",
    titulo: "Income tax threshold up to J$1,902,360",
    texto:
      "From April 1, 2026 the annual income tax threshold is J$1,902,360, or J$158,530 a month for PAYE. For the 2026 year of assessment as a whole the tax-free amount works out to J$1,876,614. The next step, to J$2,003,496, starts on April 1, 2027. Our salary, income tax and PAYE figures already use the new threshold.",
    vigenteDesde: "2026-04-01",
    calculadoras: ["jm.salary-calculator", "jm.income-tax-calculator"],
    fuente: {
      organismo: "Tax Administration Jamaica",
      titulo: "Technical Advisory 042025/01/IT-TA: Increase in Income Tax Threshold April 1, 2025 to December 31, 2028",
      url: "https://www.jamaicatax.gov.jm/documents/10194/52231399/Technical_Advisory_Threshold+_042025.pdf/c4adbf81-8ddd-9a1b-9e8b-8bdc431162df",
      tipo: "primaria",
      verificadoEl: "2026-10-24",
    },
  },
];
