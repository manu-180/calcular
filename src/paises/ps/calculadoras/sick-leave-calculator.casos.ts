import { definirCasos } from "@/motor/calculo";
import calculadora from "./sick-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Veinte días",
    origen: { tipo: "recalculado", detalle: "Art. 79: 14 días completos × 100 = 1.400; 6 días a la mitad × 50 = 300; total 1.700." },
    fecha: "2026-10-29",
    entrada: { salario: 3000, dias: 20 },
    esperado: { total: 1700, completos: 14, medios: 6, sinPago: 0, descuento: 300 },
  },
  {
    nombre: "Treinta y cinco días",
    origen: { tipo: "recalculado", detalle: "14 × 100 + 14 × 50 = 2.100; 7 días sin pago; diferencia 3.500 − 2.100 = 1.400." },
    fecha: "2026-10-29",
    entrada: { salario: 3000, dias: 35 },
    esperado: { total: 2100, medios: 14, sinPago: 7, descuento: 1400 },
  },
  {
    nombre: "Diez días",
    origen: { tipo: "recalculado", detalle: "10 × 2.400 / 30 = 800, todo a sueldo completo." },
    fecha: "2026-10-29",
    entrada: { salario: 2400, dias: 10 },
    esperado: { total: 800, medios: 0, descuento: 0 },
  },
]);
