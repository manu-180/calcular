import { definirCasos } from "@/motor/calculo";
import calculadora from "./employer-cost";

export default definirCasos(calculadora, [
  {
    nombre: "₱25,000 salary",
    origen: {
      tipo: "recalculado",
      detalle: "SSS ER 2,500 + EC 30 = 2,530. PhilHealth 1,250 / 2 = 625. Pag-IBIG 200. Contributions 3,355, cost 28,355 (13.42% of salary).",
    },
    fecha: "2026-10-16",
    entrada: { sueldo: 25000, empleados: 1 },
    esperado: { sss: 2530, philhealth: 625, pagibig: 200, cargas: 3355, mensual: 28355, porcentaje: 13.42 },
    tolerancia: 0.01,
  },
  {
    nombre: "Five employees on ₱15,000",
    origen: {
      tipo: "recalculado",
      detalle: "SSS ER 1,500 + EC 30 = 1,530. PhilHealth 750 / 2 = 375. Pag-IBIG 200. Cost 17,105 each, 85,525 for five.",
    },
    fecha: "2026-10-16",
    entrada: { sueldo: 15000, empleados: 5 },
    esperado: { mensual: 17105, total: 85525 },
  },
  {
    nombre: "Zero salary",
    origen: { tipo: "recalculado", detalle: "Not valid." },
    fecha: "2026-10-16",
    entrada: { sueldo: 0, empleados: 1 },
    esperaError: true,
  },
]);
