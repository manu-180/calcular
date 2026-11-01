import { definirCasos } from "@/motor/calculo";
import calculIts from "./calcul-its";

const F = "2026-10-29";

export default definirCasos(calculIts, [
  {
    nombre: "200 000 F dans le mois",
    origen: { tipo: "recalculado", detalle: "1 % × 25 000 = 250. 2 % × 25 000 = 500. 6 % × 50 000 = 3 000. 13 % × 50 000 = 6 500. 25 % × 50 000 = 12 500. Total 22 750." },
    fecha: F,
    entrada: { revenu: 200000 },
    esperado: { impot: 22750, apresImpot: 177250, annuel: 273000, tauxMarginal: 25 },
  },
  {
    nombre: "Exactement 25 000 F",
    origen: { tipo: "recalculado", detalle: "Toute la somme est dans la première tranche : 1 % × 25 000 = 250." },
    fecha: F,
    entrada: { revenu: 25000 },
    esperado: { impot: 250, tauxMarginal: 1 },
  },
  {
    nombre: "1 000 000 F, haut de l'avant-dernière tranche",
    origen: { tipo: "recalculado", detalle: "250 + 500 + 3 000 + 6 500 + 37 500 (25 % × 150 000) + 30 000 (30 % × 100 000) + 96 000 (32 % × 300 000) + 102 000 (34 % × 300 000) = 275 750." },
    fecha: F,
    entrada: { revenu: 1000000 },
    esperado: { impot: 275750, tauxMarginal: 34 },
  },
  {
    nombre: "1 200 000 F, dernière tranche à 35 %",
    origen: { tipo: "recalculado", detalle: "275 750 + 35 % × 200 000 = 345 750." },
    fecha: F,
    entrada: { revenu: 1200000 },
    esperado: { impot: 345750, tauxMarginal: 35 },
  },
  {
    nombre: "Revenu à zéro",
    origen: { tipo: "recalculado", detalle: "Un revenu nul est refusé." },
    fecha: F,
    entrada: { revenu: 0 },
    esperaError: true,
  },
]);
