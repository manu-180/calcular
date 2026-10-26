import { definirCasos } from "@/motor/calculo";
import calculadora from "./sick-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "45 días en el año",
    origen: { tipo: "recalculado", detalle: "Art. 117: 30 x 300 = 9.000 + 15 x 225 = 3.375 -> 12.375. Pierde 13.500 - 12.375 = 1.125." },
    fecha: "2026-10-24",
    entrada: { salario: 9000, dias: 45 },
    esperado: { pago: 12375, llenos: 30, parciales: 15, sinPago: 0, perdido: 1125 },
  },
  {
    nombre: "100 días: entra al tramo sin pago",
    origen: { tipo: "recalculado", detalle: "30 x 300 + 60 x 225 = 22.500; 10 sin pago." },
    fecha: "2026-10-24",
    entrada: { salario: 9000, dias: 100 },
    esperado: { pago: 22500, sinPago: 10, perdido: 7500 },
  },
  {
    nombre: "20 días, todo pago",
    origen: { tipo: "recalculado", detalle: "20 x 300 = 6.000." },
    fecha: "2026-10-24",
    entrada: { salario: 9000, dias: 20 },
    esperado: { pago: 6000, perdido: 0 },
  },
  {
    nombre: "Sin sueldo",
    origen: { tipo: "recalculado", detalle: "Sueldo 0." },
    fecha: "2026-10-24",
    entrada: { salario: 0, dias: 20 },
    esperaError: true,
  },
]);
