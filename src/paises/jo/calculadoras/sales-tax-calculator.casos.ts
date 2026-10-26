import { definirCasos } from "@/motor/calculo";
import calculadora from "./sales-tax-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Tasa general de la ley",
    origen: { tipo: "recalculado", detalle: "Art. 6 (a): 16 %. 250 × 16 % = 40. Total 290." },
    fecha: "2026-10-24",
    entrada: { operacion: "add", monto: 250, otraTasa: null },
    esperado: { impuesto: 40, neto: 250, total: 290, tasa: 16 },
  },
  {
    nombre: "Tasa especial ingresada a mano",
    origen: { tipo: "recalculado", detalle: "Con 4 %: 104 / 1,04 = 100; impuesto 4." },
    fecha: "2026-10-24",
    entrada: { operacion: "extract", monto: 104, otraTasa: 4 },
    esperado: { impuesto: 4, neto: 100, tasa: 4 },
  },
  {
    nombre: "Agregar 16 % a 100",
    origen: { tipo: "recalculado", detalle: "100 × 16 % = 16. Total 116." },
    fecha: "2026-10-24",
    entrada: { operacion: "add", monto: 100, otraTasa: null },
    valores: { "jo.gst": 16 },
    esperado: { impuesto: 16, neto: 100, total: 116 },
  },
  {
    nombre: "Extraer 16 % de 116",
    origen: { tipo: "recalculado", detalle: "116 / 1,16 = 100. Impuesto 16." },
    fecha: "2026-10-24",
    entrada: { operacion: "extract", monto: 116, otraTasa: null },
    valores: { "jo.gst": 16 },
    esperado: { impuesto: 16, neto: 100, total: 116 },
  },
]);
