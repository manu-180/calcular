import { definirCasos } from "@/motor/calculo";
import calculadora from "./sick-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "20 días sin hospital",
    origen: { tipo: "recalculado", detalle: "Tope 14. Pagados 14 × 20 = 280; 6 de más." },
    fecha: "2026-10-24",
    entrada: { salario: 600, dias: 20, hospital: false },
    esperado: { pagados: 14, restantes: 6, pago: 280, tope: 14 },
  },
  {
    nombre: "20 días con hospital",
    origen: { tipo: "recalculado", detalle: "Tope 14 + 14 = 28. Pagados 20 × 20 = 400." },
    fecha: "2026-10-24",
    entrada: { salario: 600, dias: 20, hospital: true },
    esperado: { pagados: 20, restantes: 0, pago: 400, tope: 28 },
  },
  {
    nombre: "Sin días",
    origen: { tipo: "recalculado", detalle: "Cero días." },
    fecha: "2026-10-24",
    entrada: { salario: 600, dias: 0, hospital: false },
    esperaError: true,
  },
]);
