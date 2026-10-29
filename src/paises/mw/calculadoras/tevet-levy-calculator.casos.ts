import { definirCasos } from "@/motor/calculo";
import calculadora from "./tevet-levy-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "K60,000,000 basic payroll",
    origen: { tipo: "recalculado", detalle: "1% of 60,000,000 = 600,000; 12 instalments of 50,000; penalty 20% = 120,000." },
    fecha: "2026-10-27",
    entrada: { nomina: 60000000 },
    esperado: { levy: 600000, mensual: 50000, multa: 120000 },
  },
  {
    nombre: "K1,250,000 basic payroll",
    origen: { tipo: "recalculado", detalle: "1% = 12,500; 12,500 / 12 = 1,041.67." },
    fecha: "2026-10-27",
    entrada: { nomina: 1250000 },
    esperado: { levy: 12500, mensual: 1041.67, multa: 2500 },
  },
  {
    nombre: "Zero payroll is rejected",
    origen: { tipo: "recalculado", detalle: "The payroll has to be above zero." },
    fecha: "2026-10-27",
    entrada: { nomina: 0 },
    esperaError: true,
  },
]);
