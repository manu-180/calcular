import { definirCasos } from "@/motor/calculo";
import arbeitslosengeldRechner from "./arbeitslosengeld-rechner";

const AMS = "https://www.ams.at/arbeitsuchende/arbeitslos-was-tun/geld-vom-ams/arbeitslosengeld";

export default definirCasos(arbeitslosengeldRechner, [
  {
    nombre: "3.000 Euro brutto, ohne Familienzuschläge",
    origen: { tipo: "recalculado", url: AMS, detalle: "Netto im Jahr mit 14 Gehältern 30.803,42 Euro; täglich 30.803,42 / 360 = 85,57; Grundbetrag 55 % = 47,06; über dem Richtsatz, kein Ergänzungsbetrag; 30 Tage 1.411,80; 20 Wochen 6.588,40." },
    fecha: "2026-10-14",
    entrada: { brutto: 3000, familienzuschlaege: 0, wochen: "20" },
    esperado: { nettoTag: 85.57, grundbetrag: 47.06, ergaenzung: 0, tagsatz: 47.06, monatlich: 1411.8, gesamt: 6588.4 },
  },
  {
    nombre: "1.200 Euro brutto: Ergänzungsbetrag bis 60 %",
    origen: { tipo: "recalculado", url: AMS, detalle: "Netto im Jahr 14.283,84; täglich 39,68; Grundbetrag 21,82 liegt unter 1.308,39 / 30 = 43,61; Aufstockung höchstens auf 60 % = 23,81." },
    fecha: "2026-10-14",
    entrada: { brutto: 1200, familienzuschlaege: 0, wochen: "30" },
    esperado: { grundbetrag: 21.82, ergaenzung: 1.98, tagsatz: 23.81, monatlich: 714.3 },
  },
  {
    nombre: "1.200 Euro brutto mit zwei Familienzuschlägen: bis 80 %",
    origen: { tipo: "recalculado", url: AMS, detalle: "Familienzuschläge 2 × 0,97 = 1,94; Grenze 80 % von 39,68 = 31,74 inklusive Ergänzungsbetrag und Familienzuschlägen." },
    fecha: "2026-10-14",
    entrada: { brutto: 1200, familienzuschlaege: 2, wochen: "20" },
    esperado: { familienzuschlag: 1.94, ergaenzung: 7.98, tagsatz: 31.74 },
  },
]);
