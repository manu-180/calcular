import { definirCasos } from "@/motor/calculo";
import calculadora from "./overtime-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Básico mínimo de confección, 40 horas",
    origen: { tipo: "recalculado", detalle: "Art. 108(1): el doble. 6,700 / 208 = 32.21 por hora; extra 64.42; × 40 = 2,576.92." },
    fecha: "2026-10-24",
    entrada: { basico: 6700, horas: 40, horasMes: 208 },
    esperado: { porHora: 32.21, tasaExtra: 64.42, pago: 2576.92 },
  },
  {
    nombre: "Otra base de horas",
    origen: { tipo: "recalculado", detalle: "24,000 / 240 = 100 por hora; doble 200; 10 horas = 2,000." },
    fecha: "2026-10-24",
    entrada: { basico: 24000, horas: 10, horasMes: 240 },
    esperado: { porHora: 100, tasaExtra: 200, pago: 2000 },
  },
]);
