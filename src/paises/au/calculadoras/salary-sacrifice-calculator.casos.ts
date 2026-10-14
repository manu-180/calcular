import { definirCasos } from "@/motor/calculo";
import calculadora from "./salary-sacrifice-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "$100,000 salary, $10,000 sacrificed",
    origen: {
      tipo: "recalculado",
      detalle: "Tax + Medicare at 100,000: 20,520 + 2,000 = 22,520; at 90,000: 17,520 + 1,800 = 19,320. Saving 3,200. Fund tax 15% = 1,500. Net 1,700. Take-home falls 6,800. Employer SG 12,000; room 32,500 − 12,000 = 20,500.",
    },
    fecha: "2026-10-14",
    entrada: { salario: 100000, sacrificio: 10000 },
    esperado: { ahorroImpuesto: 3200, impuestoFondo: 1500, beneficio: 1700, menosEnMano: 6800, alFondo: 8500, aporteEmpleador: 12000, espacio: 20500, exceso: 0 },
  },
  {
    nombre: "$150,000 salary, $15,000 sacrificed, over the cap",
    origen: {
      tipo: "recalculado",
      detalle: "At 150,000: 31,020 + 15,000 × 37% = 36,570 + 3,000 = 39,570. At 135,000: 31,020 + 2,700 = 33,720. Saving 5,850; fund tax 2,250; net 3,600. SG 18,000 + 15,000 = 33,000, 500 over the 32,500 cap.",
    },
    fecha: "2026-10-14",
    entrada: { salario: 150000, sacrificio: 15000 },
    esperado: { ahorroImpuesto: 5850, impuestoFondo: 2250, beneficio: 3600, aporteEmpleador: 18000, espacio: 14500, exceso: 500 },
  },
  {
    nombre: "Sacrifice larger than salary",
    origen: { tipo: "recalculado", detalle: "The function rejects a sacrifice above the salary." },
    fecha: "2026-10-14",
    entrada: { salario: 50000, sacrificio: 60000 },
    esperaError: true,
  },
]);
