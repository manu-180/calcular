import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "48 hours at Bds$12",
    origen: { tipo: "recalculado", url: "https://labour.gov.bb/wp-content/uploads/2022/05/Shops-Act-2015-30.pdf", detalle: "40 × 12 = 480.00. Overtime 8 × 12 × 1.5 = 144.00. Total 624.00." },
    fecha: "2026-10-27",
    entrada: { tarifa: 12, horas: 48, feriado: 0 },
    esperado: { pagoNormal: 480, extras: 8, tarifaExtra: 18, pagoExtra: 144, total: 624 },
  },
  {
    nombre: "A 40 hour week plus a 10 hour public holiday",
    origen: { tipo: "recalculado", detalle: "40 × 12 = 480.00. Holiday 10 × 12 × 2 = 240.00. Total 720.00." },
    fecha: "2026-10-27",
    entrada: { tarifa: 12, horas: 40, feriado: 10 },
    esperado: { pagoNormal: 480, pagoFeriado: 240, total: 720 },
  },
  {
    nombre: "Under 40 hours",
    origen: { tipo: "recalculado", detalle: "30 × 15 = 450.00 and no overtime." },
    fecha: "2026-10-27",
    entrada: { tarifa: 15, horas: 30, feriado: 0 },
    esperado: { pagoNormal: 450, extras: 0, total: 450 },
  },
  {
    nombre: "No hourly pay",
    origen: { tipo: "recalculado", detalle: "A zero rate is rejected." },
    fecha: "2026-10-27",
    entrada: { tarifa: 0, horas: 45, feriado: 0 },
    esperaError: true,
  },
]);
