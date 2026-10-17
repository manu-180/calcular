import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "in.epf-wage-ceiling-25000",
    fecha: "2026-10-15",
    titulo: "EPF wage ceiling goes up to ₹25,000 a month",
    texto:
      "From 17 September 2026 the wage ceiling for provident fund under the Code on Social Security is ₹25,000 a month, up from ₹15,000. If your PF is worked out on the ceiling, both your share and your employer's go up. Our in-hand salary and EPF calculators already use it.",
    vigenteDesde: "2026-09-17",
    calculadoras: ["in.in-hand-salary-calculator", "in.epf-calculator"],
    fuente: {
      organismo: "Ministry of Labour and Employment (Gazette of India)",
      titulo: "S.O. 5109(E) of 17 September 2026",
      url: "https://egazette.gov.in/WriteReadData/2026/276299.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "in.income-tax-act-2025",
    fecha: "2026-10-15",
    titulo: "The Income-tax Act, 2025 is in force",
    texto:
      "Since 1 April 2026 income tax follows the Income-tax Act, 2025. The tax year replaces the previous year and assessment year, and familiar sections have new numbers: 80C is now section 123 and the rebate is section 156. Slabs and rates for 2026-27 are unchanged.",
    vigenteDesde: "2026-04-01",
    calculadoras: ["in.income-tax-calculator", "in.in-hand-salary-calculator", "in.hra-calculator"],
    fuente: {
      organismo: "Income Tax Department (CBDT)",
      titulo: "Income-tax Act, 2025 as amended by the Finance Act, 2026",
      url: "https://www.incometaxindia.gov.in/documents/d/guest/income_tax_act_2025_as_amended_by_fa_act_2026-pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "in.hra-eight-cities",
    fecha: "2026-10-15",
    titulo: "50% HRA exemption now covers eight cities",
    texto:
      "From tax year 2026-27, rent in Hyderabad, Pune, Ahmedabad and Bengaluru counts for the 50% limit, like Mumbai, Kolkata, Delhi and Chennai. Everywhere else the limit stays at 40% of salary.",
    vigenteDesde: "2026-04-01",
    calculadoras: ["in.hra-calculator"],
    fuente: {
      organismo: "Income Tax Department (CBDT)",
      titulo: "Income-tax Rules, 2026, rule 279",
      url: "https://www.incometaxindia.gov.in/documents/81799/11848482/En-Notified-IT-Rules-2026-20-03-2026.pdf/a332bf2a-da14-8b94-dde2-5a2ea1428318",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
];
