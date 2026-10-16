import { definirCasos } from "@/motor/calculo";
import calculadora from "./registratierechten-berekenen";

const BRON = "https://www.vlaanderen.be/belastingen-en-begroting/vlaamse-belastingen/registratiebelasting/verkooprecht/tarieven-in-het-verkooprecht/het-verkooprecht-bij-de-aankoop-van-de-enige-eigen-woning-overzicht" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Enige eigen woning van € 300.000",
    origen: { tipo: "recalculado", url: BRON, detalle: "2 % × 300.000 = 6.000. Boven 220.000, dus geen vermindering." },
    fecha: "2026-10-14",
    entrada: { prijs: 300000, soort: "enige-eigen-woning", kern: false },
    esperado: { rechten: 6000, tarief: 2, vermindering: 0 },
  },
  {
    nombre: "Bescheiden enige eigen woning van € 200.000",
    origen: { tipo: "recalculado", url: BRON, detalle: "2 % × 200.000 = 4.000 − 1.867 = 2.133." },
    fecha: "2026-10-14",
    entrada: { prijs: 200000, soort: "enige-eigen-woning", kern: false },
    esperado: { bruto: 4000, vermindering: 1867, rechten: 2133 },
  },
  {
    nombre: "Woning van € 230.000 in een kernstad",
    origen: { tipo: "recalculado", url: BRON, detalle: "Grens in kernsteden 240.000. 2 % × 230.000 = 4.600 − 1.867 = 2.733." },
    fecha: "2026-10-14",
    entrada: { prijs: 230000, soort: "enige-eigen-woning", kern: true },
    esperado: { rechten: 2733 },
  },
  {
    nombre: "Tweede woning van € 300.000",
    origen: { tipo: "recalculado", detalle: "Algemeen tarief 12 % × 300.000 = 36.000." },
    fecha: "2026-10-14",
    entrada: { prijs: 300000, soort: "andere", kern: false },
    esperado: { rechten: 36000, tarief: 12 },
  },
]);
