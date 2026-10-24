import { definirCasos } from "@/motor/calculo";
import calculadora from "./sales-tax-calculator";

// Casos de la fórmula con la tasa pisada: el dato todavía no está verificado.
export default definirCasos(calculadora, [
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
