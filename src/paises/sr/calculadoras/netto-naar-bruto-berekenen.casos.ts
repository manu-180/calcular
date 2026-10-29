import { definirCasos } from "@/motor/calculo";
import calculadora from "./netto-naar-bruto-berekenen";

const WLB = "https://belastingdienst.sr/wp-content/uploads/2024/10/Wet-Loonbelasting.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Netto SRD 13.758 is bruto SRD 15.000",
    origen: { tipo: "recalculado", url: WLB, detalle: "Omgekeerde van de bruto netto berekening: 15.000 − 658 loonbelasting − 584 AOV = 13.758." },
    fecha: "2026-10-27",
    entrada: { netto: 13758, zestigPlus: false },
    esperado: { bruto: 15000, loonbelasting: 658, aovPremie: 584 },
    tolerancia: 0.01,
  },
  {
    nombre: "Netto SRD 7.692,80 is bruto SRD 8.000",
    origen: { tipo: "recalculado", url: WLB, detalle: "8.000 − 307,20 AOV = 7.692,80; geen loonbelasting." },
    fecha: "2026-10-27",
    entrada: { netto: 7692.8, zestigPlus: false },
    esperado: { bruto: 8000, loonbelasting: 0 },
    tolerancia: 0.01,
  },
  {
    nombre: "Hoog loon, 60 jaar of ouder",
    origen: { tipo: "recalculado", url: WLB, detalle: "Zonder AOV: bruto 31.812 × 12 = 381.744; zuiver 376.944; belastbaar 268.944; 22.680 + 142.944 × 38% = 76.998,72 per jaar = 6.416,56 per maand; netto 25.395,44." },
    fecha: "2026-10-27",
    entrada: { netto: 25395.44, zestigPlus: true },
    esperado: { bruto: 31812, aovPremie: 0 },
    tolerancia: 0.01,
  },
]);
