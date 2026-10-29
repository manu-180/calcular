import { definirCasos } from "@/motor/calculo";
import taxePaiementsNumeraire from "./taxe-paiements-numeraire";

const F = "2026-10-29";

export default definirCasos(taxePaiementsNumeraire, [
  {
    nombre: "500 000 F payés en espèces",
    origen: { tipo: "recalculado", detalle: "1 % × 500 000 = 5 000." },
    fecha: F,
    entrada: { montant: 500000 },
    esperado: { taxe: 5000, taux: 1, total: 505000 },
  },
  {
    nombre: "Exactement 100 000 F",
    origen: { tipo: "recalculado", detalle: "Le paiement est inférieur ou égal au plafond : exonéré." },
    fecha: F,
    entrada: { montant: 100000 },
    esperado: { taxe: 0, taux: 0 },
  },
  {
    nombre: "100 001 F",
    origen: { tipo: "recalculado", detalle: "1 % × 100 001 = 1 000,01, arrondi à 1 000." },
    fecha: F,
    entrada: { montant: 100001 },
    esperado: { taxe: 1000 },
  },
  {
    nombre: "Montant nul",
    origen: { tipo: "recalculado", detalle: "Un montant nul est refusé." },
    fecha: F,
    entrada: { montant: 0 },
    esperaError: true,
  },
]);
