import { definirCasos } from "@/motor/calculo";
import liquidacion from "./liquidacion";

const base = { region: "general", diasPendientes: 0, vacacionesPendientes: 0, diasAguinaldo: null, prima: null, sueldo: 15000, periodo: "mensual", ingreso: "2023-03-01", salida: "2026-09-30" } as const;

export default definirCasos(liquidacion, [
  {
    nombre: "Despido injustificado con tres años y medio",
    origen: {
      tipo: "recalculado",
      detalle:
        "Diario 500. Indemnización 500 × 3 × 30 = 45000. Prima de antigüedad con el diario (500, debajo del tope de 2 × 315.04): 500 × 12 × (3 + 214/365) = 21517.81. Finiquito 5609.59 + 5276.71 + 1319.18 = 12205.48. Exento: 4 años (más de seis meses cuenta como año) × 90 × 117.31 = 42231.60. Total 78723.29.",
    },
    fecha: "2026-10-07",
    entrada: { ...base, sdi: null, veinteDias: false },
    esperado: { indemnizacion: 45000, veinteDias: 0, primaAntiguedad: 21517.81, finiquito: 12205.48, exento: 42231.6, total: 78723.29 },
  },
  {
    nombre: "Con salario integrado y los días por año",
    origen: {
      tipo: "recalculado",
      detalle: "SDI 550. Indemnización 550 × 90 = 49500. Días por año 550 × 20 × 3.586301 = 39449.32. Prima 21517.81. Separación 110467.13; más finiquito 12205.48 = 122672.61.",
    },
    fecha: "2026-10-07",
    entrada: { ...base, sdi: 550, veinteDias: true },
    esperado: { sdi: 550, indemnizacion: 49500, veinteDias: 39449.32, primaAntiguedad: 21517.81, total: 122672.61 },
  },
  {
    nombre: "SDI menor al salario diario se ignora",
    origen: { tipo: "recalculado", detalle: "El SDI no puede ser menor que el salario diario: se usa 500. Indemnización 45000." },
    fecha: "2026-10-07",
    entrada: { ...base, sdi: 100, veinteDias: false },
    esperado: { sdi: 500, indemnizacion: 45000 },
  },
]);
