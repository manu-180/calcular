import { definirCasos } from "@/motor/calculo";
import nettoBruttoRechner from "./netto-brutto-rechner";

const AHV = "https://www.ahv-iv.ch/p/2.01.d";

export default definirCasos(nettoBruttoRechner, [
  {
    nombre: "Umkehrung des Brutto-Netto-Beispiels",
    origen: {
      tipo: "recalculado",
      url: AHV,
      detalle: "Der Brutto-Netto-Rechner ergibt aus 6500 brutto (13 Löhne, 35 Jahre, NBU 1 %) 5777,17 netto. Umgekehrt braucht es rund 6500 brutto.",
    },
    fecha: "2026-10-14",
    entrada: { netto: 5777.17, anzahl: "13", alter: 35, nbu: 1, ktg: 0 },
    esperado: { brutto: 6500, netto: 5777.17, abzuege: 722.83 },
    tolerancia: 0.02,
  },
  {
    nombre: "Kleiner Lohn ohne BVG",
    origen: { tipo: "recalculado", url: AHV, detalle: "Netto 1666,80 bei 12 Löhnen und 22 Jahren: Abzüge 7,4 % (5,3 + 1,1 + 1), brutto 1666,80 / 0,926 = 1800." },
    fecha: "2026-10-14",
    entrada: { netto: 1666.8, anzahl: "12", alter: 22, nbu: 1, ktg: 0 },
    esperado: { brutto: 1800, netto: 1666.8 },
    tolerancia: 0.02,
  },
  {
    nombre: "Nettolohn null",
    origen: { tipo: "recalculado", detalle: "Ein Nettolohn von null ergibt keinen Bruttolohn." },
    fecha: "2026-10-14",
    entrada: { netto: 0, anzahl: "12", alter: 30, nbu: 1, ktg: 0 },
    esperaError: true,
  },
]);
