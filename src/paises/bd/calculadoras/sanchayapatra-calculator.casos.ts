import { definirCasos } from "@/motor/calculo";
import calculadora from "./sanchayapatra-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Family Sanchayapatra de 5 lakh a término",
    origen: { tipo: "recalculado", detalle: "Tasa del 5.º año hasta 7.5 lakh: 11.93 %. 5,00,000 × 11.93 % × 5 = 2,98,250; TDS 10 % = 29,825; neto 2,68,425; 4,473.75 al mes." },
    fecha: "2026-10-24",
    entrada: { esquema: "fam", monto: 500000, anios: 5, acumulado: null },
    esperado: { tasa: 11.93, ganancia: 298250, impuesto: 29825, neto: 268425, mensual: 4473.75, total: 768425 },
  },
  {
    nombre: "Bangladesh Sanchayapatra de 10 lakh (tramo alto)",
    origen: { tipo: "recalculado", detalle: "Más de 7.5 lakh, 5.º año: 11.80 %. 10,00,000 × 11.80 % × 5 = 5,90,000; TDS 59,000; neto 5,31,000." },
    fecha: "2026-10-24",
    entrada: { esquema: "b5", monto: 1000000, anios: 5, acumulado: null },
    esperado: { tasa: 11.8, ganancia: 590000, impuesto: 59000, neto: 531000 },
  },
  {
    nombre: "Pensioner de 4 lakh sin retención",
    origen: { tipo: "recalculado", detalle: "Inversión acumulada 4,00,000 ≤ 5,00,000: sin TDS (art. 105(2)). 3.er año: 10.84 %. 4,00,000 × 10.84 % × 3 = 1,30,080." },
    fecha: "2026-10-24",
    entrada: { esquema: "pen", monto: 400000, anios: 3, acumulado: null },
    esperado: { tasa: 10.84, ganancia: 130080, impuesto: 0, neto: 130080, tasaImpuesto: 0 },
  },
  {
    nombre: "3-month de 2 lakh con otras inversiones por 8 lakh",
    origen: { tipo: "recalculado", detalle: "Acumulado 8,00,000 > 7,50,000: tasa del 3.er año 11.77 %. 2,00,000 × 11.77 % × 3 = 70,620; TDS 7,062." },
    fecha: "2026-10-24",
    entrada: { esquema: "q3", monto: 200000, anios: 3, acumulado: 800000 },
    esperado: { tasa: 11.77, ganancia: 70620, impuesto: 7062, neto: 63558 },
  },
  {
    nombre: "3-month a 5 años no existe",
    origen: { tipo: "recalculado", detalle: "El plazo del 3-month es 3 años." },
    fecha: "2026-10-24",
    entrada: { esquema: "q3", monto: 200000, anios: 5, acumulado: null },
    esperaError: true,
  },
]);
