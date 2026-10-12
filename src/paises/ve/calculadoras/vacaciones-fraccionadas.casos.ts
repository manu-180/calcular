import { definirCasos } from "@/motor/calculo";
import vacacionesFraccionadas from "./vacaciones-fraccionadas";

export default definirCasos(vacacionesFraccionadas, [
  {
    nombre: "Dos años y seis meses con $300",
    origen: {
      tipo: "recalculado",
      detalle:
        "LOTTT arts. 190, 192 y 196. Año en curso: el 3.º, con 17 días de vacaciones y 17 de bono. 6 meses: 17 × 6 / 12 = 8,5 días de cada uno. Diario 10: 85 + 85 = 170.",
    },
    fecha: "2026-10-12",
    entrada: { moneda: "USD", salario: 300, fechaIngreso: "2024-01-01", fechaSalida: "2026-06-30" },
    esperado: { mesesFraccion: 6, diasVacaciones: 8.5, diasBono: 8.5, vacacionesUsd: 85, bonoUsd: 85, totalUsd: 170, totalBs: null },
  },
  {
    nombre: "Primer año: 4 meses y 6 días en bolívares",
    origen: { tipo: "recalculado", detalle: "Del 15/01 al 20/05: 4 meses completos. 15 × 4 / 12 = 5 días de cada uno. Bs 3.000 / 30 = 100: 500 + 500 = 1.000." },
    fecha: "2026-10-12",
    entrada: { moneda: "VES", salario: 3000, fechaIngreso: "2026-01-15", fechaSalida: "2026-05-20" },
    esperado: { mesesFraccion: 4, diasVacaciones: 5, diasBono: 5, totalBs: 1000 },
  },
  {
    nombre: "Menos de un mes: no hay fracción",
    origen: { tipo: "recalculado", detalle: "El art. 196 pide meses completos: 0 meses da 0." },
    fecha: "2026-10-12",
    entrada: { moneda: "USD", salario: 300, fechaIngreso: "2026-09-01", fechaSalida: "2026-09-25" },
    esperado: { mesesFraccion: 0, totalUsd: 0 },
  },
  {
    nombre: "Salida anterior al ingreso",
    origen: { tipo: "recalculado", detalle: "Entrada imposible." },
    fecha: "2026-10-12",
    entrada: { moneda: "USD", salario: 300, fechaIngreso: "2026-09-01", fechaSalida: "2026-08-01" },
    esperaError: true,
  },
]);
