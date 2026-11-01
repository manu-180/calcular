import { definirCasos } from "@/motor/calculo";
import calculadora from "./plus-value-immobiliere";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Terrain nu vendu 20 millions, acheté 8 millions",
    origen: { tipo: "recalculado", detalle: "Art. 111 et 115 : plus-value 12 000 000 ; 5 % = 600 000 ; minimum 1 % de 20 000 000 = 200 000." },
    fecha: F,
    entrada: { prixTerrain: 20000000, prixConstruction: 0, acquisition: 8000000 },
    esperado: { plusValue: 12000000, calculee: 600000, minimum: 200000, taxe: 600000, netVendeur: 19400000 },
  },
  {
    nombre: "Parcelle et construction",
    origen: { tipo: "recalculado", detalle: "Art. 113 : plus-value sur la construction 10 % de 30 000 000 = 3 000 000 ; parcelle 10 000 000 - 4 000 000 = 6 000 000 ; total 9 000 000 ; 5 % = 450 000." },
    fecha: F,
    entrada: { prixTerrain: 10000000, prixConstruction: 30000000, acquisition: 4000000 },
    esperado: { plusValue: 9000000, taxe: 450000, minimum: 400000 },
  },
  {
    nombre: "Vente à perte : minimum de 1 %",
    origen: { tipo: "recalculado", detalle: "Aucune plus-value ; art. 115, paragraphe 2 : taxe jamais inférieure à 1 % de 10 000 000 = 100 000." },
    fecha: F,
    entrada: { prixTerrain: 10000000, prixConstruction: 0, acquisition: 12000000 },
    esperado: { plusValue: 0, taxe: 100000, minimumApplique: "Oui, le minimum de 1 % du prix de cession s'applique." },
  },
]);
