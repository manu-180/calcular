import type { Novedad } from "@/motor/tipos";

const EMPLEO = "https://www.employment.gov.sc/e-library/acts-and-regulations/employment-acts-and-regulations/";

export const novedades: readonly Novedad[] = [
  {
    id: "sc.minimum-wage-april-2025",
    fecha: "2025-03-20",
    titulo: "Minimum wage rises to SCR 40.95 an hour",
    texto:
      "S.I. 16 of 2025 lifted the national minimum wage from SR38.27 to SR40.95 an hour for regular and part-time workers and from SR44.10 to SR47.19 for casual workers, from 1 April 2025. Our minimum wage calculator already uses the new rates.",
    vigenteDesde: "2025-04-01",
    calculadoras: ["sc.minimum-wage-calculator"],
    fuente: {
      organismo: "Ministry of Employment and Social Affairs",
      titulo: "S.I. 16 of 2025: Employment (National Minimum Wage) (Amendment) Regulations, 2025",
      url: EMPLEO + "si-16-2025-employment-national-minimum-wage-amendment-regulations-2025/download",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
  {
    id: "sc.vat-voluntary-registration-2025",
    fecha: "2025-01-01",
    titulo: "Voluntary VAT registration needs SCR 100,000 of taxable supplies",
    texto:
      "From 1 January 2025 the SRC accepts voluntary VAT registration from businesses making taxable supplies between SCR 100,000 and the SCR 2 million compulsory threshold. Our VAT calculator shows both limits.",
    vigenteDesde: "2025-01-01",
    calculadoras: ["sc.vat-calculator"],
    fuente: {
      organismo: "Seychelles Revenue Commission",
      titulo: "Seychelles Tax System: Value Added Tax, registration",
      url: "https://src.gov.sc/seychelles-tax-system/",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
  {
    id: "sc.spf-rates-january-2023",
    fecha: "2022-12-08",
    titulo: "SPF contribution rates rise from 1 January 2023",
    texto:
      "The Seychelles Pension Fund raised the employee rate from 4 % to 5 % and the self-employed rate from 9 % to 10 % from 1 January 2023. The employer rate stays at 5 %. Our net salary and SPF calculators use the new rates.",
    vigenteDesde: "2023-01-01",
    calculadoras: ["sc.spf-contribution-calculator", "sc.net-salary-calculator", "sc.employer-cost-calculator"],
    fuente: {
      organismo: "Seychelles Pension Fund",
      titulo: "Changes to the rates of contribution towards SPF",
      url: "https://pensionfund.sc/changes-to-the-rates-of-contribution-towards-spf/",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
  {
    id: "sc.business-tax-january-2022",
    fecha: "2022-01-01",
    titulo: "New business tax bands from January 2022",
    texto:
      "Sole traders and partnerships pay 0 % on the first SCR 102,666 and 15 % up to SCR 1 million. Companies pay 15 % on the first SCR 1 million. Both pay 25 % above SCR 1 million. The business tax calculator uses these bands.",
    vigenteDesde: "2022-01-01",
    calculadoras: ["sc.business-tax-calculator"],
    fuente: {
      organismo: "Seychelles Revenue Commission",
      titulo: "Frequently asked questions: current business tax rates",
      url: "https://src.gov.sc/faq/",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
  {
    id: "sc.thirteenth-month-performance-2023",
    fecha: "2023-11-07",
    titulo: "Thirteenth month pay linked to performance for 2023 to 2025",
    texto:
      "The Employment (Amendment) Act 2023 extended section 46D, which lets employers pay half of the thirteenth month and the rest according to a performance appraisal, to the years 2023, 2024 and 2025. Our thirteenth month calculator uses the full month of section 46C and flags the change.",
    vigenteDesde: "2023-11-07",
    calculadoras: ["sc.thirteenth-month-pay-calculator"],
    fuente: {
      organismo: "Ministry of Employment and Social Affairs",
      titulo: "Employment (Amendment) Act 2023 (Act 19 of 2023)",
      url: EMPLEO + "1-1-7-act-19-2023-employment-amendment-act-2023/download",
      tipo: "primaria",
      verificadoEl: "2026-10-29",
    },
  },
];
