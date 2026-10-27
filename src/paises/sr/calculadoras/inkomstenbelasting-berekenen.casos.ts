import { definirCasos } from "@/motor/calculo";
import calculadora from "./inkomstenbelasting-berekenen";

const IB = "https://belastingdienst.sr/wp-content/uploads/2024/10/Wet-Inkomstenbelasting.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Zuiver inkomen SRD 300.000",
    origen: {
      tipo: "recalculado",
      url: IB,
      detalle: "Artikel 34: 0 tot 108.000; 42.000 × 8% = 3.360; 42.000 × 18% = 7.560; 42.000 × 28% = 11.760; 66.000 × 38% = 25.080; totaal 47.760. AOV 4% × 300.000 = 12.000.",
    },
    fecha: "2026-10-27",
    entrada: { zuiverInkomen: 300000, zestigPlus: false },
    esperado: { belasting: 47760, aovPremie: 12000, totaal: 59760, overig: 240240, gemiddeld: 15.92, marginaal: 38 },
  },
  {
    nombre: "Onder SRD 108.000 geen inkomstenbelasting",
    origen: { tipo: "recalculado", url: IB, detalle: "100.000 valt in de eerste schijf van 0%. AOV 4% = 4.000." },
    fecha: "2026-10-27",
    entrada: { zuiverInkomen: 100000, zestigPlus: false },
    esperado: { belasting: 0, aovPremie: 4000, marginaal: 0 },
  },
  {
    nombre: "SRD 160.000, 60 jaar of ouder",
    origen: { tipo: "recalculado", url: IB, detalle: "3.360 + 10.000 × 18% = 5.160. Geen AOV-premie vanaf 60 jaar." },
    fecha: "2026-10-27",
    entrada: { zuiverInkomen: 160000, zestigPlus: true },
    esperado: { belasting: 5160, aovPremie: 0, marginaal: 18 },
  },
]);
