import { definirCasos } from "@/motor/calculo";
import interesesSunat from "./intereses-moratorios-sunat";

export default definirCasos(interesesSunat, [
  {
    nombre: "IGV de S/ 5,000 pagado 45 días tarde",
    origen: {
      tipo: "recalculado",
      detalle: "Código Tributario, art. 33, y TIM de 0.9 % mensual (SUNAT): 0.9 / 30 = 0.03 % diario × 45 días = 1.35 %; 5,000 × 1.35 % = 67.50.",
    },
    fecha: "2026-10-12",
    entrada: { tributo: 5000, moneda: "soles", vencimiento: "2026-08-28", pago: "2026-10-12" },
    esperado: { dias: 45, interes: 67.5, total: 5067.5 },
  },
  {
    nombre: "Deuda en dólares por 100 días",
    origen: { tipo: "recalculado", detalle: "TIM 0.5 % mensual: 0.5 / 30 × 100 = 1.6667 %; 3,000 × 1.6667 % = 50." },
    fecha: "2026-10-12",
    entrada: { tributo: 3000, moneda: "dolares", vencimiento: "2026-07-04", pago: "2026-10-12" },
    esperado: { dias: 100, interes: 50 },
  },
  {
    nombre: "Pago el mismo día del vencimiento",
    origen: { tipo: "recalculado", detalle: "Sin atraso no hay intereses." },
    fecha: "2026-10-12",
    entrada: { tributo: 1000, moneda: "soles", vencimiento: "2026-10-12", pago: "2026-10-12" },
    esperado: { dias: 0, interes: 0 },
  },
  {
    nombre: "Fecha de pago anterior al vencimiento",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-12",
    entrada: { tributo: 1000, moneda: "soles", vencimiento: "2026-10-12", pago: "2026-10-01" },
    esperaError: true,
  },
]);
