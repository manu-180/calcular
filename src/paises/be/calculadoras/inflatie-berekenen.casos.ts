import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflatie-berekenen";

const STATBEL = "https://bestat.statbel.fgov.be/bestat/api/views/5a614b7f-cb6e-4af5-a4f7-723aac525f70/result/JSON" as const;

export default definirCasos(calculadora, [
  {
    nombre: "€ 1.000 van januari 2025 naar september 2026",
    origen: { tipo: "oficial", url: STATBEL, detalle: "CPI (2013 = 100) januari 2025 = 135,39; september 2026 = 141,28. 1.000 × 141,28 / 135,39 = 1.043,50. Twaalf maanden: 141,28 / 134,95 = +4,69 %." },
    fecha: "2026-10-14",
    entrada: { bedrag: 1000, van: "2025-01-15", tot: "2026-10-14" },
    esperado: { nieuwBedrag: 1043.5, verschil: 43.5, indexBegin: 135.39, indexEind: 141.28, beginmaand: "januari 2025", eindmaand: "september 2026" },
  },
  {
    nombre: "€ 250 van januari 2025 naar augustus 2026",
    origen: { tipo: "oficial", url: STATBEL, detalle: "CPI januari 2025 = 135,39; augustus 2026 = 140,73. 250 × 140,73 / 135,39 = 259,86." },
    fecha: "2026-10-14",
    entrada: { bedrag: 250, van: "2025-01-01", tot: "2026-08-31" },
    esperado: { nieuwBedrag: 259.86 },
  },
  {
    nombre: "Begindatum na de einddatum",
    origen: { tipo: "recalculado", detalle: "Ongeldige invoer." },
    fecha: "2026-10-14",
    entrada: { bedrag: 100, van: "2026-05-01", tot: "2025-03-01" },
    esperaError: true,
  },
]);
