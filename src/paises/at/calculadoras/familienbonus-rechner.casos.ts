import { definirCasos } from "@/motor/calculo";
import familienbonusRechner from "./familienbonus-rechner";

const FABO = "https://www.bmf.gv.at/themen/steuern/arbeitnehmerveranlagung/steuertarif-steuerabsetzbetraege/familienbonus-plus.html";

export default definirCasos(familienbonusRechner, [
  {
    nombre: "3.500 Euro, ein Kind, voller Bonus",
    origen: { tipo: "recalculado", url: FABO, detalle: "Tarif auf 2.867,55 Euro = 448,05; ohne Bonus 448,05 − 41,33 = 406,72; mit 166,68 Bonus 240,04. Im Jahr 12 × 166,68 = 2.000,16." },
    fecha: "2026-10-14",
    entrada: { brutto: 3500, kinderUnter18: 1, kinderAb18: 0, faboHalb: false, avabKinder: 0, wien: false },
    esperado: { wirksam: 2000.16, zustehend: 2000.16, verfaellt: 0, lohnsteuerOhne: 406.72, lohnsteuerMit: 240.04, nettoMehr: 166.68 },
  },
  {
    nombre: "1.500 Euro, zwei Kinder: Bonus größer als die Steuer",
    origen: { tipo: "recalculado", url: FABO, detalle: "SV 1.500 × 15,12 % = 226,80; Tarif 20 % × (1.273,20 − 1.139,25) = 26,79 im Monat; Bonus 2 × 166,68 wirkt nur mit 26,79. Im Jahr 321,48 von 4.000,32." },
    fecha: "2026-10-14",
    entrada: { brutto: 1500, kinderUnter18: 2, kinderAb18: 0, faboHalb: false, avabKinder: 0, wien: false },
    esperado: { wirksam: 321.48, zustehend: 4000.32, verfaellt: 3678.84, lohnsteuerMit: 0 },
  },
  {
    nombre: "Geteilter Bonus für ein Kind über 18",
    origen: { tipo: "recalculado", url: FABO, detalle: "Hälfte von 58,34 Euro = 29,17 im Monat, 350,04 im Jahr." },
    fecha: "2026-10-14",
    entrada: { brutto: 3500, kinderUnter18: 0, kinderAb18: 1, faboHalb: true, avabKinder: 0, wien: false },
    esperado: { zustehend: 350.04, monatlich: 29.17 },
  },
  {
    nombre: "Ohne Kinder",
    origen: { tipo: "recalculado", url: FABO, detalle: "Der Familienbonus Plus steht nur für Kinder zu." },
    fecha: "2026-10-14",
    entrada: { brutto: 3500, kinderUnter18: 0, kinderAb18: 0, faboHalb: false, avabKinder: 0, wien: false },
    esperaError: true,
  },
]);
