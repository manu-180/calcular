import { definirCasos } from "@/motor/calculo";
import calculadora from "./end-of-year-payment";

const GUIA = "https://www.labour.gov.hk/eng/public/wcp/ConciseGuide/EO_guide_full.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Whole period, amount not set: one month's average wages",
    origen: { tipo: "oficial", url: GUIA, detalle: "If not specified, a sum equal to the average monthly wages of the last 12 months: 18,000." },
    fecha: "2026-10-16",
    entrada: { importe: 0, salarioMensual: 18000, situacion: "whole", meses: null, mesesTotales: null },
    esperado: { pago: 18000 },
  },
  {
    nombre: "Dismissed after 8 months with 2 months of probation",
    origen: {
      tipo: "recalculado",
      detalle: "6 months without probation qualifies; the whole 8 months count: 24,000 x 8 / 12 = 16,000.",
    },
    fecha: "2026-10-16",
    entrada: { importe: 24000, salarioMensual: 20000, situacion: "dismissed", meses: 6, mesesTotales: 8 },
    esperado: { pago: 16000, anual: 24000 },
  },
  {
    nombre: "Joined with only 2 months after probation: nothing",
    origen: { tipo: "oficial", url: GUIA, detalle: "Pro rata needs at least 3 months in the payment period, probation excluded." },
    fecha: "2026-10-16",
    entrada: { importe: 0, salarioMensual: 18000, situacion: "joined", meses: 2, mesesTotales: 5 },
    esperado: { pago: 0 },
  },
  {
    nombre: "Resigned before the end: nothing",
    origen: { tipo: "oficial", url: GUIA, detalle: "Pro rata only for those still employed after the period or dismissed (not summarily)." },
    fecha: "2026-10-16",
    entrada: { importe: 0, salarioMensual: 18000, situacion: "resigned", meses: null, mesesTotales: null },
    esperado: { pago: 0 },
  },
]);
