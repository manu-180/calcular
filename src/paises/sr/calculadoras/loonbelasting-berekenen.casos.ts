import { definirCasos } from "@/motor/calculo";
import calculadora from "./loonbelasting-berekenen";

const WLB = "https://belastingdienst.sr/wp-content/uploads/2024/10/Wet-Loonbelasting.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "SRD 20.000 per maand",
    origen: {
      tipo: "recalculado",
      url: WLB,
      detalle: "240.000 per jaar; aftrek 4.800; zuiver 235.200; belastbaar 127.200; 3.360 + 7.560 + 11.760 + 1.200 × 38% (456) = 23.136 per jaar = 1.928 per maand; 1.928 / 20.000 = 9,64%.",
    },
    fecha: "2026-10-27",
    entrada: { loon: 20000, periode: "maand", pensioenpremie: 0 },
    esperado: { belasting: 1928, belastingPerJaar: 23136, aftrek: 400, zuiverLoon: 19600, vrijeSom: 9000, belastbaarLoon: 10600, gemiddeld: 9.64, marginaal: 38 },
  },
  {
    nombre: "SRD 150.000 per jaar",
    origen: { tipo: "recalculado", url: WLB, detalle: "Aftrek 4% = 6.000, maximum 4.800; zuiver 145.200; belastbaar 37.200 × 8% = 2.976." },
    fecha: "2026-10-27",
    entrada: { loon: 150000, periode: "jaar", pensioenpremie: 0 },
    esperado: { belasting: 2976, marginaal: 8, belastbaarLoon: 37200 },
  },
  {
    nombre: "Onder de vrije som",
    origen: { tipo: "recalculado", url: WLB, detalle: "9.000 per maand: zuiver 8.640 < 9.000, geen loonbelasting." },
    fecha: "2026-10-27",
    entrada: { loon: 9000, periode: "maand", pensioenpremie: 0 },
    esperado: { belasting: 0, marginaal: 0 },
  },
  {
    nombre: "Met pensioenpremie",
    origen: { tipo: "recalculado", url: WLB, detalle: "21.000 − 1.000 = 20.000 per maand, dus dezelfde belasting als zonder premie bij 20.000: 1.928." },
    fecha: "2026-10-27",
    entrada: { loon: 21000, periode: "maand", pensioenpremie: 1000 },
    esperado: { belasting: 1928 },
  },
]);
