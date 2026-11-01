import { definirCasos } from "@/motor/calculo";
import calculadora from "./aov-premie-berekenen";

const AOV = "https://belastingdienst.sr/wp-content/uploads/2024/10/Wet-AOV.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Werknemer met SRD 15.000 per maand",
    origen: { tipo: "recalculado", url: AOV, detalle: "Zuiver loon 180.000 − 4.800 = 175.200 per jaar; 4% = 7.008 per jaar = 584 per maand." },
    fecha: "2026-10-27",
    entrada: { soort: "werknemer", loon: 15000, inkomen: null, zestigPlus: false },
    esperado: { perMaand: 584, perJaar: 7008, grondslag: 175200 },
  },
  {
    nombre: "Werknemer met SRD 5.000 per maand",
    origen: { tipo: "recalculado", url: AOV, detalle: "60.000 − 4% (2.400) = 57.600; 4% = 2.304 per jaar = 192 per maand." },
    fecha: "2026-10-27",
    entrada: { soort: "werknemer", loon: 5000, inkomen: null, zestigPlus: false },
    esperado: { perMaand: 192, perJaar: 2304 },
  },
  {
    nombre: "Zelfstandige met SRD 200.000 zuiver inkomen",
    origen: { tipo: "recalculado", url: AOV, detalle: "4% × 200.000 = 8.000 per jaar." },
    fecha: "2026-10-27",
    entrada: { soort: "zelfstandige", loon: null, inkomen: 200000, zestigPlus: false },
    esperado: { perJaar: 8000, perMaand: 666.67 },
  },
  {
    nombre: "60 jaar of ouder",
    origen: { tipo: "recalculado", url: AOV, detalle: "Artikel 19: premieplichtig tot 60 jaar." },
    fecha: "2026-10-27",
    entrada: { soort: "werknemer", loon: 15000, inkomen: null, zestigPlus: true },
    esperado: { perJaar: 0, perMaand: 0 },
  },
]);
