import { definirCasos } from "@/motor/calculo";
import trabajoDomestico from "./trabajo-domestico";

export default definirCasos(trabajoDomestico, [
  {
    nombre: "Cuatro años en la Región 1 con el mínimo",
    origen: {
      tipo: "recalculado",
      detalle:
        "Mínimo Región 1: 350 (D. E. 13 de 2025). Cuatro años justos caen en el tramo de cuatro a seis años: tres meses de salario (art. 231, num. 4, lit. e) = 1,050. Día: 350 × 12 ÷ 52 ÷ 6 = 13.46; feriado con 100% de recargo = 26.92.",
    },
    fecha: "2026-10-12",
    entrada: { region: "region-1", salario: 350, fechaIngreso: "2022-10-13", fechaSalida: "2026-10-12" },
    esperado: { minimo: 350, diario: 13.46, feriado: 26.92, indemnizacion: 1050 },
  },
  {
    nombre: "Seis meses en la Región 2",
    origen: { tipo: "recalculado", detalle: "De tres meses a un año: dos semanas de salario. 320 × 12 ÷ 52 = 73.85 × 2 = 147.69." },
    fecha: "2026-10-12",
    entrada: { region: "region-2", salario: 320, fechaIngreso: "2026-04-13", fechaSalida: "2026-10-12" },
    esperado: { minimo: 320, indemnizacion: 147.69 },
  },
  {
    nombre: "Una semana: todavía en prueba",
    origen: { tipo: "recalculado", detalle: "Menos de dos semanas: no hay indemnización." },
    fecha: "2026-10-12",
    entrada: { region: "region-1", salario: 400, fechaIngreso: "2026-10-05", fechaSalida: "2026-10-12" },
    esperado: { indemnizacion: 0 },
  },
  {
    nombre: "Veintidós años",
    origen: { tipo: "recalculado", detalle: "Veinte años o más: siete meses de salario. 400 × 7 = 2,800." },
    fecha: "2026-10-12",
    entrada: { region: "region-1", salario: 400, fechaIngreso: "2004-10-13", fechaSalida: "2026-10-12" },
    esperado: { indemnizacion: 2800 },
  },
]);
