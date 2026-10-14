import { definirCasos } from "@/motor/calculo";
import abfertigungNeuRechner from "./abfertigung-neu-rechner";

const USP = "https://www.usp.gv.at/themen/mitarbeiter-und-gesundheit/beendigung-des-arbeitsverhaeltnisses/abfertigung.html";

export default definirCasos(abfertigungNeuRechner, [
  {
    nombre: "3.000 Euro, 14 Gehälter, 10 Jahre",
    origen: { tipo: "recalculado", url: USP, detalle: "1,53 % von 3.000 = 45,90 im Monat, auch auf Sonderzahlungen: 14 × 45,90 = 642,60 im Jahr; 10 Jahre 6.426; 6 % Lohnsteuer 385,56." },
    fecha: "2026-10-14",
    entrada: { brutto: 3000, sonderzahlungen: true, jahre: 10 },
    esperado: { monatlich: 45.9, jaehrlich: 642.6, summe: 6426, steuer: 385.56, netto: 6040.44 },
  },
  {
    nombre: "2.000 Euro, ohne Sonderzahlungen, 2 Jahre",
    origen: { tipo: "recalculado", url: USP, detalle: "1,53 % von 2.000 = 30,60; 12 × 30,60 = 367,20; 2 Jahre 734,40." },
    fecha: "2026-10-14",
    entrada: { brutto: 2000, sonderzahlungen: false, jahre: 2 },
    esperado: { monatlich: 30.6, summe: 734.4 },
  },
]);
