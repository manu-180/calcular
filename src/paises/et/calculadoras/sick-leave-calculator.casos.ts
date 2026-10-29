import { definirCasos } from "@/motor/calculo";
import calculadora from "./sick-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "75 days of sick leave",
    origen: { tipo: "recalculado", detalle: "Daily 9,000 / 30 = 300. 30 days full: 9,000. 45 days at 50%: 6,750. Total 15,750." },
    fecha: "2026-10-27",
    entrada: { salario: 9000, dias: 75 },
    esperado: { total: 15750, completos: 30, medios: 45, sinPago: 0, perdido: 6750 },
  },
  {
    nombre: "120 days of sick leave",
    origen: { tipo: "recalculado", detalle: "30 days full 9,000 + 60 days half 9,000 = 18,000. 30 days unpaid." },
    fecha: "2026-10-27",
    entrada: { salario: 9000, dias: 120 },
    esperado: { total: 18000, medios: 60, sinPago: 30 },
  },
  {
    nombre: "10 days on full pay",
    origen: { tipo: "recalculado", detalle: "10 × 300 = 3,000." },
    fecha: "2026-10-27",
    entrada: { salario: 9000, dias: 10 },
    esperado: { total: 3000, medios: 0 },
  },
]);
