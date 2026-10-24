import { definirCasos } from "@/motor/calculo";
import calculadora from "./maternity-benefit-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Salario mínimo de confección",
    origen: { tipo: "recalculado", detalle: "Art. 48(2) reformado en 2026: 12,500 / 26 = 480.77 por día; × 120 = 57,692.31; la mitad antes del parto 28,846.15." },
    fecha: "2026-10-24",
    entrada: { salario: 12500 },
    esperado: { diaria: 480.77, total: 57692.31, dias: 120, antes: 28846.15 },
  },
  {
    nombre: "26,000 al mes",
    origen: { tipo: "recalculado", detalle: "26,000 / 26 = 1,000 por día; × 120 = 1,20,000." },
    fecha: "2026-10-24",
    entrada: { salario: 26000 },
    esperado: { diaria: 1000, total: 120000 },
  },
]);
