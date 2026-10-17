import { definirCasos } from "@/motor/calculo";
import calculadora from "./box-3-berekenen";

const BRON = "https://www.belastingdienst.nl/wps/wcm/connect/nl/box-3/content/berekening-box-3-inkomen-2026" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Rekenvoorbeeld Belastingdienst: € 150.000 spaargeld, zonder partner",
    origen: { tipo: "oficial", url: BRON, detalle: "Rendement 1.920; grondslag 150.000; grondslag sparen en beleggen 90.643; aandeel 60,42%; voordeel 1.160; belasting 417." },
    fecha: "2026-10-14",
    entrada: { bank: 150000, overige: 0, schulden: 0, partner: false },
    esperado: { rendement: 1920, grondslag: 150000, grondslagSparen: 90643, aandeel: 60.42, voordeel: 1160, belasting: 417 },
  },
  {
    nombre: "Rekenvoorbeeld Belastingdienst: € 150.000 spaargeld, met partner",
    origen: { tipo: "oficial", url: BRON, detalle: "Grondslag sparen en beleggen 31.286, ieder 15.643; aandeel 10,42%; voordeel 200 en belasting 72 per persoon, samen 144." },
    fecha: "2026-10-14",
    entrada: { bank: 150000, overige: 0, schulden: 0, partner: true },
    esperado: { grondslagSparen: 31286, aandeel: 10.42, voordeel: 400, belasting: 144 },
  },
  {
    nombre: "Rekenvoorbeeld Belastingdienst: verschillende soorten vermogen, zonder partner",
    origen: {
      tipo: "oficial",
      url: BRON,
      detalle: "1.920 + 16.500 − 2.598 = 15.822 rendement; grondslag 328.800; sparen en beleggen 269.443; aandeel 81,94%; voordeel 12.964; belasting 4.667.",
    },
    fecha: "2026-10-14",
    entrada: { bank: 150000, overige: 275000, schulden: 100000, partner: false },
    esperado: { rendement: 15822, grondslag: 328800, grondslagSparen: 269443, aandeel: 81.94, voordeel: 12964, belasting: 4667 },
  },
  {
    nombre: "Rekenvoorbeeld Belastingdienst: verschillende soorten vermogen, met partner",
    origen: {
      tipo: "oficial",
      url: BRON,
      detalle: "Drempel 7.600; rendement 1.920 + 16.500 − 2.495 = 15.925; grondslag 332.600; ieder 106.943; aandeel 32,15%; voordeel 5.119 en belasting 1.842 per persoon.",
    },
    fecha: "2026-10-14",
    entrada: { bank: 150000, overige: 275000, schulden: 100000, partner: true },
    esperado: { rendement: 15925, grondslag: 332600, aandeel: 32.15, voordeel: 10238, belasting: 3684 },
  },
  {
    nombre: "Onder het heffingsvrij vermogen",
    origen: { tipo: "recalculado", detalle: "€ 50.000 spaargeld blijft onder € 59.357: geen belasting." },
    fecha: "2026-10-14",
    entrada: { bank: 50000, overige: 0, schulden: 0, partner: false },
    esperado: { grondslagSparen: 0, belasting: 0 },
  },
]);
