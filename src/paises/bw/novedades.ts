import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "bw.income-tax-act-2026",
    fecha: "2026-10-27",
    titulo: "New top tax rate of 27.5% from July 2026",
    texto:
      "The Income Tax Act, 2026 came into force on 1 July 2026. Residents now pay 27.5% on taxable income above P400 000 a year, and companies pay 24.5% instead of 22%. Our PAYE and take-home pay calculators already use the new BURS tax table.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["bw.take-home-pay", "bw.paye-calculator", "bw.company-tax-calculator"],
    fuente: {
      organismo: "BURS",
      titulo: "Tax Table and Guidance Notes (for employee's income), effective from 1st July 2026",
      url: "https://www.burs.org.bw/images/Tax%20Table_2026.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
  {
    id: "bw.vat-act-2026",
    fecha: "2026-10-27",
    titulo: "New VAT Act keeps the 14% rate",
    texto: "A new Value Added Tax Act came into force on 1 July 2026. The standard rate stays at 14%, and businesses must register once their taxable supplies pass P1 000 000 in 12 months.",
    vigenteDesde: "2026-07-01",
    calculadoras: ["bw.vat-calculator"],
    fuente: {
      organismo: "BURS",
      titulo: "Value Added Tax Act, 2026 (Act No. 15 of 2026) and S.I. 95 of 2026",
      url: "https://www.burs.org.bw/index.php/tax/tax-laws-2026?download=958:value-added-tax-act-2026",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
];
