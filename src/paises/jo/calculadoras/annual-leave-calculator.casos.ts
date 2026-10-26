import { definirCasos } from "@/motor/calculo";
import calculadora from "./annual-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Dos años, año completo",
    origen: { tipo: "recalculado", detalle: "14 días. 600 / 30 = 20 por día; 14 × 20 = 280." },
    fecha: "2026-10-24",
    entrada: { salario: 600, anios: 2, diasTrabajados: 365, tomados: 0 },
    esperado: { porAnio: 14, saldo: 14, pago: 280, diario: 20 },
  },
  {
    nombre: "Cinco años: 21 días",
    origen: { tipo: "recalculado", detalle: "21 días, 5 usados: saldo 16 × 30 (900 / 30) = 480." },
    fecha: "2026-10-24",
    entrada: { salario: 900, anios: 5, diasTrabajados: 365, tomados: 5 },
    esperado: { porAnio: 21, saldo: 16, pago: 480 },
  },
  {
    nombre: "Fracción de año",
    origen: { tipo: "recalculado", detalle: "14 × 73 / 365 = 2,8 días; 2,8 × 20 = 56." },
    fecha: "2026-10-24",
    entrada: { salario: 600, anios: 0.2, diasTrabajados: 73, tomados: 0 },
    esperado: { acumulados: 2.8, saldo: 2.8, pago: 56 },
  },
]);
