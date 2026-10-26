import { definirCasos } from "@/motor/calculo";
import calculadora from "./fdr-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "5 lakh al 9 % por un año",
    origen: { tipo: "recalculado", detalle: "5,00,000 × 9 % = 45,000; TDS 10 % = 4,500; neto 40,500; al vencimiento 5,40,500; 8.1 % neto." },
    fecha: "2026-10-24",
    entrada: { monto: 500000, tasa: 9, meses: 12 },
    esperado: { interes: 45000, impuesto: 4500, neto: 40500, madurez: 540500, efectiva: 8.1 },
  },
  {
    nombre: "1 lakh al 10 % por 6 meses",
    origen: { tipo: "recalculado", detalle: "1,00,000 × 10 % × 6/12 = 5,000; TDS 500; neto 4,500." },
    fecha: "2026-10-24",
    entrada: { monto: 100000, tasa: 10, meses: 6 },
    esperado: { interes: 5000, impuesto: 500, neto: 4500, madurez: 104500 },
  },
]);
