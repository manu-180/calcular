import { definirCasos } from "@/motor/calculo";
import ctsTrunca from "./cts-trunca";

const base = { asignacionFamiliar: false, variable: null, regimen: "general" } as const;

export default definirCasos(ctsTrunca, [
  {
    nombre: "Renuncia el 15/10/2026 tras dos años y medio (igual que la liquidación)",
    origen: {
      tipo: "recalculado",
      detalle: "DS 001-97-TR: periodo del 1/5 al 15/10, 5 meses y 15 días. Remuneración computable 2,000 + 2,000 / 6 = 2,333.33; 2,333.33 / 12 × 5 + 2,333.33 / 360 × 15 = 1,069.44.",
    },
    fecha: "2026-10-15",
    entrada: { ...base, fechaIngreso: "2024-03-01", fechaCese: "2026-10-15", sueldo: 2000, ultimaGratificacion: 2000 },
    esperado: { meses: 5, dias: 15, remuneracion: 2333.33, cts: 1069.44 },
  },
  {
    nombre: "Salida en febrero: el periodo empieza en noviembre del año anterior",
    origen: {
      tipo: "recalculado",
      detalle: "Del 1/11/2026 al 28/2/2027: 4 meses. Remuneración 1,230 + 123 = 1,353 (RMV del DS 015-2026-TR); 1,353 / 12 × 4 = 451.",
    },
    fecha: "2027-02-28",
    entrada: { ...base, asignacionFamiliar: true, fechaIngreso: "2025-06-01", fechaCese: "2027-02-28", sueldo: 1230, ultimaGratificacion: null },
    esperado: { meses: 4, dias: 0, remuneracion: 1353, cts: 451 },
  },
  {
    nombre: "Pequeña empresa, ingreso a mitad del periodo",
    origen: { tipo: "recalculado", detalle: "Del 10/6 al 31/8/2026: 10/6 a 30/6 son 21 días, julio y agosto completos. 3,600 × 0.5 = 1,800; 1,800 / 12 × 2 + 1,800 / 360 × 21 = 300 + 105 = 405." },
    fecha: "2026-08-31",
    entrada: { ...base, regimen: "pequena", fechaIngreso: "2026-06-10", fechaCese: "2026-08-31", sueldo: 3600, ultimaGratificacion: null },
    esperado: { meses: 2, dias: 21, cts: 405 },
  },
  {
    nombre: "Menos de un mes de trabajo",
    origen: { tipo: "recalculado", detalle: "Del 1/10 al 25/10/2026: no llega a un mes, no hay CTS." },
    fecha: "2026-10-25",
    entrada: { ...base, fechaIngreso: "2026-10-01", fechaCese: "2026-10-25", sueldo: 2000, ultimaGratificacion: null },
    esperado: { cts: 0 },
  },
  {
    nombre: "Microempresa: no corresponde",
    origen: { tipo: "recalculado", detalle: "DL 1086: la microempresa no deposita CTS." },
    fecha: "2026-10-15",
    entrada: { ...base, regimen: "micro", fechaIngreso: "2024-03-01", fechaCese: "2026-10-15", sueldo: 2000, ultimaGratificacion: null },
    esperado: { cts: 0 },
  },
]);
