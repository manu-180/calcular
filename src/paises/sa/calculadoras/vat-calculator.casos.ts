import { definirCasos } from "@/motor/calculo";
import calculadora from "./vat-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Sumar el 15 % a 1.000",
    origen: { tipo: "recalculado", detalle: "Ley del IVA art. 2: 1.000 x 15 % = 150; total 1.150." },
    fecha: "2026-10-24",
    entrada: { operacion: "add", monto: 1000 },
    esperado: { impuesto: 150, neto: 1000, total: 1150, tasa: 15 },
  },
  {
    nombre: "Sacar el IVA de 1.150",
    origen: { tipo: "recalculado", detalle: "1.150 / 1,15 = 1.000; IVA 150." },
    fecha: "2026-10-24",
    entrada: { operacion: "extract", monto: 1150 },
    esperado: { impuesto: 150, neto: 1000, total: 1150 },
  },
  {
    nombre: "Sacar el IVA de 99,99",
    origen: { tipo: "recalculado", detalle: "99,99 / 1,15 = 86,947 -> 86,95; IVA 13,04." },
    fecha: "2026-10-24",
    entrada: { operacion: "extract", monto: 99.99 },
    esperado: { neto: 86.95, impuesto: 13.04 },
  },
  {
    nombre: "Monto cero",
    origen: { tipo: "recalculado", detalle: "Monto 0." },
    fecha: "2026-10-24",
    entrada: { operacion: "add", monto: 0 },
    esperaError: true,
  },
]);
