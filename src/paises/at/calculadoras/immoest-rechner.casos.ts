import { definirCasos } from "@/motor/calculo";
import immoestRechner from "./immoest-rechner";

const IMMO = "https://www.usp.gv.at/themen/steuern-finanzen/weitere-steuern-und-abgaben/immobilienertragsteuer.html";

export default definirCasos(immoestRechner, [
  {
    nombre: "Wohnung mit 150.000 Euro Gewinn",
    origen: { tipo: "recalculado", url: IMMO, detalle: "400.000 − 250.000 = 150.000 Gewinn; 30 % = 45.000." },
    fecha: "2026-10-14",
    entrada: { verkaufspreis: 400000, anschaffung: 250000, aufwendungen: null },
    esperado: { gewinn: 150000, steuer: 45000, nachSteuer: 355000 },
  },
  {
    nombre: "Mit Instandsetzungskosten",
    origen: { tipo: "recalculado", url: IMMO, detalle: "400.000 − 250.000 − 30.000 = 120.000; 30 % = 36.000." },
    fecha: "2026-10-14",
    entrada: { verkaufspreis: 400000, anschaffung: 250000, aufwendungen: 30000 },
    esperado: { gewinn: 120000, steuer: 36000 },
  },
  {
    nombre: "Verkauf mit Verlust",
    origen: { tipo: "recalculado", url: IMMO, detalle: "Kein Gewinn, keine Steuer." },
    fecha: "2026-10-14",
    entrada: { verkaufspreis: 200000, anschaffung: 250000, aufwendungen: null },
    esperado: { gewinn: 0, steuer: 0 },
  },
]);
