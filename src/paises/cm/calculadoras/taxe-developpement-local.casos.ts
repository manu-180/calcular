import { definirCasos } from "@/motor/calculo";
import calculadora from "./taxe-developpement-local";

const F = "2026-10-26";

export default definirCasos(calculadora, [
  {
    nombre: "150 000 F de base",
    origen: { tipo: "recalculado", detalle: "Article C 86 : de 125 001 à 150 000 F, 12 000 F par an, soit 1 000 F par mois." },
    fecha: F,
    entrada: { base: 150000 },
    esperado: { annee: 12000, mois: 1000 },
  },
  {
    nombre: "62 000 F : première tranche",
    origen: { tipo: "recalculado", detalle: "De 62 000 à 75 000 F : 3 000 F par an, 250 F par mois." },
    fecha: F,
    entrada: { base: 62000 },
    esperado: { annee: 3000, mois: 250 },
  },
  {
    nombre: "Sous 62 000 F",
    origen: { tipo: "recalculado", detalle: "Aucune tranche ne vise un salaire de base inférieur à 62 000 F." },
    fecha: F,
    entrada: { base: 61000 },
    esperado: { annee: 0 },
  },
  {
    nombre: "Plus de 500 000 F",
    origen: { tipo: "recalculado", detalle: "Au-delà de 500 000 F : 30 000 F par an, 2 500 F par mois." },
    fecha: F,
    entrada: { base: 800000 },
    esperado: { annee: 30000, mois: 2500 },
  },
]);
