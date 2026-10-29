import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-salaire-net";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "300 000 F bruts, mois ordinaire",
    origen: {
      tipo: "recalculado",
      detalle: "ITS (art. 125) : 90 000 × 10 % + 100 000 × 15 % + 50 000 × 19 % = 33 500. CNSS 3,6 % = 10 800. Net 300 000 − 33 500 − 10 800 = 255 700.",
    },
    fecha: F,
    entrada: { brut: 300000, mois: "autre", autres: 0 },
    esperado: { its: 33500, redevance: 0, cnss: 10800, net: 255700 },
  },
  {
    nombre: "300 000 F bruts en juin, avec une avance de 20 000 F",
    origen: { tipo: "recalculado", detalle: "ITS 33 500 + redevance ORTB de juin 3 000. Net 300 000 − 36 500 − 10 800 − 20 000 = 232 700." },
    fecha: F,
    entrada: { brut: 300000, mois: "juin", autres: 20000 },
    esperado: { redevance: 3000, net: 232700 },
  },
  {
    nombre: "55 000 F en juin : sous la première tranche",
    origen: { tipo: "recalculado", detalle: "Aucun ITS et pas de redevance de 3 000 F (revenu dans la première tranche). CNSS 1 980. Net 53 020." },
    fecha: F,
    entrada: { brut: 55000, mois: "juin", autres: 0 },
    esperado: { its: 0, redevance: 0, cnss: 1980, net: 53020 },
  },
  {
    nombre: "800 000 F en mars",
    origen: {
      tipo: "recalculado",
      detalle: "ITS 9 000 + 15 000 + 47 500 + 300 000 × 30 % = 161 500 ; redevance de mars 1 000 ; CNSS 28 800. Net 800 000 − 162 500 − 28 800 = 608 700.",
    },
    fecha: F,
    entrada: { brut: 800000, mois: "mars", autres: 0 },
    esperado: { its: 161500, redevance: 1000, cnss: 28800, net: 608700 },
  },
  {
    nombre: "Retenues supérieures au salaire",
    origen: { tipo: "recalculado", detalle: "Saisie impossible." },
    fecha: F,
    entrada: { brut: 100000, mois: "autre", autres: 200000 },
    esperaError: true,
  },
]);
