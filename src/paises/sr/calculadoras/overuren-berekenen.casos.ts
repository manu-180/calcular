import { definirCasos } from "@/motor/calculo";
import calculadora from "./overuren-berekenen";

const ARB = "https://www.dna.sr/media/cwabf0np/arbeidswet.pdf";
const SB = "https://www.sris.sr/wp-content/uploads/2025/11/S.B.-2025-no.-129-STAATSBESLUIT-ter-uitvoering-van-artikel-18a-van-de-Wet-Loonbelasting.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "10 overuren op werkdagen tegen SRD 100",
    origen: { tipo: "recalculado", url: ARB, detalle: "Artikel 12 Arbeidswet: minstens 1,5 × uurloon. 100 × 1,5 × 10 = 1.500. Artikel 17c (S.B. 2025 no. 129): 1.500 × 5% = 75." },
    fecha: "2026-10-27",
    entrada: { uurloon: 100, urenWerkdag: 10, urenRustdag: 0, apartBelast: true },
    esperado: { bruto: 1500, werkdag: 1500, rustdag: 0, belasting: 75, naBelasting: 1425 },
  },
  {
    nombre: "Werkdagen en rustdagen, alle drie de schijven",
    origen: {
      tipo: "recalculado",
      url: SB,
      detalle: "200 × 1,5 × 20 = 6.000 en 200 × 2 × 10 = 4.000; samen 10.000. Belasting 2.500 × 5% + 5.000 × 15% + 2.500 × 25% = 125 + 750 + 625 = 1.500.",
    },
    fecha: "2026-10-27",
    entrada: { uurloon: 200, urenWerkdag: 20, urenRustdag: 10, apartBelast: true },
    esperado: { bruto: 10000, werkdag: 6000, rustdag: 4000, belasting: 1500, naBelasting: 8500 },
  },
  {
    nombre: "Oude schijven voor juli 2025",
    origen: {
      tipo: "recalculado",
      url: "https://belastingdienst.sr/wp-content/uploads/2024/10/Wet-Loonbelasting.pdf",
      detalle: "Tot 30 juni 2025: 500 × 5% + 600 × 15% + 8.900 × 25% = 25 + 90 + 2.225 = 2.340.",
    },
    fecha: "2025-06-30",
    entrada: { uurloon: 200, urenWerkdag: 20, urenRustdag: 10, apartBelast: true },
    esperado: { bruto: 10000, belasting: 2340 },
  },
  {
    nombre: "Zonder apart tarief",
    origen: { tipo: "recalculado", detalle: "Alleen het brutobedrag; belasting volgt de gewone loonbelasting." },
    fecha: "2026-10-27",
    entrada: { uurloon: 100, urenWerkdag: 4, urenRustdag: 0, apartBelast: false },
    esperado: { bruto: 600, belasting: null, naBelasting: null },
  },
]);
