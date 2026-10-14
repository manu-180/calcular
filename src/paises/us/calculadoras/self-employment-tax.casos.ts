import { definirCasos } from "@/motor/calculo";
import calculadora from "./self-employment-tax";

const SE = "https://www.irs.gov/pub/irs-pdf/f1040sse.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "$50,000 of profit and no other job",
    origen: { tipo: "recalculado", url: SE, detalle: "50000 x 92.35% = 46175. 12.4% = 5725.70; 2.9% = 1339.08; SE tax 7064.78; deduction 3532.39." },
    fecha: "2026-10-14",
    entrada: { ganancia: 50000, salarios: null, estado: "single" },
    esperado: { neto: 46175, socialSecurity: 5725.7, medicare: 1339.08, impuesto: 7064.78, deduccion: 3532.39, adicional: 0, trimestral: 1766.2 },
  },
  {
    nombre: "Side business on top of a $180,000 job",
    origen: {
      tipo: "recalculado",
      url: SE,
      detalle: "Profit 40000 x 92.35% = 36940. Room under the wage base 184500 - 180000 = 4500, 12.4% = 558. Medicare 2.9% of 36940 = 1071.26. Additional: threshold 200000 - 180000 = 20000, 0.9% of 16940 = 152.46.",
    },
    fecha: "2026-10-14",
    entrada: { ganancia: 40000, salarios: 180000, estado: "single" },
    esperado: { socialSecurity: 558, medicare: 1071.26, impuesto: 1629.26, adicional: 152.46 },
  },
  {
    nombre: "Profit too small to owe SE tax",
    origen: { tipo: "recalculado", url: SE, detalle: "400 x 92.35% = 369.40, under 400." },
    fecha: "2026-10-14",
    entrada: { ganancia: 400, salarios: null, estado: "single" },
    esperado: { neto: 369.4, impuesto: 0 },
  },
]);
