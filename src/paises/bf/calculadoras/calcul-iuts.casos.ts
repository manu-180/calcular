import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-iuts";

const F = "2026-10-27";
const SANS = { primes: 0, logement: 0, fonction: 0, transport: 0 };

export default definirCasos(calculadora, [
  {
    nombre: "200 000 F, autres catégories, sans charge",
    origen: { tipo: "recalculado", detalle: "Base 200 000 − 11 000 − 50 000 = 139 000. Barème : 2 420 + 4 170 + 6 280 + 3 496 = 16 366." },
    fecha: F,
    entrada: { base: 200000, ...SANS, categorie: "autres", charges: 0 },
    esperado: { netImposable: 139000, impotBrut: 16366, reduction: 0, iuts: 16366 },
  },
  {
    nombre: "Même salaire avec deux charges",
    origen: { tipo: "recalculado", detalle: "Réduction de 10 % : 16 366 × 10 % = 1 636,6 arrondi à 1 637. IUTS 14 729." },
    fecha: F,
    entrada: { base: 200000, ...SANS, categorie: "autres", charges: 2 },
    esperado: { tauxReduction: 10, reduction: 1637, iuts: 14729 },
  },
  {
    nombre: "Six charges : la réduction reste à 14 %",
    origen: { tipo: "recalculado", detalle: "L'article 113 s'arrête à 4 charges (14 %). 16 366 × 14 % = 2 291,24 arrondi à 2 291. IUTS 14 075." },
    fecha: F,
    entrada: { base: 200000, ...SANS, categorie: "autres", charges: 6 },
    esperado: { tauxReduction: 14, iuts: 14075 },
  },
  {
    nombre: "Petit salaire juste au-dessus de la première tranche",
    origen: { tipo: "recalculado", detalle: "45 000 : CNSS 2 475, abattement 11 250, base 31 275. Impôt 1 275 × 12,1 % = 154,3 arrondi à 154." },
    fecha: F,
    entrada: { base: 45000, ...SANS, categorie: "autres", charges: 0 },
    esperado: { netImposable: 31275, iuts: 154 },
  },
  {
    nombre: "Salaire de base nul",
    origen: { tipo: "recalculado", detalle: "Saisie impossible." },
    fecha: F,
    entrada: { base: 0, ...SANS, categorie: "autres", charges: 0 },
    esperaError: true,
  },
]);
