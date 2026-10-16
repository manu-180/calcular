import { definirCasos } from "@/motor/calculo";
import calculadora from "./groeipakket-berekenen";

const BRON = "https://www.vlaanderen.be/vlaams-groeipakket/bedragen-en-betaaldata" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Twee kinderen, gezinsinkomen € 60.000",
    origen: { tipo: "recalculado", url: BRON, detalle: "2 × 190,66 = 381,32 per maand, geen sociale toeslag boven 49.023,71. Schoolbonus 23,82 + 41,70 = 65,52. Per jaar 381,32 × 12 + 65,52 = 4.641,36." },
    fecha: "2026-10-14",
    entrada: { jong: 1, ouder: 1, totaal: 2, inkomen: 60000, geboorte: 0 },
    esperado: { perMaand: 381.32, toeslag: 0, schoolbonus: 65.52, perJaar: 4641.36 },
  },
  {
    nombre: "Groot gezin met een laag inkomen",
    origen: { tipo: "oficial", url: BRON, detalle: "3 of meer kinderen, inkomen lager dan 42.020,32: sociale toeslag 111,83 per kind. 2 × (190,66 + 111,83) = 604,98." },
    fecha: "2026-10-14",
    entrada: { jong: 2, ouder: 0, totaal: 3, inkomen: 40000, geboorte: 0 },
    esperado: { basis: 381.32, toeslag: 223.66, perMaand: 604.98 },
  },
  {
    nombre: "Eén kind, inkomen tussen de twee grenzen",
    origen: { tipo: "oficial", url: BRON, detalle: "1 of 2 kinderen, inkomen tussen 42.020,32 en 49.023,71: 38,53 per kind. 190,66 + 38,53 = 229,19." },
    fecha: "2026-10-14",
    entrada: { jong: 1, ouder: 0, totaal: 1, inkomen: 45000, geboorte: 0 },
    esperado: { perMaand: 229.19 },
  },
  {
    nombre: "Startbedrag voor een baby op komst",
    origen: { tipo: "oficial", url: BRON, detalle: "Startbedrag 1.310,75 euro (eenmalig)." },
    fecha: "2026-10-14",
    entrada: { jong: 0, ouder: 0, totaal: 1, inkomen: 60000, geboorte: 1 },
    esperado: { startbedrag: 1310.75, perMaand: 0 },
  },
  {
    nombre: "Meer kinderen ingevuld dan het totaal",
    origen: { tipo: "recalculado", detalle: "Het totaal kan niet kleiner zijn dan de ingevulde kinderen." },
    fecha: "2026-10-14",
    entrada: { jong: 2, ouder: 1, totaal: 2, inkomen: 60000, geboorte: 0 },
    esperaError: true,
  },
]);
