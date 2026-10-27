import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "et.income-tax-1395-2025",
    fecha: "2026-10-27",
    titulo: "New income tax bands from 8 July 2025",
    texto:
      "Proclamation 1395/2025 raised the tax free part of a monthly salary to ETB 2,000 and redrew the bands, with rates from 15% to 35%. Rental and business income of individuals now pay nothing on the first ETB 24,000 a year. Our salary, rental and business income calculators already use the new tables.",
    vigenteDesde: "2025-07-08",
    calculadoras: [
      "et.net-salary-calculator",
      "et.income-tax-calculator",
      "et.gross-salary-calculator",
      "et.rental-income-tax-calculator",
      "et.business-income-tax-calculator",
    ],
    fuente: {
      organismo: "Federal Negarit Gazette (Ministry of Revenue)",
      titulo: "Income Tax (Amendment) Proclamation No. 1395/2025, Federal Negarit Gazette No. 64, 1 September 2025",
      url: "https://www.mor.gov.et/DomesticProclamations/1786970364007-582645424-pdf-%C3%A1%C2%8A%C2%A0%C3%A1%C2%8B%C2%8B%C3%A1%C2%8C%C2%85-%C3%A1%C2%89%C2%81%C3%A1%C2%8C%C2%A5%C3%A1%C2%88%C2%AD-1395-2017.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-27",
    },
  },
];
