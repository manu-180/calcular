import { definirCasos } from "@/motor/calculo";
import feriadoTrabajado from "./feriado-trabajado";

export default definirCasos(feriadoTrabajado, [
  {
    nombre: "Feriado completo de día",
    origen: { tipo: "recalculado", detalle: "CT art. 340: el duplo del salario de la jornada ordinaria. 15000 / 30 = 500; 500 × 2 = 1000." },
    fecha: "2026-10-12",
    entrada: { salario: 15000, jornada: "diurna", horas: 8 },
    esperado: { salarioDiario: 500, factor: 2, pago: 1000 },
  },
  {
    nombre: "Medio feriado de día",
    origen: { tipo: "recalculado", detalle: "Art. 340: en proporción al tiempo trabajado. 500 × 2 × 4 / 8 = 500." },
    fecha: "2026-10-12",
    entrada: { salario: 15000, jornada: "diurna", horas: 4 },
    esperado: { pago: 500 },
  },
  {
    nombre: "Jornada nocturna completa",
    origen: { tipo: "recalculado", detalle: "Jornada nocturna de 6 horas (art. 322): 500 × 2 × 6 / 6 = 1000." },
    fecha: "2026-10-12",
    entrada: { salario: 15000, jornada: "nocturna", horas: 6 },
    esperado: { pago: 1000 },
  },
  {
    nombre: "Más horas que la jornada",
    origen: { tipo: "recalculado", detalle: "Las horas por encima de la jornada son extra (art. 330) y se calculan aparte." },
    fecha: "2026-10-12",
    entrada: { salario: 15000, jornada: "mixta", horas: 9 },
    esperaError: true,
  },
]);
