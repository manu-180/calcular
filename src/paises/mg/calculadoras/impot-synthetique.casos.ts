import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-synthetique";

const F = "2026-10-27";
const CDI = "https://www.impots.mg/explorer?path=/legislation/Codes%20et%20Manuels/CDI-LFI%202026.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Commerçant à 60 000 000 Ar sans charges justifiées",
    origen: { tipo: "recalculado", url: CDI, detalle: "Article 01.02.05 : 5 % × 60 000 000 = 3 000 000." },
    fecha: F,
    entrada: { ca: 60000000, situation: "normal", charges: 0 },
    esperado: { base: 60000000, impot: 3000000, reduction: 0 },
  },
  {
    nombre: "Réduction de 2 % sur 40 000 000 Ar de charges",
    origen: { tipo: "recalculado", url: CDI, detalle: "Impôt 3 000 000, réduction 2 % × 40 000 000 = 800 000, plancher 3 % × 60 000 000 = 1 800 000. Impôt 2 200 000." },
    fecha: F,
    entrada: { ca: 60000000, situation: "normal", charges: 40000000 },
    esperado: { impot: 2200000, reduction: 800000 },
  },
  {
    nombre: "Réduction plafonnée par le minimum de 3 % du chiffre d'affaires",
    origen: { tipo: "recalculado", url: CDI, detalle: "Réduction demandée 2 % × 70 000 000 = 1 400 000, limitée à 3 000 000 − 1 800 000 = 1 200 000. Impôt 1 800 000." },
    fecha: F,
    entrada: { ca: 60000000, situation: "normal", charges: 70000000 },
    esperado: { impot: 1800000, reduction: 1200000 },
  },
  {
    nombre: "Adhérent d'un CGA : abattement plafonné à 10 000 000 Ar",
    origen: { tipo: "recalculado", url: CDI, detalle: "Article 01.02.04 : abattement min(50 % × 60 000 000 ; 10 000 000) = 10 000 000. Base 50 000 000, impôt 2 500 000." },
    fecha: F,
    entrada: { ca: 60000000, situation: "cga", charges: 0 },
    esperado: { base: 50000000, impot: 2500000 },
  },
  {
    nombre: "Nouvel adhérent au taux de 3 %, base arrondie",
    origen: { tipo: "recalculado", url: CDI, detalle: "Base 12 345 678 arrondie à 12 340 000. 3 % = 370 200." },
    fecha: F,
    entrada: { ca: 12345678, situation: "nouveau", charges: 0 },
    esperado: { base: 12340000, taux: 3, impot: 370200 },
  },
  {
    nombre: "Chiffre d'affaires nul",
    origen: { tipo: "recalculado", detalle: "Saisie impossible." },
    fecha: F,
    entrada: { ca: 0, situation: "normal", charges: 0 },
    esperaError: true,
  },
]);
