import { definirCasos } from "@/motor/calculo";
import calculadora from "./bright-line-test";

export default definirCasos(calculadora, [
  {
    nombre: "Sold within 2 years with a $40,000 profit",
    origen: {
      tipo: "recalculado",
      detalle: "Start 14 March 2025, 2 years to 13 March 2027. Agreement 14 October 2026 is inside, 151 days before 14 March 2027. Profit 800,000 − 750,000 − 10,000 = 40,000. Tax on 110,000 = 26,177.50 less tax on 70,000 = 13,220.50: 12,957.",
    },
    fecha: "2026-10-14",
    entrada: { inicio: "2025-03-14", fin: "2026-10-14", compra: 750000, venta: 800000, costos: 10000, otrosIngresos: 70000 },
    esperado: { resultado: "Inside the bright-line period", finPeriodo: "2027-03-13", diasRestantes: 151, ganancia: 40000, impuesto: 12957 },
  },
  {
    nombre: "Sold after 2 years",
    origen: { tipo: "recalculado", detalle: "Start 10 January 2024, period ends 9 January 2026. Agreement 1 February 2026 is outside." },
    fecha: "2026-10-14",
    entrada: { inicio: "2024-01-10", fin: "2026-02-01", compra: 600000, venta: 700000, costos: 0, otrosIngresos: 70000 },
    esperado: { resultado: "Outside the bright-line period", impuesto: null, ganancia: 100000 },
  },
  {
    nombre: "Last day of the period",
    origen: { tipo: "recalculado", detalle: "Start 1 August 2024, the period ends 31 July 2026. An agreement that day is inside." },
    fecha: "2026-10-14",
    entrada: { inicio: "2024-08-01", fin: "2026-07-31", compra: 500000, venta: 500000, costos: 0, otrosIngresos: 50000 },
    esperado: { resultado: "Inside the bright-line period", finPeriodo: "2026-07-31", diasRestantes: 1, impuesto: null },
  },
  {
    nombre: "Second anniversary is outside",
    origen: { tipo: "recalculado", detalle: "Start 1 August 2024. An agreement on 1 August 2026 is after the period." },
    fecha: "2026-10-14",
    entrada: { inicio: "2024-08-01", fin: "2026-08-01", compra: 500000, venta: 550000, costos: 0, otrosIngresos: 50000 },
    esperado: { resultado: "Outside the bright-line period" },
  },
  {
    nombre: "Start on 29 February",
    origen: { tipo: "recalculado", detalle: "2 years after 29 February 2024 is taken as 28 February 2026, so the period ends 27 February 2026." },
    fecha: "2026-10-14",
    entrada: { inicio: "2024-02-29", fin: "2026-02-27", compra: 500000, venta: 510000, costos: 0, otrosIngresos: 50000 },
    esperado: { resultado: "Inside the bright-line period", finPeriodo: "2026-02-27" },
  },
  {
    nombre: "Sale agreed before 1 July 2024",
    origen: { tipo: "recalculado", detalle: "Older 5 and 10 year rules apply." },
    fecha: "2026-10-14",
    entrada: { inicio: "2023-01-01", fin: "2024-06-30", compra: 500000, venta: 550000, costos: 0, otrosIngresos: 50000 },
    esperaError: true,
  },
]);
