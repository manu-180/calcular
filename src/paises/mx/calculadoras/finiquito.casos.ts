import { definirCasos } from "@/motor/calculo";
import finiquito from "./finiquito";

const base = { region: "general", diasPendientes: 0, vacacionesPendientes: 0, diasAguinaldo: null, prima: null } as const;

export default definirCasos(finiquito, [
  {
    nombre: "Renuncia con tres años y medio",
    origen: {
      tipo: "recalculado",
      detalle:
        "Diario 500. 10 días sin pagar: 5000. Aguinaldo 500 × 15 × 273 / 365 = 5609.59. Vacaciones del cuarto año (18 días) × 214 / 365 × 500 = 5276.71; prima 25 % = 1319.18. Sin prima de antigüedad (menos de 15 años). Total 17205.48.",
    },
    fecha: "2026-10-07",
    entrada: { ...base, motivo: "renuncia", sueldo: 15000, periodo: "mensual", ingreso: "2023-03-01", salida: "2026-09-30", diasPendientes: 10 },
    esperado: { antiguedad: 3.59, salarios: 5000, aguinaldo: 5609.59, vacaciones: 5276.71, primaVacacional: 1319.18, primaAntiguedad: 0, total: 17205.48 },
  },
  {
    nombre: "Despido con diez años: prima de antigüedad topada",
    origen: {
      tipo: "recalculado",
      detalle:
        "Diario 1000, tope 2 × 315.04 = 630.08. Antigüedad 10 + 167/365 años. Prima 630.08 × 12 × 10.457534 = 79069.00. Aguinaldo 1000 × 15 × 181 / 365 = 7438.36. Vacaciones del año 11 (24 días) × 167 / 365 × 1000 = 10980.82; prima 2745.21. Total 100233.39.",
    },
    fecha: "2026-07-01",
    entrada: { ...base, motivo: "despido", sueldo: 30000, periodo: "mensual", ingreso: "2016-01-15", salida: "2026-06-30" },
    esperado: { aguinaldo: 7438.36, vacaciones: 10980.82, primaVacacional: 2745.21, primaAntiguedad: 79069, total: 100233.39 },
  },
  {
    nombre: "Renuncia el día que cumple 15 años, en la frontera norte",
    origen: {
      tipo: "recalculado",
      detalle:
        "Diario 300, debajo del mínimo de la frontera (440.87): la prima se calcula con 440.87 (LFT art. 485). 440.87 × 12 × (15 + 1/365) = 79371.09. Aguinaldo 300 × 15 × 182 / 365 = 2243.84. Vacaciones del año 16 (26 días) × 1/365 × 300 = 21.37; prima 5.34. Total 81641.64.",
    },
    fecha: "2026-07-02",
    entrada: { ...base, motivo: "renuncia", region: "frontera-norte", sueldo: 300, periodo: "diario", ingreso: "2011-07-01", salida: "2026-07-01" },
    esperado: { primaAntiguedad: 79371.09, aguinaldo: 2243.84, vacaciones: 21.37, primaVacacional: 5.34, total: 81641.64 },
  },
  {
    nombre: "Salida antes del ingreso",
    origen: { tipo: "recalculado", detalle: "Fechas imposibles." },
    fecha: "2026-07-02",
    entrada: { ...base, motivo: "renuncia", sueldo: 10000, periodo: "mensual", ingreso: "2026-05-01", salida: "2026-04-01" },
    esperaError: true,
  },
]);
