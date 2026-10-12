import { definirCasos } from "@/motor/calculo";
import retencionHonorarios from "./retencion-honorarios";

export default definirCasos(retencionHonorarios, [
  {
    nombre: "Honorarios de RD$50,000 desde julio de 2026",
    origen: { tipo: "recalculado", detalle: "Ley 30-26, art. 17 (art. 309 literal b): 15 % desde el 1/7/2026. 50,000 × 15 % = 7,500; recibes 42,500." },
    fecha: "2026-10-12",
    entrada: { monto: 50000 },
    esperado: { tasa: 15, retencion: 7500, neto: 42500 },
  },
  {
    nombre: "Antes de julio de 2026",
    origen: { tipo: "recalculado", detalle: "Guía de retenciones de la DGII: 10 % hasta el 30/6/2026. 50,000 × 10 % = 5,000." },
    fecha: "2026-06-30",
    entrada: { monto: 50000 },
    esperado: { tasa: 10, retencion: 5000, neto: 45000 },
  },
  {
    nombre: "Primer día con la tasa nueva",
    origen: { tipo: "recalculado", detalle: "1/7/2026: 15 %." },
    fecha: "2026-07-01",
    entrada: { monto: 10000 },
    esperado: { tasa: 15, retencion: 1500 },
  },
]);
