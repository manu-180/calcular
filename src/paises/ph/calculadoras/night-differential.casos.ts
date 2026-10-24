import { definirCasos } from "@/motor/calculo";
import calculadora from "./night-differential";

export default definirCasos(calculadora, [
  {
    nombre: "Full night shift on an ordinary day at ₱800",
    origen: { tipo: "recalculado", detalle: "Hourly 100, differential 10% = 10 an hour, 8 hours = 80. Twenty nights = 1,600." },
    fecha: "2026-10-16",
    entrada: { diario: 800, dia: "ordinary", horas: 8, noches: 20 },
    esperado: { porHora: 10, porNoche: 80, total: 1600, tasa: 10 },
  },
  {
    nombre: "Night work on a regular holiday",
    origen: { tipo: "recalculado", detalle: "Holiday hourly 100 × 200% = 200; 10% = 20 an hour; 6 hours = 120." },
    fecha: "2026-10-16",
    entrada: { diario: 800, dia: "regular-holiday", horas: 6, noches: 1 },
    esperado: { porHora: 20, porNoche: 120, horaDia: 200 },
  },
  {
    nombre: "More than 8 hours",
    origen: { tipo: "recalculado", detalle: "Overtime hours belong in the overtime calculator." },
    fecha: "2026-10-16",
    entrada: { diario: 800, dia: "ordinary", horas: 9, noches: 1 },
    esperaError: true,
  },
]);
