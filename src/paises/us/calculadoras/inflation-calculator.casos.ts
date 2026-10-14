import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

const BLS = "https://data.bls.gov/timeseries/CUUR0000SA0" as const;

export default definirCasos(calculadora, [
  {
    nombre: "$100 from January 2020 to January 2025",
    origen: { tipo: "recalculado", url: BLS, detalle: "CPI-U 317.671 / 257.971 = 1.23142. 100 becomes 123.14, 23.14% in five years." },
    fecha: "2026-10-14",
    entrada: { monto: 100, desde: "2020-01-15", hasta: "2025-01-01" },
    esperado: { ajustado: 123.14, diferencia: 23.14, acumulada: 23.14, anual: 4.25, indiceInicial: 257.971, indiceFinal: 317.671, mesInicial: "January 2020" },
  },
  {
    nombre: "End month after the latest CPI uses the latest one",
    origen: { tipo: "recalculado", url: BLS, detalle: "Latest CPI on October 14, 2026 is August 2026: 334.980. 1000 x 334.98 / 168.8 = 1984.48." },
    fecha: "2026-10-14",
    entrada: { monto: 1000, desde: "2000-01-01", hasta: "2026-10-14" },
    esperado: { ajustado: 1984.48, diferencia: 984.48, mesFinal: "August 2026", indiceFinal: 334.98 },
  },
  {
    nombre: "October 2025 has no CPI",
    origen: { tipo: "recalculado", url: BLS, detalle: "BLS skipped October 2025 during the shutdown." },
    fecha: "2026-10-14",
    entrada: { monto: 100, desde: "2025-10-10", hasta: "2026-08-01" },
    esperaError: true,
  },
  {
    nombre: "Less than a year shows no yearly average",
    origen: { tipo: "recalculado", url: BLS, detalle: "324.122 / 324.8 = 0.99791. 500 becomes 498.96." },
    fecha: "2026-10-14",
    entrada: { monto: 500, desde: "2025-09-01", hasta: "2025-11-30" },
    esperado: { ajustado: 498.96, anual: null },
  },
]);
