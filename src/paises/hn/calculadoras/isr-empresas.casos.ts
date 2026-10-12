import { definirCasos } from "@/motor/calculo";
import isrEmpresas from "./isr-empresas";

export default definirCasos(isrEmpresas, [
  {
    nombre: "Renta de L800,000: sin aportación solidaria",
    origen: { tipo: "recalculado", detalle: "Ley del ISR art. 22 a): 25 %. 800000 × 25 % = 200000. No pasa de L1,000,000: sin aportación solidaria." },
    fecha: "2026-10-12",
    entrada: { renta: 800000 },
    esperado: { isr: 200000, aportacion: 0, total: 200000, tasaEfectiva: 25 },
  },
  {
    nombre: "Renta de L3,000,000",
    origen: {
      tipo: "recalculado",
      detalle: "ISR 3000000 × 25 % = 750000. Aportación solidaria (SAR, ayuda del formulario 103): 5 % sobre el exceso de L1,000,000 = 2000000 × 5 % = 100000. Total 850000; tasa efectiva 28.33 %.",
    },
    fecha: "2026-10-12",
    entrada: { renta: 3000000 },
    esperado: { isr: 750000, excedente: 2000000, aportacion: 100000, total: 850000, tasaEfectiva: 28.33 },
  },
  {
    nombre: "Justo en L1,000,000",
    origen: { tipo: "recalculado", detalle: "Sin exceso sobre L1,000,000: aportación 0. ISR 250000." },
    fecha: "2026-10-12",
    entrada: { renta: 1000000 },
    esperado: { isr: 250000, aportacion: 0 },
  },
]);
