import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "fj.fnpf-employer-8-2026",
    fecha: "2026-06-26",
    titulo: "FNPF employer contribution cut to 8% for twelve months",
    texto:
      "The 2026-2027 Budget lowers the mandatory FNPF employer contribution from 10% to 8% from 1 August 2026 to 31 July 2027. The employee rate stays at 8%. Employers who pay more than 8%, up to 10%, can deduct 150% of the excess. Our FNPF and employer cost calculators already use the new rate.",
    vigenteDesde: "2026-08-01",
    calculadoras: ["fj.fnpf-calculator", "fj.employer-cost-calculator", "fj.net-pay-calculator"],
    fuente: {
      organismo: "Ministry of Finance, Strategic Planning, National Development and Statistics",
      titulo: "2026-2027 Budget Supplement",
      url: "https://www.finance.gov.fj/wp-content/uploads/2026/06/2026-2027-Budget-Supplement.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
  {
    id: "fj.vat-12-5-2025",
    fecha: "2025-08-01",
    titulo: "VAT rate is 12.5% from 1 August 2025",
    texto: "FRCS lists the VAT rate at 12.5% from 1 August 2025, down from 15%. Zero rated supplies stay at 0%. Our VAT calculator uses 12.5%.",
    vigenteDesde: "2025-08-01",
    calculadoras: ["fj.vat-calculator"],
    fuente: {
      organismo: "Fiji Revenue and Customs Service",
      titulo: "VAT Guide",
      url: "https://frcs.org.fj/our-services/taxation-section/non-individuals/reporting-and-paying-taxes/vat-guide/",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
  {
    id: "fj.minimum-wage-5-2025",
    fecha: "2024-06-28",
    titulo: "National minimum wage reaches FJ$5.00 an hour from 1 April 2025",
    texto:
      "The 2024-2025 Budget set the national minimum wage at FJ$4.50 an hour from 1 August 2024 and FJ$5.00 an hour from 1 April 2025. The ten sectoral wages rose by 50 cents at each step. Our minimum wage calculator uses the FJ$5.00 rate.",
    vigenteDesde: "2025-04-01",
    calculadoras: ["fj.minimum-wage"],
    fuente: {
      organismo: "Fiji Government",
      titulo: "2024-2025 National Budget Address",
      url: "https://www.fiji.gov.fj/2024-2025-national-budget-address/",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
];
