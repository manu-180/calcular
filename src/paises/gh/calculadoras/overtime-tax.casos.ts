import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-tax";

export default definirCasos(calculadora, [
  {
    nombre: "Overtime above half of basic",
    origen: { tipo: "recalculado", detalle: "Half of 2,000 = 1,000 at 5% = 50; 500 above at 10% = 50. Total 100." },
    fecha: "2026-10-18",
    entrada: { basico: 2000, extra: 1500 },
    esperado: { impuestoBajo: 50, impuestoAlto: 50, impuesto: 100, neto: 1400, tope: 1000 },
  },
  {
    nombre: "Overtime within half of basic",
    origen: { tipo: "recalculado", detalle: "600 at 5% = 30." },
    fecha: "2026-10-18",
    entrada: { basico: 2000, extra: 600 },
    esperado: { impuesto: 30, impuestoAlto: 0 },
  },
  {
    nombre: "No overtime",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-18",
    entrada: { basico: 2000, extra: 0 },
    esperaError: true,
  },
]);
