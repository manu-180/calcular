import { definirCasos } from "@/motor/calculo";
import calculadora from "./notice-period";

export default definirCasos(calculadora, [
  {
    nombre: "Mensual sin preaviso cumplido",
    origen: { tipo: "recalculado", detalle: "30 días. Fin 1/11/2026 + 30 = 1/12/2026. Compensación 600 / 30 × 30 = 600." },
    fecha: "2026-10-26",
    entrada: { pago: "monthly", contrato: 0, aviso: "2026-11-01", cumplidos: 0, salario: 600, diasMes: 30 },
    esperado: { dias: 30, legal: 30, fin: "2026-12-01", faltan: 30, compensacion: 600 },
  },
  {
    nombre: "Jornal con 5 días cumplidos",
    origen: { tipo: "recalculado", detalle: "15 días, quedan 10. 450 / 30 × 10 = 150." },
    fecha: "2026-10-26",
    entrada: { pago: "other", contrato: 0, aviso: "2026-11-01", cumplidos: 5, salario: 450, diasMes: 30 },
    esperado: { dias: 15, faltan: 10, compensacion: 150 },
  },
  {
    nombre: "Contrato con 60 días",
    origen: { tipo: "recalculado", detalle: "Rige el plazo más largo: 60 días." },
    fecha: "2026-10-26",
    entrada: { pago: "monthly", contrato: 60, aviso: "2026-11-01", cumplidos: 60, salario: 600, diasMes: 30 },
    esperado: { dias: 60, faltan: 0, compensacion: 0 },
  },
]);
