import { definirCasos } from "@/motor/calculo";
import mehrwertsteuerRechner from "./mehrwertsteuer-rechner";

const UST = "https://www.usp.gv.at/themen/steuern-finanzen/umsatzsteuer-ueberblick/steuersaetze-und-steuerbefreiungen-der-umsatzsteuer.html";
const UST_NEU = "https://www.usp.gv.at/aktuelles/newsliste/neuer_ustsatz.html";

export default definirCasos(mehrwertsteuerRechner, [
  {
    nombre: "100 Euro netto plus 20 %",
    origen: { tipo: "recalculado", url: UST, detalle: "Normalsteuersatz 20 %: 100 × 20 % = 20; brutto 120." },
    fecha: "2026-10-14",
    entrada: { betrag: 100, richtung: "aufschlagen", satz: "normal" },
    esperado: { satz: 20, ust: 20, brutto: 120 },
  },
  {
    nombre: "120 Euro brutto, 20 % herausrechnen",
    origen: { tipo: "recalculado", url: UST, detalle: "120 / 1,2 = 100; Umsatzsteuer 20." },
    fecha: "2026-10-14",
    entrada: { betrag: 120, richtung: "herausrechnen", satz: "normal" },
    esperado: { netto: 100, ust: 20 },
  },
  {
    nombre: "Lebensmittel mit 10 %",
    origen: { tipo: "recalculado", url: UST, detalle: "11 / 1,1 = 10; Umsatzsteuer 1." },
    fecha: "2026-10-14",
    entrada: { betrag: 11, richtung: "herausrechnen", satz: "zehn" },
    esperado: { netto: 10, ust: 1, satz: 10 },
  },
  {
    nombre: "13 % aufschlagen",
    origen: { tipo: "recalculado", url: UST, detalle: "50 × 13 % = 6,50; brutto 56,50." },
    fecha: "2026-10-14",
    entrada: { betrag: 50, richtung: "aufschlagen", satz: "dreizehn" },
    esperado: { ust: 6.5, brutto: 56.5 },
  },
  {
    nombre: "Grundnahrungsmittel mit 4,9 % seit Juli 2026",
    origen: { tipo: "recalculado", url: UST_NEU, detalle: "Seit 1. Juli 2026: 2,49 / 1,049 = 2,37; Umsatzsteuer 0,12." },
    fecha: "2026-07-01",
    entrada: { betrag: 2.49, richtung: "herausrechnen", satz: "grundnahrung" },
    esperado: { satz: 4.9, netto: 2.37, ust: 0.12 },
  },
  {
    nombre: "4,9 % gab es im Juni 2026 noch nicht",
    origen: { tipo: "recalculado", url: UST_NEU, detalle: "Der Satz von 4,9 % gilt erst ab 1. Juli 2026." },
    fecha: "2026-06-30",
    entrada: { betrag: 2.49, richtung: "herausrechnen", satz: "grundnahrung" },
    esperaError: true,
  },
]);
