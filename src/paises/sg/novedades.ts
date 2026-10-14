import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "sg.cpf-rates-january-2026",
    fecha: "2026-10-14",
    titulo: "Higher CPF rates for workers above 55 and an $8,000 wage ceiling",
    texto:
      "Since 1 January 2026, workers above 55 to 60 pay 18% and their employers 16%, and workers above 60 to 65 pay 12.5% with employers paying 12.5%. The CPF Ordinary Wage ceiling is now $8,000 a month. The take-home pay and CPF calculators already use these rates.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["sg.take-home-pay", "sg.cpf-contribution-calculator", "sg.cpf-allocation"],
    fuente: {
      organismo: "CPF Board",
      titulo: "CPF Contribution Rate Table from 1 January 2026",
      url: "https://www.cpf.gov.sg/service/sfc/servlet.shepherd/document/download/069IW00000DuRCiYAN",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
  {
    id: "sg.ssd-july-2025",
    fecha: "2026-10-14",
    titulo: "Seller's Stamp Duty now covers four years",
    texto:
      "Homes bought on or after 4 July 2025 pay Seller's Stamp Duty if sold within four years, at 16% in the first year down to 4% in the fourth. Homes bought from 11 March 2017 to 3 July 2025 keep the three-year schedule of 12%, 8% and 4%.",
    vigenteDesde: "2025-07-04",
    calculadoras: ["sg.seller-stamp-duty"],
    fuente: {
      organismo: "IRAS",
      titulo: "Seller's Stamp Duty (SSD) for residential property",
      url: "https://www.iras.gov.sg/taxes/stamp-duty/for-property/selling-or-disposing-property/seller's-stamp-duty-(ssd)-for-residential-property",
      tipo: "primaria",
      verificadoEl: "2026-10-14",
    },
  },
];
