import { definirCasos } from "@/motor/calculo";
import calculadora from "./estate-duty";

export default definirCasos(calculadora, [
  {
    nombre: "R12 million estate with R1 million of liabilities",
    origen: { tipo: "recalculado", detalle: "11 000 000 − 3 500 000 basic deduction = 7 500 000 × 20% = 1 500 000." },
    fecha: "2026-10-14",
    entrada: { bienes: 12000000, deudas: 1000000, conyuge: 0, pbo: 0 },
    esperado: { neto: 11000000, sujeto: 7500000, impuesto: 1500000 },
  },
  {
    nombre: "R40 million estate",
    origen: { tipo: "recalculado", detalle: "40 000 000 − 3 500 000 = 36 500 000. 30 000 000 × 20% = 6 000 000 plus 6 500 000 × 25% = 1 625 000. Total 7 625 000." },
    fecha: "2026-10-14",
    entrada: { bienes: 40000000, deudas: 0, conyuge: 0, pbo: 0 },
    esperado: { sujeto: 36500000, impuesto: 7625000 },
  },
  {
    nombre: "Everything to the spouse",
    origen: { tipo: "recalculado", detalle: "Property left to a surviving spouse is deductible, so nothing is dutiable." },
    fecha: "2026-10-14",
    entrada: { bienes: 8000000, deudas: 0, conyuge: 8000000, pbo: 0 },
    esperado: { sujeto: 0, impuesto: 0 },
  },
]);
