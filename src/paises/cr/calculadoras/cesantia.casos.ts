import { definirCasos } from "@/motor/calculo";
import cesantia from "./cesantia";

export default definirCasos(cesantia, [
  {
    nombre: "Cinco años y siete meses cuentan como seis",
    origen: {
      tipo: "recalculado",
      detalle: "Del 1/3/2021 al 30/9/2026: 5 años y 7 meses. La fracción pasa de 6 meses: 6 años. Fila 6 del art. 29: 21,5 días × 6 = 129 días. 600.000 / 30 = 20.000; × 129 = 2.580.000.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 600000, fechaIngreso: "2021-03-01", fechaSalida: "2026-09-30" },
    esperado: { aniosComputables: 6, diasPorAnio: 21.5, dias: 129, cesantia: 2580000 },
  },
  {
    nombre: "Diez años y ocho meses: tope de ocho años",
    origen: {
      tipo: "recalculado",
      detalle: "Del 4/1/2016 al 30/9/2026: 10 años, 8 meses y 27 días, cuentan 11. Fila 11: 21 días. Tope del inciso 4: 8 años. 21 × 8 = 168 días; × 20.000 = 3.360.000.",
    },
    fecha: "2026-10-07",
    entrada: { salario: 600000, fechaIngreso: "2016-01-04", fechaSalida: "2026-09-30" },
    esperado: { aniosComputables: 11, diasPorAnio: 21, dias: 168, cesantia: 3360000 },
  },
  {
    nombre: "Fracción de seis meses justos no suma",
    origen: { tipo: "recalculado", detalle: "Del 1/1/2023 al 30/6/2026: 3 años y 6 meses exactos. No es «fracción superior a seis meses»: 3 años. 20,5 × 3 = 61,5 días; × 20.000 = 1.230.000." },
    fecha: "2026-10-07",
    entrada: { salario: 600000, fechaIngreso: "2023-01-01", fechaSalida: "2026-06-30" },
    esperado: { aniosComputables: 3, dias: 61.5, cesantia: 1230000 },
  },
  {
    nombre: "Un año justo va por la tabla",
    origen: { tipo: "recalculado", detalle: "Del 1/3/2025 al 28/2/2026: un año exacto. Criterio aprobado: fila 1, 19,5 días. × 20.000 = 390.000." },
    fecha: "2026-10-07",
    entrada: { salario: 600000, fechaIngreso: "2025-03-01", fechaSalida: "2026-02-28" },
    esperado: { aniosComputables: 1, dias: 19.5, cesantia: 390000 },
  },
  {
    nombre: "Ocho meses: catorce días",
    origen: { tipo: "recalculado", detalle: "CT art. 29, inciso 2: más de seis meses y menos de un año, 14 días. 20.000 × 14 = 280.000." },
    fecha: "2026-10-07",
    entrada: { salario: 600000, fechaIngreso: "2026-01-01", fechaSalida: "2026-08-31" },
    esperado: { aniosComputables: null, dias: 14, cesantia: 280000 },
  },
  {
    nombre: "Trece años o más: veinte días por año",
    origen: { tipo: "recalculado", detalle: "Del 1/1/2010 al 30/9/2026: 16 años y 9 meses, cuentan 17. Fila 13 y siguientes: 20 días × 8 años = 160; × 20.000 = 3.200.000." },
    fecha: "2026-10-07",
    entrada: { salario: 600000, fechaIngreso: "2010-01-01", fechaSalida: "2026-09-30" },
    esperado: { diasPorAnio: 20, dias: 160, cesantia: 3200000 },
  },
  {
    nombre: "Salida antes del ingreso",
    origen: { tipo: "recalculado", detalle: "La función rechaza una salida anterior al ingreso." },
    fecha: "2026-10-07",
    entrada: { salario: 600000, fechaIngreso: "2026-05-01", fechaSalida: "2026-04-01" },
    esperaError: true,
  },
]);
