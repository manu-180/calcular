import { definirCasos } from "@/motor/calculo";
import calculadora from "./erfbelasting-berekenen";

const BRON = "https://www.vlaanderen.be/belastingen-en-begroting/vlaamse-belastingen/erfbelasting/tarieven-in-de-erfbelasting/algemeen-tarief-in-de-erfbelasting" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Erfenis van je moeder: 150.000 onroerend en 50.000 roerend",
    origen: { tipo: "oficial", url: BRON, detalle: "Voorbeeld van de Vlaamse Belastingdienst: roerend 50.000 × 3 % = 1.500; onroerend 1.500 + 100.000 × 9 % = 10.500; samen 12.000." },
    fecha: "2026-10-14",
    entrada: { relatie: "rechte-lijn", roerend: 50000, onroerend: 150000 },
    esperado: { opRoerend: 1500, opOnroerend: 10500, belasting: 12000, netto: 188000 },
  },
  {
    nombre: "Broer erft 150.000 van zijn zus",
    origen: { tipo: "oficial", url: BRON, detalle: "Voorbeeld van de Vlaamse Belastingdienst: 35.000 × 25 % = 8.750; 40.000 × 30 % = 12.000; 75.000 × 55 % = 41.250; samen 62.000." },
    fecha: "2026-10-14",
    entrada: { relatie: "broer-zus", roerend: 150000, onroerend: 0 },
    esperado: { belasting: 62000, opRoerend: null },
  },
  {
    nombre: "Neef erft alleen 100.000",
    origen: { tipo: "recalculado", url: BRON, detalle: "35.000 × 25 % = 8.750; 40.000 × 45 % = 18.000; 25.000 × 55 % = 13.750; samen 40.500." },
    fecha: "2026-10-14",
    entrada: { relatie: "andere", roerend: 60000, onroerend: 40000 },
    esperado: { belasting: 40500 },
  },
  {
    nombre: "Niets geërfd",
    origen: { tipo: "recalculado", detalle: "Zonder erfdeel valt er niets te berekenen." },
    fecha: "2026-10-14",
    entrada: { relatie: "rechte-lijn", roerend: 0, onroerend: 0 },
    esperaError: true,
  },
]);
