import { definirCasos } from "@/motor/calculo";
import rentenrechner from "./rentenrechner";

export default definirCasos(rentenrechner, [
  {
    nombre: "45 Jahre Durchschnittsverdienst nach dem Rentenwert ab Juli 2026",
    origen: {
      tipo: "recalculado",
      url: "https://www.gesetze-im-internet.de/rwbestv_2026/__1.html",
      detalle: "51944 / 51944 = 1 Entgeltpunkt pro Jahr; 45 Punkte × 42,52 = 1913,40 Euro im Monat.",
    },
    fecha: "2026-10-14",
    entrada: { jahresbrutto: 51944, jahre: 45, bisherigePunkte: null },
    esperado: { punkteJahr: 1, punkte: 45, rentenwert: 42.52, rente: 1913.4, renteJahr: 22960.8 },
  },
  {
    nombre: "Am 30. Juni 2026 galt noch der Rentenwert 40,79",
    origen: { tipo: "recalculado", url: "https://www.gesetze-im-internet.de/rwbestv_2025/__1.html", detalle: "45 × 40,79 = 1835,55." },
    fecha: "2026-06-30",
    entrada: { jahresbrutto: 51944, jahre: 45, bisherigePunkte: null },
    esperado: { rentenwert: 40.79, rente: 1835.55 },
  },
  {
    nombre: "Gehalt über der Beitragsbemessungsgrenze und bisherige Punkte",
    origen: {
      tipo: "recalculado",
      url: "https://www.gesetze-im-internet.de/svbezgrv_2026/BJNR1160A0025.html",
      detalle: "120000 begrenzt auf 101400; 101400 / 51944 = 1,9521 Punkte. 12,5 + 20 × 1,95210 = 51,5420 Punkte × 42,52 = 2191,57.",
    },
    fecha: "2026-10-14",
    entrada: { jahresbrutto: 120000, jahre: 20, bisherigePunkte: 12.5 },
    esperado: { punkteJahr: 1.952102264, rente: 2191.57 },
    tolerancia: 0.01,
  },
]);
