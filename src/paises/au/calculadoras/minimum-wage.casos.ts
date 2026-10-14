import { definirCasos } from "@/motor/calculo";
import calculadora from "./minimum-wage";

const URL_2026 = "https://www.fairwork.gov.au/newsroom/media-releases/2026-media-releases/july-2026/20260701-minimum-wage-increase-media-release";
const URL_2025 = "https://www.fairwork.gov.au/newsroom/media-releases/2025-media-releases/july-2025/20250701-awr-2025-media-release";

export default definirCasos(calculadora, [
  {
    nombre: "Full time from 1 July 2026",
    origen: { tipo: "oficial", url: URL_2026, detalle: "$1,004.90 per week (38-hour week) or $26.44 per hour. A year: 1,004.90 × 52 = 52,254.80." },
    fecha: "2026-10-14",
    entrada: { horas: 38, casual: false },
    esperado: { porHora: 26.44, semanal: 1004.9, quincenal: 2009.8, anual: 52254.8 },
  },
  {
    nombre: "Casual from 1 July 2026",
    origen: { tipo: "oficial", url: URL_2026, detalle: "Casual employees must receive at least $33.05 per hour. 20 hours: 661." },
    fecha: "2026-10-14",
    entrada: { horas: 20, casual: true },
    esperado: { porHora: 33.05, semanal: 661 },
  },
  {
    nombre: "The day before the 2026 increase",
    origen: { tipo: "oficial", url: URL_2025, detalle: "$948 per week or $24.95 per hour; casual $31.19." },
    fecha: "2026-06-30",
    entrada: { horas: 38, casual: false },
    esperado: { porHora: 24.95, semanal: 948 },
  },
  {
    nombre: "Casual before the 2026 increase",
    origen: { tipo: "oficial", url: URL_2025, detalle: "Casual employees on the National Minimum Wage: at least $31.19 per hour." },
    fecha: "2026-06-30",
    entrada: { horas: 10, casual: true },
    esperado: { porHora: 31.19, semanal: 311.9 },
  },
  {
    nombre: "Part time 19 hours",
    origen: { tipo: "recalculado", detalle: "1,004.90 × 19 / 38 = 502.45." },
    fecha: "2026-10-14",
    entrada: { horas: 19, casual: false },
    esperado: { semanal: 502.45 },
  },
  {
    nombre: "Zero hours",
    origen: { tipo: "recalculado", detalle: "The function asks for 1 to 80 hours." },
    fecha: "2026-10-14",
    entrada: { horas: 0, casual: false },
    esperaError: true,
  },
]);
