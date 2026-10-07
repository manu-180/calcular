import { definirCasos } from "@/motor/calculo";
import preaviso from "./preaviso";

export default definirCasos(preaviso, [
  {
    nombre: "Más de un año: un mes de salario",
    origen: { tipo: "recalculado", detalle: "CT art. 28: más de un año, un mes (30 días). 600.000 / 30 = 20.000; × 30 = 600.000." },
    fecha: "2026-10-07",
    entrada: { salario: 600000, fechaIngreso: "2024-03-01", fechaSalida: "2026-09-30" },
    esperado: { dias: 30, salarioDiario: 20000, preaviso: 600000 },
  },
  {
    nombre: "Cuatro meses y medio: una semana",
    origen: { tipo: "recalculado", detalle: "Del 5/1 al 20/5/2026 son 4 meses y 16 días: una semana (7 días). 450.000 / 30 × 7 = 105.000." },
    fecha: "2026-10-07",
    entrada: { salario: 450000, fechaIngreso: "2026-01-05", fechaSalida: "2026-05-20" },
    esperado: { dias: 7, preaviso: 105000 },
  },
  {
    nombre: "Seis meses justos siguen en una semana",
    origen: { tipo: "recalculado", detalle: "Del 1/1 al 30/6/2026 son 6 meses exactos: «ni mayor de seis», 7 días. 600.000 / 30 × 7 = 140.000." },
    fecha: "2026-10-07",
    entrada: { salario: 600000, fechaIngreso: "2026-01-01", fechaSalida: "2026-06-30" },
    esperado: { dias: 7, preaviso: 140000 },
  },
  {
    nombre: "Un año justo: quince días",
    origen: { tipo: "recalculado", detalle: "Del 1/3/2025 al 28/2/2026 es un año exacto, que no es «más de un año»: 15 días. 20.000 × 15 = 300.000." },
    fecha: "2026-10-07",
    entrada: { salario: 600000, fechaIngreso: "2025-03-01", fechaSalida: "2026-02-28" },
    esperado: { dias: 15, preaviso: 300000 },
  },
  {
    nombre: "Menos de tres meses: sin preaviso",
    origen: { tipo: "recalculado", detalle: "Del 1/8 al 15/10/2026 son 2 meses y 15 días: el art. 28 empieza a los tres meses." },
    fecha: "2026-10-07",
    entrada: { salario: 600000, fechaIngreso: "2026-08-01", fechaSalida: "2026-10-15" },
    esperado: { dias: 0, preaviso: 0 },
  },
]);
