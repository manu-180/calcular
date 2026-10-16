import { definirCasos } from "@/motor/calculo";
import arbeitslosengeldRechner from "./arbeitslosengeld-rechner";

const AVIG = "https://www.fedlex.admin.ch/eli/cc/1982/2184_2184_2184/de#art_22";

export default definirCasos(arbeitslosengeldRechner, [
  {
    nombre: "6000 Franken ohne Kinder",
    origen: { tipo: "recalculado", url: AVIG, detalle: "6000 / 21,7 = 276,50; 80 % wären 221,20 und damit über 140: es gelten 70 %. Taggeld 193,55; Monat 4200. 24 Beitragsmonate, 35 Jahre: 400 Taggelder (Art. 27 Abs. 2 Bst. b)." },
    fecha: "2026-10-14",
    entrada: { verdienst: 6000, unterhalt: false, ivRente: false, alter: 35, beitragsmonate: 24 },
    esperado: { satz: 70, taggeld: 193.55, monat: 4200, anzahl: 400, gesamt: 77420 },
  },
  {
    nombre: "6000 Franken mit Unterhaltspflicht",
    origen: { tipo: "recalculado", url: AVIG, detalle: "Mit Kindern unter 25: 80 %. 276,50 × 80 % = 221,20; Monat 4800." },
    fecha: "2026-10-14",
    entrada: { verdienst: 6000, unterhalt: true, ivRente: false, alter: 35, beitragsmonate: 24 },
    esperado: { satz: 80, taggeld: 221.2, monat: 4800 },
  },
  {
    nombre: "Volles Taggeld genau 140 Franken",
    origen: { tipo: "recalculado", url: AVIG, detalle: "3797,50 / 21,7 = 175; 80 % = 140, nicht mehr als 140: es bleiben 80 %." },
    fecha: "2026-10-14",
    entrada: { verdienst: 3797.5, unterhalt: false, ivRente: false, alter: 40, beitragsmonate: 14 },
    esperado: { satz: 80, taggeld: 140, anzahl: 260 },
  },
  {
    nombre: "Lohn über dem Höchstbetrag, 57 Jahre",
    origen: { tipo: "recalculado", url: AVIG, detalle: "Versichert höchstens 148 200 / 12 = 12 350. 12 350 / 21,7 × 70 % = 398,39. Ab 55 Jahren und 22 Beitragsmonaten: 520 Taggelder." },
    fecha: "2026-10-14",
    entrada: { verdienst: 15000, unterhalt: false, ivRente: false, alter: 57, beitragsmonate: 24 },
    esperado: { versichert: 12350, taggeld: 398.39, monat: 8645, anzahl: 520 },
  },
  {
    nombre: "Unter 25 ohne Kinder",
    origen: { tipo: "recalculado", url: "https://www.fedlex.admin.ch/eli/cc/1982/2184_2184_2184/de#art_27", detalle: "Bis zum zurückgelegten 25. Altersjahr ohne Unterhaltspflicht: höchstens 200 Taggelder (Art. 27 Abs. 5bis)." },
    fecha: "2026-10-14",
    entrada: { verdienst: 4000, unterhalt: false, ivRente: false, alter: 22, beitragsmonate: 14 },
    esperado: { anzahl: 200 },
  },
  {
    nombre: "Verdienst unter 500 Franken",
    origen: { tipo: "recalculado", detalle: "Art. 40 AVIV: unter 500 Franken im Monat nicht versichert." },
    fecha: "2026-10-14",
    entrada: { verdienst: 400, unterhalt: false, ivRente: false, alter: 30, beitragsmonate: 24 },
    esperaError: true,
  },
]);
