import { definirCasos } from "@/motor/calculo";
import calculadora from "./avantages-en-nature";

const F = "2026-10-26";
const rien = { logement: false, electricite: false, eau: false, domestiques: 0, vehicules: 0, nourriture: false, telephone: false };

export default definirCasos(calculadora, [
  {
    nombre: "Logement, électricité et eau",
    origen: { tipo: "recalculado", detalle: "Article 33 : 15 % + 4 % + 2 % = 21 % de 400 000 = 84 000 F." },
    fecha: F,
    entrada: { ...rien, brut: 400000, logement: true, electricite: true, eau: true },
    esperado: { taux: 21, valeur: 84000, brutTaxable: 484000 },
  },
  {
    nombre: "Deux domestiques et un véhicule",
    origen: { tipo: "recalculado", detalle: "2 × 5 % + 10 % = 20 % de 1 000 000 = 200 000 F." },
    fecha: F,
    entrada: { ...rien, brut: 1000000, domestiques: 2, vehicules: 1 },
    esperado: { taux: 20, valeur: 200000 },
  },
  {
    nombre: "Sans avantage",
    origen: { tipo: "recalculado", detalle: "Aucun avantage coché : 0." },
    fecha: F,
    entrada: { ...rien, brut: 300000 },
    esperado: { valeur: 0, brutTaxable: 300000 },
  },
]);
