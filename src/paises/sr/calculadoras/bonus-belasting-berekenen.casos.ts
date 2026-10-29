import { definirCasos } from "@/motor/calculo";
import calculadora from "./bonus-belasting-berekenen";

const WLB = "https://belastingdienst.sr/wp-content/uploads/2024/10/Wet-Loonbelasting.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Bonus van SRD 20.000 bij SRD 15.000 per maand",
    origen: {
      tipo: "recalculado",
      url: WLB,
      detalle: "Vrij tot een maandloon: 15.000; belast 5.000. Jaarbelasting zonder bonus (180.000) 7.896, met bonus (185.000): zuiver 180.200, belastbaar 72.200, 3.360 + 30.200 × 18% = 8.796. Verschil 900. AOV 4% × 5.000 = 200. Netto 18.900.",
    },
    fecha: "2026-10-27",
    entrada: { maandloon: 15000, bonus: 20000, zestigPlus: false },
    esperado: { netto: 18900, vrijgesteld: 15000, belastbaar: 5000, loonbelasting: 900, aovPremie: 200 },
  },
  {
    nombre: "Bonus van SRD 30.000 bij SRD 30.000 per maand",
    origen: {
      tipo: "recalculado",
      url: "https://www.sris.sr/wp-content/uploads/2025/11/S.B.-2025-no.-129-STAATSBESLUIT-ter-uitvoering-van-artikel-18a-van-de-Wet-Loonbelasting.pdf",
      detalle: "Vrij tot 19.500; belast 10.500. Zonder bonus: belastbaar 247.200, 22.680 + 121.200 × 38% = 68.736. Met bonus: belastbaar 257.700, 22.680 + 131.700 × 38% = 72.726. Verschil 3.990. AOV 420. Netto 25.590.",
    },
    fecha: "2026-10-27",
    entrada: { maandloon: 30000, bonus: 30000, zestigPlus: false },
    esperado: { netto: 25590, vrijgesteld: 19500, belastbaar: 10500, loonbelasting: 3990, aovPremie: 420 },
  },
  {
    nombre: "Kleine bonus is helemaal vrij",
    origen: { tipo: "recalculado", detalle: "5.000 is minder dan het maandloon en het maximum: geen loonbelasting en geen AOV." },
    fecha: "2026-10-27",
    entrada: { maandloon: 15000, bonus: 5000, zestigPlus: false },
    esperado: { netto: 5000, belastbaar: 0, loonbelasting: 0, aovPremie: 0 },
  },
]);
