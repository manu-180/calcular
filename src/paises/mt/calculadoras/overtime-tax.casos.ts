import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-tax";

export default definirCasos(calculadora, [
  {
    nombre: "€350 a week, 200 hours at €13.13",
    origen: {
      tipo: "recalculado",
      detalle: "S.L. 123.200, rule 3: 350 ≤ 375 qualifies. Maxrate = min(13.13, 2 × 350 / 40 = 17.50) = 13.13. 200 × 13.13 = 2,626 (under 10,000). Art. 90B: 15% = 393.90.",
    },
    fecha: "2026-10-26",
    entrada: { semanal: 350, tarifa: 13.13, horas: 200, gerencial: false, completo: true },
    esperado: { impuesto: 393.9, califica: 2626, ingreso: 2626, resto: 0 },
  },
  {
    nombre: "Overtime rate above twice the basic rate",
    origen: { tipo: "recalculado", detalle: "300 / 40 × 2 = 15. Paid 20 an hour × 100 = 2,000; qualifying 100 × 15 = 1,500; tax 225; 500 at normal rates." },
    fecha: "2026-10-26",
    entrada: { semanal: 300, tarifa: 20, horas: 100, gerencial: false, completo: true },
    esperado: { califica: 1500, impuesto: 225, resto: 500 },
  },
  {
    nombre: "Capped at €10,000",
    origen: { tipo: "recalculado", detalle: "375 / 40 × 2 = 18.75. 800 hours × 14 = 11,200; cap 10,000; tax 1,500." },
    fecha: "2026-10-26",
    entrada: { semanal: 375, tarifa: 14, horas: 800, gerencial: false, completo: true },
    esperado: { califica: 10000, impuesto: 1500, resto: 1200 },
  },
  {
    nombre: "Basic wage above €375",
    origen: { tipo: "recalculado", detalle: "400 > 375: no qualifying overtime." },
    fecha: "2026-10-26",
    entrada: { semanal: 400, tarifa: 15, horas: 100, gerencial: false, completo: true },
    esperado: { impuesto: 0, califica: 0, resto: 1500 },
  },
  {
    nombre: "Managerial post",
    origen: { tipo: "recalculado", detalle: "Managerial posts are excluded." },
    fecha: "2026-10-26",
    entrada: { semanal: 350, tarifa: 13.13, horas: 100, gerencial: true, completo: true },
    esperado: { impuesto: 0 },
  },
]);
