import { definirCasos } from "@/motor/calculo";
import vacacionesTruncas from "./vacaciones-truncas";

const base = { asignacionFamiliar: false, variable: null, regimen: "general", diasPendientes: 0 } as const;

export default definirCasos(vacacionesTruncas, [
  {
    nombre: "Siete meses y quince días desde el aniversario (igual que la liquidación)",
    origen: {
      tipo: "recalculado",
      detalle: "DL 713, art. 22: aniversario 1/3/2026, salida 15/10/2026: 7 meses y 15 días. 2,000 / 12 × 7 + 2,000 / 360 × 15 = 1,166.67 + 83.33 = 1,250.",
    },
    fecha: "2026-10-15",
    entrada: { ...base, fechaIngreso: "2024-03-01", fechaCese: "2026-10-15", sueldo: 2000 },
    esperado: { aniosCompletos: 2, meses: 7, dias: 15, truncas: 1250, total: 1250 },
  },
  {
    nombre: "Pequeña empresa con 15 días por año y vacaciones pendientes",
    origen: {
      tipo: "recalculado",
      detalle: "DL 1086: 15 días por año. Remuneración vacacional 3,000 × 15 / 30 = 1,500. Del 1/4/2026 al 30/9/2026: 6 meses, 1,500 / 12 × 6 = 750. Más 15 días pendientes: 3,000 / 30 × 15 = 1,500. Total 2,250.",
    },
    fecha: "2026-09-30",
    entrada: { ...base, regimen: "pequena", fechaIngreso: "2025-04-01", fechaCese: "2026-09-30", sueldo: 3000, diasPendientes: 15 },
    esperado: { diasPorAnio: 15, meses: 6, truncas: 750, pendientes: 1500, total: 2250 },
  },
  {
    nombre: "Con asignación familiar y la RMV nueva",
    origen: { tipo: "recalculado", detalle: "1,230 + 123 = 1,353. Del 1/1/2026 al 31/10/2026: 10 meses. 1,353 / 12 × 10 = 1,127.50." },
    fecha: "2026-10-31",
    entrada: { ...base, asignacionFamiliar: true, fechaIngreso: "2026-01-01", fechaCese: "2026-10-31", sueldo: 1230 },
    esperado: { meses: 10, truncas: 1127.5 },
  },
  {
    nombre: "Menos de un mes",
    origen: { tipo: "recalculado", detalle: "Del 1/10 al 20/10/2026 no hay un mes completo: no hay truncas." },
    fecha: "2026-10-20",
    entrada: { ...base, fechaIngreso: "2026-10-01", fechaCese: "2026-10-20", sueldo: 2000 },
    esperado: { truncas: 0, total: 0 },
  },
]);
