import { definirCasos } from "@/motor/calculo";
import trabajoDomestico from "./trabajo-domestico";

export default definirCasos(trabajoDomestico, [
  {
    nombre: "Despido sin aviso después de más de un año",
    origen: { tipo: "recalculado", detalle: "CT art. 158: con más de un año, aviso de un mes (30 días), que puede pagarse. 6000 / 30 = 200; 200 × 30 = 6000." },
    fecha: "2026-10-12",
    entrada: { salario: 6000, fechaIngreso: "2025-01-10", fechaSalida: "2026-09-30", motivo: "despido" },
    esperado: { diasAviso: 30, preaviso: 6000, total: 6000 },
  },
  {
    nombre: "Se va porque no le pagan, con 7 meses",
    origen: { tipo: "recalculado", detalle: "Art. 160: por falta de pago, siete días de salario con menos de un año. 200 × 7 = 1400." },
    fecha: "2026-10-12",
    entrada: { salario: 6000, fechaIngreso: "2026-03-01", fechaSalida: "2026-09-30", motivo: "falta-pago" },
    esperado: { diasAviso: 7, indemnizacion: 1400, total: 1400 },
  },
  {
    nombre: "Se va por maltrato",
    origen: { tipo: "recalculado", detalle: "Art. 160: por maltrato, un mes de salario (30 días). 200 × 30 = 6000." },
    fecha: "2026-10-12",
    entrada: { salario: 6000, fechaIngreso: "2026-03-01", fechaSalida: "2026-09-30", motivo: "maltrato" },
    esperado: { indemnizacion: 6000 },
  },
  {
    nombre: "Despido a los 10 días, en la prueba",
    origen: { tipo: "recalculado", detalle: "Art. 158: en los primeros 15 días el aviso es de 24 horas. 200 × 1 = 200." },
    fecha: "2026-10-12",
    entrada: { salario: 6000, fechaIngreso: "2026-09-21", fechaSalida: "2026-09-30", motivo: "despido" },
    esperado: { diasAviso: 1, preaviso: 200 },
  },
]);
