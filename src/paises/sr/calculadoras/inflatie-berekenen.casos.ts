import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflatie-berekenen";

export default definirCasos(calculadora, [
  {
    nombre: "September 2025 tot september 2026",
    origen: {
      tipo: "oficial",
      url: "https://statistics-suriname.org/wp-content/uploads/2026/10/CPI-SHEET-0926.pdf",
      detalle: "ABS: september 2026 (979,7, voorlopig) tegenover september 2025 (913,12) is 7,3% hoger. 1.000 × 979,7 / 913,12 = 1.072,91.",
    },
    fecha: "2026-10-27",
    entrada: { bedrag: 1000, van: "2025-09-01", tot: "2026-09-30" },
    esperado: { nieuwBedrag: 1072.91, jaar: 7.2915, indexBegin: 913.12, indexEind: 979.7 },
    tolerancia: 0.01,
  },
  {
    nombre: "Januari 2020 tot augustus 2026",
    origen: { tipo: "recalculado", url: "https://statistics-suriname.org/wp-content/uploads/2026/09/Suriname_CPI_new_GDDS-08-2026.xlsx", detalle: "1.000 × 978,68 / 144,3 = 6.782,26." },
    fecha: "2026-10-27",
    entrada: { bedrag: 1000, van: "2020-01-15", tot: "2026-08-01" },
    esperado: { nieuwBedrag: 6782.26, indexBegin: 144.3, indexEind: 978.68 },
  },
  {
    nombre: "Maand zonder CPI",
    origen: { tipo: "recalculado", detalle: "Het ABS publiceerde geen CPI voor mei 2018." },
    fecha: "2026-10-27",
    entrada: { bedrag: 1000, van: "2018-05-01", tot: "2026-08-01" },
    esperaError: true,
  },
]);
