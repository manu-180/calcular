import { definirCasos } from "@/motor/calculo";
import calculadora from "./taxe-fonciere";

const F = "2026-10-26";

export default definirCasos(calculadora, [
  {
    nombre: "Maison de 40 millions",
    origen: { tipo: "recalculado", detalle: "Article C 53 : 0,1 % × 40 000 000 = 40 000 F." },
    fecha: F,
    entrada: { valeur: 40000000 },
    esperado: { taxe: 40000, tauxMoyen: 0.1 },
  },
  {
    nombre: "Patrimoine de 1,5 milliard",
    origen: { tipo: "recalculado", detalle: "500 000 000 × 0,1 % + 500 000 000 × 0,2 % + 500 000 000 × 0,3 % = 500 000 + 1 000 000 + 1 500 000 = 3 000 000 F." },
    fecha: F,
    entrada: { valeur: 1500000000 },
    esperado: { taxe: 3000000, tauxMoyen: 0.2 },
  },
]);
