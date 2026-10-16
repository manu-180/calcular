import { definirCasos } from "@/motor/calculo";
import calculadora from "./post-office-rd-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "₹10,000 a month at 6.7%",
    origen: {
      tipo: "recalculado",
      detalle: "Sum of 10,000 × (1 + 0.067 / 4)^(k / 3) for k = 1 to 60 months left: 7,13,658.29. Deposited 6,00,000.",
    },
    fecha: "2026-10-15",
    entrada: { cuota: 10000 },
    esperado: { madurez: 713658.29, invertido: 600000, interes: 113658.29 },
  },
  {
    nombre: "₹1,000 a month",
    origen: { tipo: "recalculado", detalle: "Same formula: 71,365.83." },
    fecha: "2026-10-15",
    entrada: { cuota: 1000 },
    esperado: { madurez: 71365.83 },
  },
]);
