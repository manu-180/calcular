import { definirCasos } from "@/motor/calculo";
import calculadora from "./bruto-netto-salaris";

const WLB = "https://belastingdienst.sr/wp-content/uploads/2024/10/Wet-Loonbelasting.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "SRD 15.000 per maand",
    origen: {
      tipo: "recalculado",
      url: WLB,
      detalle: "Jaarloon 180.000; aftrek 4% = 7.200, maximum 4.800; zuiver loon 175.200; belastbaar 175.200 − 108.000 = 67.200; belasting 42.000 × 8% + 25.200 × 18% = 7.896 per jaar = 658 per maand. AOV 4% × 14.600 = 584. Netto 15.000 − 658 − 584 = 13.758.",
    },
    fecha: "2026-10-27",
    entrada: { brutoloon: 15000, pensioenpremie: 0, zestigPlus: false },
    esperado: { netto: 13758, loonbelasting: 658, aovPremie: 584, zuiverLoon: 14600, belastbaarLoon: 5600 },
  },
  {
    nombre: "SRD 8.000 per maand blijft onder de belastingvrije som",
    origen: { tipo: "recalculado", url: WLB, detalle: "Jaarloon 96.000; aftrek 3.840; zuiver loon 92.160 < 108.000, dus geen loonbelasting. AOV 4% × 7.680 = 307,20. Netto 7.692,80." },
    fecha: "2026-10-27",
    entrada: { brutoloon: 8000, pensioenpremie: 0, zestigPlus: false },
    esperado: { netto: 7692.8, loonbelasting: 0, aovPremie: 307.2 },
  },
  {
    nombre: "SRD 40.000 met SRD 1.000 pensioenpremie",
    origen: {
      tipo: "recalculado",
      url: WLB,
      detalle: "Loon 39.000 × 12 = 468.000; aftrek 4.800; zuiver 463.200; belastbaar 355.200; 3.360 + 7.560 + 11.760 + 229.200 × 38% (87.096) = 109.776 per jaar = 9.148 per maand. AOV 4% × 38.600 = 1.544. Netto 40.000 − 1.000 − 9.148 − 1.544 = 28.308.",
    },
    fecha: "2026-10-27",
    entrada: { brutoloon: 40000, pensioenpremie: 1000, zestigPlus: false },
    esperado: { netto: 28308, loonbelasting: 9148, aovPremie: 1544, pensioen: 1000 },
  },
  {
    nombre: "60 jaar of ouder: geen AOV-premie",
    origen: { tipo: "recalculado", detalle: "Artikel 19 Wet AOV: premieplichtig tot 60 jaar. Loonbelasting 658, netto 15.000 − 658 = 14.342." },
    fecha: "2026-10-27",
    entrada: { brutoloon: 15000, pensioenpremie: 0, zestigPlus: true },
    esperado: { netto: 14342, aovPremie: 0 },
  },
  {
    nombre: "Pensioenpremie hoger dan het loon",
    origen: { tipo: "recalculado", detalle: "Invoer die niet kan." },
    fecha: "2026-10-27",
    entrada: { brutoloon: 1000, pensioenpremie: 2000, zestigPlus: false },
    esperaError: true,
  },
]);
