import { definirCasos } from "@/motor/calculo";
import calculadora from "./inflation-calculator";

export default definirCasos(calculadora, [
  {
    nombre: "Ushs 100,000 with September 2026 inflation",
    origen: {
      tipo: "recalculado",
      url: "https://www.ubos.org/wp-content/uploads/publications/09_2026CPI_Press_Release_September_2026.pdf",
      detalle: "UBOS: annual headline inflation 4.6% for the 12 months to September 2026. 100,000 × 1.046 = 104,600.",
    },
    fecha: "2026-10-24",
    entrada: { importe: 100000 },
    esperado: { actualizado: 104600, diferencia: 4600, tasa: 4.6, periodo: "September 2025 to September 2026" },
  },
  {
    nombre: "August 2026 figure",
    origen: { tipo: "recalculado", detalle: "At a date in August 2026 the series point used is August 2026: 4.1%. 250,000 × 1.041 = 260,250." },
    fecha: "2026-08-20",
    entrada: { importe: 250000 },
    esperado: { actualizado: 260250, tasa: 4.1 },
  },
]);
