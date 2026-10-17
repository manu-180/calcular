import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "ng.nigeria-tax-act-2026",
    fecha: "2026-10-16",
    titulo: "New income tax bands from 1 January 2026",
    texto:
      "The Nigeria Tax Act, 2025 came into force on 1 January 2026. The first ₦800,000 of chargeable income is taxed at 0%, the top rate is 25% above ₦50 million, and rent relief replaces the consolidated relief allowance. Our PAYE and net salary calculators already use the new rules.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ng.paye-calculator", "ng.net-salary-calculator"],
    fuente: {
      organismo: "National Assembly (Official Gazette No. 117)",
      titulo: "Nigeria Tax Act, 2025",
      url: "https://nass.gov.ng/documents/download/11249",
      tipo: "primaria",
      verificadoEl: "2026-10-16",
    },
  },
];
