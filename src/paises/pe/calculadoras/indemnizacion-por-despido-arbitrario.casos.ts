import { definirCasos } from "@/motor/calculo";
import despido from "./indemnizacion-por-despido-arbitrario";

const base = { asignacionFamiliar: false, variable: null, mesesFaltantes: 0, diasFaltantes: 0 } as const;

export default definirCasos(despido, [
  {
    nombre: "Seis años y medio a plazo indeterminado",
    origen: { tipo: "recalculado", detalle: "DS 003-97-TR, art. 38: 1.5 remuneraciones por año y dozavos por los meses. 1.5 × 3,000 × 6.5 = 29,250 (292.5 remuneraciones diarias de 100)." },
    fecha: "2026-06-30",
    entrada: { ...base, contrato: "indeterminado", fechaIngreso: "2020-01-01", fechaCese: "2026-06-30", sueldo: 3000, regimen: "general" },
    esperado: { anios: 6, meses: 6, dias: 0, remuneracionesDiarias: 292.5, indemnizacion: 29250 },
  },
  {
    nombre: "Tope de 12 remuneraciones",
    origen: { tipo: "recalculado", detalle: "16.5 años × 1.5 = 24.75 remuneraciones; el tope es 12: 12 × 3,000 = 36,000." },
    fecha: "2026-06-30",
    entrada: { ...base, contrato: "indeterminado", fechaIngreso: "2010-01-01", fechaCese: "2026-06-30", sueldo: 3000, regimen: "general" },
    esperado: { remuneracionesDiarias: 360, indemnizacion: 36000 },
  },
  {
    nombre: "Años, meses y días en el régimen general",
    origen: { tipo: "recalculado", detalle: "Del 1/3/2024 al 15/10/2026: 2 años, 7 meses y 15 días. 45 × (2 + 7/12 + 15/360) = 118.125 diarias × 80 = 9,450." },
    fecha: "2026-10-15",
    entrada: { ...base, contrato: "indeterminado", fechaIngreso: "2024-03-01", fechaCese: "2026-10-15", sueldo: 2400, regimen: "general" },
    esperado: { anios: 2, meses: 7, dias: 15, indemnizacion: 9450 },
  },
  {
    nombre: "Pequeña empresa: 20 remuneraciones diarias por año",
    origen: { tipo: "recalculado", detalle: "DL 1086, art. 47: 3.5 años × 20 = 70 diarias × 80 = 5,600." },
    fecha: "2026-06-30",
    entrada: { ...base, contrato: "indeterminado", fechaIngreso: "2023-01-01", fechaCese: "2026-06-30", sueldo: 2400, regimen: "pequena" },
    esperado: { remuneracionesDiarias: 70, indemnizacion: 5600 },
  },
  {
    nombre: "Microempresa con tope de 90 diarias",
    origen: { tipo: "recalculado", detalle: "16.5 años × 10 = 165 diarias; tope 90 × 50 = 4,500." },
    fecha: "2026-06-30",
    entrada: { ...base, contrato: "indeterminado", fechaIngreso: "2010-01-01", fechaCese: "2026-06-30", sueldo: 1500, regimen: "micro" },
    esperado: { remuneracionesDiarias: 90, indemnizacion: 4500 },
  },
  {
    nombre: "Plazo fijo: faltaban 4 meses",
    origen: { tipo: "recalculado", detalle: "DS 003-97-TR, art. 76: 1.5 × 2,000 × 4 = 12,000." },
    fecha: "2026-06-30",
    entrada: { ...base, contrato: "plazo-fijo", fechaIngreso: "2026-01-01", fechaCese: "2026-06-30", sueldo: 2000, regimen: "general", mesesFaltantes: 4 },
    esperado: { remuneracionesDiarias: 180, indemnizacion: 12000 },
  },
  {
    nombre: "Despido durante el periodo de prueba",
    origen: { tipo: "recalculado", detalle: "Menos de tres meses de servicio: no corresponde indemnización (DS 003-97-TR, art. 38)." },
    fecha: "2026-10-15",
    entrada: { ...base, contrato: "indeterminado", fechaIngreso: "2026-08-01", fechaCese: "2026-10-15", sueldo: 2000, regimen: "general" },
    esperado: { indemnizacion: 0 },
  },
]);
