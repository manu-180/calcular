import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "BND 1,000 from January 2021",
    origen: { tipo: "oficial", url: "https://www.deps.gov.bn/consumer-price-index-3/", detalle: "CPI of January 2021 is 101.9 and of September 2026 is 106.2: 1,000 x 106.2 / 101.9 = 1,042.20." },
    fecha: "2026-10-29",
    entrada: { importe: 1000, anio: 2021, mes: 1 },
    esperado: { actualizado: 1042.2, diferencia: 42.2, indiceInicial: 101.9, indiceActual: 106.2, periodo: "January 2021 to September 2026" },
  },
  {
    nombre: "BND 1,000 from January 2025",
    origen: { tipo: "oficial", url: "https://www.deps.gov.bn/consumer-price-index-3/", detalle: "CPI of January 2025 is 105.9: 1,000 x 106.2 / 105.9 = 1,002.83." },
    fecha: "2026-10-29",
    entrada: { importe: 1000, anio: 2025, mes: 1 },
    esperado: { actualizado: 1002.83 },
  },
  {
    nombre: "Month with no CPI figure",
    origen: { tipo: "recalculado", detalle: "December 2024 is left out of the series." },
    fecha: "2026-10-29",
    entrada: { importe: 1000, anio: 2024, mes: 12 },
    esperaError: true,
  },
  {
    nombre: "Month of the latest figure",
    origen: { tipo: "recalculado", detalle: "The starting month must be before September 2026." },
    fecha: "2026-10-29",
    entrada: { importe: 1000, anio: 2026, mes: 9 },
    esperaError: true,
  },
]);
