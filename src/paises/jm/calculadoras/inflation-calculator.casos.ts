import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "J$10,000 with September 2026 inflation",
    origen: {
      tipo: "oficial",
      url: "https://wups.statinja.gov.jm/WUP/20261015_CPI_8e6311f3-6b95-461d-be10-e554a3773ece.pdf",
      detalle: "Point-to-point inflation September 2025 to September 2026: 8.6%. 10,000 × 1.086 = 10,860.",
    },
    fecha: "2026-10-25",
    entrada: { importe: 10000 },
    esperado: { actualizado: 10860, diferencia: 860, tasa: 8.6, periodo: "September 2025 to September 2026" },
  },
  {
    nombre: "In July 2026, with the July figure",
    origen: { tipo: "oficial", url: "https://wups.statinja.gov.jm/WUP/20260817_CPI_57cdd370-f1ab-4753-91d1-c94a507fcb54.pdf", detalle: "July 2026: 7.5%." },
    fecha: "2026-07-20",
    entrada: { importe: 20000 },
    esperado: { actualizado: 21500, tasa: 7.5 },
  },
]);
