import { definirCasos } from "@/motor/calculo";
import taxeJeuxDeHasard from "./taxe-jeux-de-hasard";

const F = "2026-10-29";

export default definirCasos(taxeJeuxDeHasard, [
  {
    nombre: "10 000 000 F de recettes brutes",
    origen: { tipo: "recalculado", detalle: "15 % × 10 000 000 = 1 500 000." },
    fecha: F,
    entrada: { type: "recettes", base: 10000000 },
    esperado: { taxe: 1500000, taux: 15 },
  },
  {
    nombre: "4 000 000 F de marge brute sur des paris à cote fixe",
    origen: { tipo: "recalculado", detalle: "35 % × 4 000 000 = 1 400 000." },
    fecha: F,
    entrada: { type: "cote-fixe", base: 4000000 },
    esperado: { taxe: 1400000, taux: 35 },
  },
  {
    nombre: "Base nulle",
    origen: { tipo: "recalculado", detalle: "Un montant nul est refusé." },
    fecha: F,
    entrada: { type: "recettes", base: 0 },
    esperaError: true,
  },
]);
