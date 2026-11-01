import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-irsa";

const F = "2026-10-27";
const CDI = "https://www.impots.mg/explorer?path=/legislation/Codes%20et%20Manuels/CDI-LFI%202026.pdf";
const sans = { heuresSup: 0, retraite: 0, sante: 0, personnesCharge: 0 };

export default definirCasos(calculadora, [
  {
    nombre: "1 000 000 Ar bruts avec 1 % de retraite et 1 % de santé",
    origen: { tipo: "recalculado", url: CDI, detalle: "Base 1 000 000 − 10 000 − 10 000 = 980 000. Barème : 2 500 + 10 000 + 15 000 + 380 000 × 20 % = 103 500." },
    fecha: F,
    entrada: { brut: 1000000, heuresSup: 0, retraite: 10000, sante: 10000, personnesCharge: 0 },
    esperado: { base: 980000, irsa: 103500, net: 876500, tauxMarginal: 20 },
  },
  {
    nombre: "Même salaire avec deux enfants à charge",
    origen: { tipo: "recalculado", url: CDI, detalle: "103 500 − 2 × 2 000 = 99 500 (article 01.03.19)." },
    fecha: F,
    entrada: { brut: 1000000, heuresSup: 0, retraite: 10000, sante: 10000, personnesCharge: 2 },
    esperado: { irsa: 99500, reduction: 4000 },
  },
  {
    nombre: "5 000 000 Ar : tranche de 25 % de la LFI 2026",
    origen: { tipo: "recalculado", url: CDI, detalle: "2 500 + 10 000 + 15 000 + 3 400 000 × 20 % + 1 000 000 × 25 % = 957 500." },
    fecha: F,
    entrada: { brut: 5000000, ...sans },
    esperado: { irsa: 957500, tauxMarginal: 25 },
  },
  {
    nombre: "SME de 300 000 Ar : minimum de 3 000 Ar",
    origen: { tipo: "recalculado", url: CDI, detalle: "Base sous 350 000 : barème nul, minimum de perception 3 000 Ar (article 01.03.16)." },
    fecha: F,
    entrada: { brut: 300000, ...sans },
    esperado: { irsa: 3000, impotBareme: 0 },
  },
  {
    nombre: "Juste au-dessus du seuil avec une personne à charge",
    origen: { tipo: "recalculado", url: CDI, detalle: "360 050 − 3 600 − 3 600 = 352 850, arrondi 352 800. Barème 2 800 × 5 % = 140, réduction sans effet sous le minimum : 3 000." },
    fecha: F,
    entrada: { brut: 360050, heuresSup: 0, retraite: 3600, sante: 3600, personnesCharge: 1 },
    esperado: { base: 352800, impotBareme: 140, irsa: 3000 },
  },
  {
    nombre: "Heures supplémentaires exonérées",
    origen: { tipo: "recalculado", url: CDI, detalle: "800 000 − 50 000 − 8 000 − 8 000 = 734 000. 27 500 + 134 000 × 20 % = 54 300." },
    fecha: F,
    entrada: { brut: 800000, heuresSup: 50000, retraite: 8000, sante: 8000, personnesCharge: 0 },
    esperado: { base: 734000, irsa: 54300 },
  },
  {
    nombre: "Cotisations au-delà des plafonds de 10 % et 2 %",
    origen: { tipo: "recalculado", url: CDI, detalle: "Déductions limitées à 100 000 et 20 000. Base 880 000 : 27 500 + 280 000 × 20 % = 83 500." },
    fecha: F,
    entrada: { brut: 1000000, heuresSup: 0, retraite: 120000, sante: 30000, personnesCharge: 0 },
    esperado: { base: 880000, irsa: 83500 },
  },
  {
    nombre: "Salaire nul",
    origen: { tipo: "recalculado", detalle: "Saisie impossible." },
    fecha: F,
    entrada: { brut: 0, ...sans },
    esperaError: true,
  },
]);
