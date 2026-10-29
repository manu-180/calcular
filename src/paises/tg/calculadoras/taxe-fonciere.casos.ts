import { definirCasos } from "@/motor/calculo";
import calculadora from "./taxe-fonciere";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Maison d'une valeur locative de 1 200 000 F",
    origen: { tipo: "recalculado", detalle: "Articles 270 et 275 : 1 200 000 − 50 % = 600 000 ; 7,5 % = 45 000." },
    fecha: F,
    entrada: { propriete: "bati", valeurLocative: 1200000, valeurVenale: null },
    esperado: { base: 600000, taxe: 45000 },
  },
  {
    nombre: "Terrain de 10 000 000 F",
    origen: { tipo: "recalculado", detalle: "Article 276 : 0,5 % de 10 000 000 = 50 000." },
    fecha: F,
    entrada: { propriete: "non-bati", valeurLocative: null, valeurVenale: 10000000 },
    esperado: { taxe: 50000 },
  },
]);
