import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Un año o más",
    origen: { tipo: "recalculado", detalle: "Art. 39: 15 días. 30.000.000 / 30 × 15 = 15.000.000." },
    fecha: "2026-11-01",
    entrada: { salario: 30000000, anioCompleto: true, enfermedad: false },
    esperado: { dias: 15, pago: 15000000, diario: 1000000 },
  },
  {
    nombre: "Baja por enfermedad de más de un mes",
    origen: { tipo: "recalculado", detalle: "Art. 41: puede bajar a 8 días. 1.000.000 × 8." },
    fecha: "2026-11-01",
    entrada: { salario: 30000000, anioCompleto: true, enfermedad: true },
    esperado: { dias: 8, pago: 8000000 },
  },
  {
    nombre: "Menos de un año",
    origen: { tipo: "recalculado", detalle: "Art. 39 exige un año en la empresa." },
    fecha: "2026-11-01",
    entrada: { salario: 30000000, anioCompleto: false, enfermedad: false },
    esperado: { dias: 0, pago: 0 },
  },
]);
