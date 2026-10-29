import { definirCasos } from "@/motor/calculo";
import calculadora from "./plus-value-immobiliere";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Maison achetée 30 000 000 F, revendue 50 000 000 F après huit ans",
    origen: {
      tipo: "recalculado",
      detalle: "Forfait 30 % : 9 000 000 ; prix de revient 39 000 000 ; plus-value 11 000 000 ; réduction 20 % : 2 200 000 ; 7 % de 8 800 000 = 616 000.",
    },
    fecha: F,
    entrada: { bien: "bati", cession: 50000000, acquisition: 30000000, justifies: false, travaux: null, annees: 8, residence: false },
    esperado: { prixRevient: 39000000, brute: 11000000, reduction: 2200000, imposable: 8800000, taxe: 616000 },
  },
  {
    nombre: "Terrain détenu trois ans, frais justifiés",
    origen: { tipo: "recalculado", detalle: "20 000 000 − (10 000 000 + 1 000 000) = 9 000 000 ; pas de réduction ; 7 % = 630 000." },
    fecha: F,
    entrada: { bien: "non-bati", cession: 20000000, acquisition: 10000000, justifies: true, travaux: 1000000, annees: 3, residence: false },
    esperado: { brute: 9000000, reduction: 0, taxe: 630000 },
  },
  {
    nombre: "Terrain détenu dix ans",
    origen: { tipo: "recalculado", detalle: "Plus-value 9 000 000 réduite de 10 % : 8 100 000 ; 7 % = 567 000." },
    fecha: F,
    entrada: { bien: "non-bati", cession: 20000000, acquisition: 10000000, justifies: true, travaux: 1000000, annees: 10, residence: false },
    esperado: { reduction: 900000, taxe: 567000 },
  },
  {
    nombre: "Vente de 1 800 000 F",
    origen: { tipo: "recalculado", detalle: "Article 84 : prix de cession sous 2 000 000, exonéré." },
    fecha: F,
    entrada: { bien: "non-bati", cession: 1800000, acquisition: 500000, justifies: false, travaux: null, annees: 2, residence: false },
    esperado: { taxe: 0 },
  },
  {
    nombre: "Première vente de la résidence principale",
    origen: { tipo: "recalculado", detalle: "Article 84 : exonérée." },
    fecha: F,
    entrada: { bien: "bati", cession: 50000000, acquisition: 30000000, justifies: false, travaux: null, annees: 8, residence: true },
    esperado: { taxe: 0, imposable: 0 },
  },
]);
