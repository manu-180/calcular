import { definirCasos } from "@/motor/calculo";
import calculadora from "./sick-leave-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "10 sick days after a year of service",
    origen: { tipo: "recalculado", url: "https://new.kenyalaw.org/akn/ke/act/2007/11/eng@2024-04-26", detalle: "7 days at full pay and 3 at half pay. 2,000 × 7 + 1,000 × 3 = 17,000." },
    fecha: "2026-10-17",
    entrada: { meses: 12, dias: 10, sueldo: 60000, divisor: "30" },
    esperado: { completos: 7, medios: 3, sinPaga: 0, paga: 17000 },
  },
  {
    nombre: "20 sick days",
    origen: { tipo: "recalculado", detalle: "7 full, 7 half, 6 without legal sick pay." },
    fecha: "2026-10-17",
    entrada: { meses: 24, dias: 20, sueldo: null, divisor: "30" },
    esperado: { completos: 7, medios: 7, sinPaga: 6, paga: null },
  },
  {
    nombre: "One month of service",
    origen: { tipo: "recalculado", detalle: "Sick leave starts after two consecutive months." },
    fecha: "2026-10-17",
    entrada: { meses: 1, dias: 4, sueldo: null, divisor: "30" },
    esperado: { completos: 0, medios: 0, sinPaga: 4 },
  },
]);
