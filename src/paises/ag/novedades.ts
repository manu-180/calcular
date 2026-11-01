import type { Novedad } from "@/motor/tipos";

export const novedades: readonly Novedad[] = [
  {
    id: "ag.social-security-2025",
    fecha: "2026-10-29",
    titulo: "Social Security rates up to 16% in the private sector",
    texto:
      "From 1 January 2025 the private sector rate is 16% of insurable earnings, with the employee paying 7% and the employer 9%. The public sector rate is 15%, split 6% and 9%. Our Social Security, employer cost and take-home pay calculators use the new split.",
    vigenteDesde: "2025-01-01",
    calculadoras: ["ag.social-security-calculator", "ag.employer-cost-calculator", "ag.take-home-pay-calculator"],
    fuente: {
      organismo: "Antigua and Barbuda Social Security Board",
      titulo: "Media release: contribution rate adjustments, 31 December 2024",
      url: "https://socialsecurity.gov.ag/media-release-pension-contribution-rate-adjustments/",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
  {
    id: "ag.abst-17",
    fecha: "2026-10-29",
    titulo: "ABST standard rate is 17%",
    texto:
      "The Revenue (Miscellaneous Provisions) Act, 2023, gazetted on 29 December 2023, raised the standard rate of the Antigua and Barbuda Sales Tax from 15% to 17% and brought the 14% accommodation rate up to 17%. The Sales Tax (Amendment) Act 2024 later set the return deadline at 15 days after the end of the period. Our ABST calculator uses both.",
    vigenteDesde: "2024-01-01",
    calculadoras: ["ag.abst-calculator"],
    fuente: {
      organismo: "Parliament of Antigua and Barbuda",
      titulo: "Revenue (Miscellaneous Provisions) Act, 2023, No. 13 of 2023",
      url: "https://laws.gov.ag/wp-content/uploads/2024/02/No.-13-of-2023-Revenue-Miscellaneous-Provision-Act-2023.pdf",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
];
