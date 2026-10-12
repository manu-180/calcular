import { definirCasos } from "@/motor/calculo";
import indemnizacionAntesDe1995 from "./indemnizacion-antes-de-1995";

export default definirCasos(indemnizacionAntesDe1995, [
  {
    nombre: "Treinta años desde enero de 1995",
    origen: {
      tipo: "recalculado",
      detalle:
        "Art. 225, acápite B, combinado: primer año 12 ÷ 3 = 4 semanas; segundo año 12 ÷ 2 = 6; de dos a diez años 8 × 3 = 24; veinte años más × 1 = 20. Total 54 semanas × 300 = 16,200.",
    },
    fecha: "2026-10-12",
    entrada: { salario: 1300, fechaIngreso: "1995-01-02", fechaSalida: "2025-01-01" },
    esperado: { semanas: 54, indemnizacion: 16200 },
  },
  {
    nombre: "Seis meses en 1991",
    origen: { tipo: "recalculado", detalle: "Menos de un año: una semana por cada tres meses. 6 ÷ 3 = 2 semanas × 300 = 600." },
    fecha: "2026-10-12",
    entrada: { salario: 1300, fechaIngreso: "1990-10-13", fechaSalida: "1991-04-12" },
    esperado: { semanas: 2, indemnizacion: 600 },
  },
  {
    nombre: "Un mes: mínimo de una semana",
    origen: { tipo: "recalculado", detalle: "1 ÷ 3 = 0.33 semanas, pero el mínimo es una semana: 300." },
    fecha: "2026-10-12",
    entrada: { salario: 1300, fechaIngreso: "1994-01-03", fechaSalida: "1994-02-02" },
    esperado: { semanas: 1, indemnizacion: 300 },
  },
  {
    nombre: "Ingreso después de la Ley 44",
    origen: { tipo: "recalculado", detalle: "Desde el 14/8/1995 rige el acápite C." },
    fecha: "2026-10-12",
    entrada: { salario: 1300, fechaIngreso: "1996-01-01", fechaSalida: "2026-10-12" },
    esperaError: true,
  },
]);
