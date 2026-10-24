import type { Novedad } from "@/motor/tipos";

const EMIRATIS = {
  organismo: "UAE Government portal (u.ae)",
  titulo: "Emiratis' employment in the private sector (text provided by MoHRE)",
  url: "https://u.ae/en/information-and-services/jobs/Sector-of-employment/employment-in-the-private-sector/emiratis-employment-in-private-sector",
  tipo: "primaria",
  verificadoEl: "2026-10-17",
} as const;

export const novedades: readonly Novedad[] = [
  {
    id: "ae.emirati-minimum-wage-2026",
    fecha: "2026-10-17",
    titulo: "Emiratis in the private sector earn at least AED 6,000 a month",
    texto: "From 1 January 2026, MoHRE set the minimum monthly wage for Emiratis working in the private sector at AED 6,000.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ae.emirati-minimum-wage"],
    fuente: EMIRATIS,
  },
  {
    id: "ae.emiratisation-2026",
    fecha: "2026-10-17",
    titulo: "Emiratisation contribution reaches AED 108,000 a year",
    texto: "Companies that missed their 2025 Emiratisation target paid AED 108,000 in January 2026 for each Emirati not hired, up from AED 96,000 a year earlier.",
    vigenteDesde: "2026-01-01",
    calculadoras: ["ae.emiratisation-contribution"],
    fuente: EMIRATIS,
  },
];
