import { definirCasos } from "@/motor/calculo";
import liquidacion from "./liquidacion-de-beneficios-sociales";

export default definirCasos(liquidacion, [
  {
    nombre: "Renuncia el 15/10/2026 tras dos años y medio en el régimen general",
    origen: {
      tipo: "recalculado",
      detalle:
        "CTS trunca del 1/5 al 15/10: 5 meses y 15 días. Remuneración computable 2,000 + 2,000 / 6 = 2,333.33; 2,333.33 / 12 × 5 + 2,333.33 / 360 × 15 = 1,069.44. Gratificación trunca: julio, agosto y setiembre completos, 2,000 × 3 / 6 = 1,000; 9 % = 90. Vacaciones truncas desde el aniversario del 1/3/2026: 7 meses y 15 días, 2,000 / 12 × 7 + 2,000 / 360 × 15 = 1,250. Total 3,409.44.",
    },
    fecha: "2026-10-15",
    entrada: {
      fechaIngreso: "2024-03-01",
      fechaCese: "2026-10-15",
      sueldo: 2000,
      asignacionFamiliar: false,
      variable: null,
      ultimaGratificacion: 2000,
      diasPendientes: 0,
      regimen: "general",
      seguro: "essalud",
    },
    esperado: { mesesCts: 5, diasCts: 15, ctsTrunca: 1069.44, mesesGrati: 3, gratificacion: 1000, bonificacion: 90, vacacionesTruncas: 1250, total: 3409.44 },
  },
  {
    nombre: "Menos de un mes de trabajo",
    origen: { tipo: "recalculado", detalle: "Del 1/10 al 20/10/2026: no hay mes completo, así que no hay CTS, gratificación ni vacaciones truncas." },
    fecha: "2026-10-20",
    entrada: {
      fechaIngreso: "2026-10-01",
      fechaCese: "2026-10-20",
      sueldo: 1500,
      asignacionFamiliar: false,
      variable: null,
      ultimaGratificacion: null,
      diasPendientes: 0,
      regimen: "general",
      seguro: "essalud",
    },
    esperado: { ctsTrunca: 0, gratificacion: 0, vacacionesTruncas: 0, total: 0 },
  },
  {
    nombre: "Microempresa: solo vacaciones",
    origen: {
      tipo: "recalculado",
      detalle: "15 días por año (DL 1086, art. 46): remuneración vacacional 1,500 × 15 / 30 = 750; 6 meses desde el 1/1/2026 = 375. Más 15 días pendientes: 1,500 / 30 × 15 = 750. Total 1,125.",
    },
    fecha: "2026-06-30",
    entrada: {
      fechaIngreso: "2025-01-01",
      fechaCese: "2026-06-30",
      sueldo: 1500,
      asignacionFamiliar: false,
      variable: null,
      ultimaGratificacion: null,
      diasPendientes: 15,
      regimen: "micro",
      seguro: "essalud",
    },
    esperado: { ctsTrunca: 0, gratificacion: 0, vacacionesTruncas: 375, vacacionesPendientes: 750, total: 1125 },
  },
  {
    nombre: "Pequeña empresa con ingreso a mitad de mes",
    origen: {
      tipo: "recalculado",
      detalle:
        "Del 15/1 al 30/4/2026. CTS: 17 días de enero + 3 meses (febrero a abril); 2,400 × 0.5 / 12 × 3 + 2,400 × 0.5 / 360 × 17 = 356.67. Gratificación: 3 meses completos, 2,400 × 0.5 × 3 / 6 = 600; 9 % = 54. Vacaciones: 3 meses y 16 días con 15 días por año, 1,200 / 12 × 3 + 1,200 / 360 × 16 = 353.33. Total 1,364.",
    },
    fecha: "2026-04-30",
    entrada: {
      fechaIngreso: "2026-01-15",
      fechaCese: "2026-04-30",
      sueldo: 2400,
      asignacionFamiliar: false,
      variable: null,
      ultimaGratificacion: null,
      diasPendientes: 0,
      regimen: "pequena",
      seguro: "essalud",
    },
    esperado: { mesesCts: 3, diasCts: 17, ctsTrunca: 356.67, gratificacion: 600, bonificacion: 54, vacacionesTruncas: 353.33, total: 1364 },
  },
  {
    nombre: "Cese antes del ingreso",
    origen: { tipo: "recalculado", detalle: "La función rechaza fechas invertidas." },
    fecha: "2026-10-15",
    entrada: {
      fechaIngreso: "2026-10-15",
      fechaCese: "2026-10-01",
      sueldo: 1500,
      asignacionFamiliar: false,
      variable: null,
      ultimaGratificacion: null,
      diasPendientes: 0,
      regimen: "general",
      seguro: "essalud",
    },
    esperaError: true,
  },
]);
