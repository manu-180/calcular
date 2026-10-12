import { definirCasos } from "@/motor/calculo";
import gratificacionTrunca from "./gratificacion-trunca";

const base = { asignacionFamiliar: false, variable: null, regimen: "general", seguro: "essalud" } as const;

export default definirCasos(gratificacionTrunca, [
  {
    nombre: "Renuncia el 20/10/2026 con S/ 2,400 de sueldo",
    origen: {
      tipo: "recalculado",
      detalle: "Ley 27735: un sexto por mes calendario completo. Del semestre julio a diciembre cuentan julio, agosto y setiembre: 2,400 × 3 / 6 = 1,200. Bonificación del 9 % (Ley 30334) = 108. Total 1,308.",
    },
    fecha: "2026-10-20",
    entrada: { ...base, fechaIngreso: "2023-02-01", fechaCese: "2026-10-20", sueldo: 2400 },
    esperado: { meses: 3, gratificacion: 1200, bonificacion: 108, total: 1308 },
  },
  {
    nombre: "Ingreso a mitad de mes y asignación familiar con la RMV nueva",
    origen: {
      tipo: "recalculado",
      detalle: "Ingreso 15/8/2026 y salida 31/10/2026: solo setiembre y octubre son completos. Remuneración 1,500 + 123 = 1,623; 1,623 × 2 / 6 = 541; 9 % = 48.69; total 589.69.",
    },
    fecha: "2026-10-31",
    entrada: { ...base, asignacionFamiliar: true, fechaIngreso: "2026-08-15", fechaCese: "2026-10-31", sueldo: 1500 },
    esperado: { meses: 2, remuneracion: 1623, gratificacion: 541, bonificacion: 48.69, total: 589.69 },
  },
  {
    nombre: "Pequeña empresa con EPS, salida en mayo",
    origen: { tipo: "recalculado", detalle: "Enero a abril completos (4 meses). Media remuneración (DL 1086): 3,000 × 0.5 × 4 / 6 = 1,000; 6.75 % = 67.50; total 1,067.50." },
    fecha: "2026-05-10",
    entrada: { ...base, regimen: "pequena", seguro: "eps", fechaIngreso: "2025-03-01", fechaCese: "2026-05-10", sueldo: 3000 },
    esperado: { meses: 4, gratificacion: 1000, bonificacion: 67.5, total: 1067.5 },
  },
  {
    nombre: "Menos de un mes completo en el semestre",
    origen: { tipo: "recalculado", detalle: "Salida el 25/7/2026: julio no está completo, no hay gratificación trunca." },
    fecha: "2026-07-25",
    entrada: { ...base, fechaIngreso: "2025-01-01", fechaCese: "2026-07-25", sueldo: 2000 },
    esperado: { meses: 0, total: 0 },
  },
  {
    nombre: "Microempresa: no corresponde",
    origen: { tipo: "recalculado", detalle: "DL 1086: la microempresa no paga gratificación." },
    fecha: "2026-10-20",
    entrada: { ...base, regimen: "micro", fechaIngreso: "2025-01-01", fechaCese: "2026-10-20", sueldo: 2000 },
    esperado: { total: 0 },
  },
  {
    nombre: "Fecha de salida anterior al ingreso",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-20",
    entrada: { ...base, fechaIngreso: "2026-10-01", fechaCese: "2026-09-01", sueldo: 2000 },
    esperaError: true,
  },
]);
