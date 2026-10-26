import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-its";

const F = "2026-10-19";

export default definirCasos(calculadora, [
  {
    nombre: "300 000 F de salaire, célibataire sans enfant",
    origen: { tipo: "recalculado", detalle: "(240 000 − 75 000) × 16 % = 26 400 ; (300 000 − 240 000) × 21 % = 12 600. Impôt 39 000, 1 part, pas de RICF." },
    fecha: F,
    entrada: { revenu: "salaire", brut: 300000, situation: "celibataire", enfants: 0, infirmes: 0, plus70: null },
    esperado: { impotBrut: 39000, parts: 1, ricf: 0, impot: 39000, impotAnnuel: 468000, tauxMoyen: 13 },
  },
  {
    nombre: "300 000 F, marié avec deux enfants",
    origen: { tipo: "recalculado", detalle: "3 parts : RICF 22 000 F par mois. 39 000 − 22 000 = 17 000." },
    fecha: F,
    entrada: { revenu: "salaire", brut: 300000, situation: "marie", enfants: 2, infirmes: 0, plus70: null },
    esperado: { parts: 3, ricf: 22000, impot: 17000 },
  },
  {
    nombre: "100 000 F, marié avec un enfant : RICF limitée à l'impôt",
    origen: { tipo: "recalculado", detalle: "(100 000 − 75 000) × 16 % = 4 000. 2,5 parts donnent 16 500 de RICF, limitée à 4 000. Impôt nul." },
    fecha: F,
    entrada: { revenu: "salaire", brut: 100000, situation: "marie", enfants: 1, infirmes: 0, plus70: null },
    esperado: { impotBrut: 4000, parts: 2.5, ricf: 4000, impot: 0 },
  },
  {
    nombre: "1 000 000 F, célibataire avec quatre enfants dont un infirme",
    origen: { tipo: "recalculado", detalle: "26 400 + 117 600 + (1 000 000 − 800 000) × 24 % = 192 000. Parts : 1,5 + 3 × 0,5 + 1 = 4, RICF 33 000. Impôt 159 000." },
    fecha: F,
    entrada: { revenu: "salaire", brut: 1000000, situation: "celibataire", enfants: 4, infirmes: 1, plus70: null },
    esperado: { impotBrut: 192000, parts: 4, ricf: 33000, impot: 159000 },
  },
  {
    nombre: "Veuf avec un enfant : traité comme un marié",
    origen: { tipo: "recalculado", detalle: "Veuf ayant un enfant à charge : 2,5 parts, RICF 16 500. 39 000 − 16 500 = 22 500." },
    fecha: F,
    entrada: { revenu: "salaire", brut: 300000, situation: "veuf", enfants: 1, infirmes: 0, plus70: null },
    esperado: { parts: 2.5, ricf: 16500, impot: 22500 },
  },
  {
    nombre: "Marié avec huit enfants : plafond de 5 parts",
    origen: { tipo: "recalculado", detalle: "2 + 8 × 0,5 = 6 parts, ramenées à 5. RICF 44 000. 192 000 − 44 000 = 148 000." },
    fecha: F,
    entrada: { revenu: "salaire", brut: 1000000, situation: "marie", enfants: 8, infirmes: 0, plus70: null },
    esperado: { parts: 5, ricf: 44000, impot: 148000 },
  },
  {
    nombre: "Pension de 500 000 F, marié, plus de 70 ans",
    origen: { tipo: "recalculado", detalle: "Base 500 000 − 320 000 = 180 000. (180 000 − 75 000) × 16 % = 16 800. RICF 2 parts 11 000 : 5 800. Abattement de 75 % : 4 350. Impôt 1 450." },
    fecha: F,
    entrada: { revenu: "pension", brut: 500000, situation: "marie", enfants: 0, infirmes: 0, plus70: true },
    esperado: { abattement: 320000, base: 180000, impotBrut: 16800, ricf: 11000, reduction: 4350, impot: 1450 },
  },
  {
    nombre: "Pension inférieure à l'abattement",
    origen: { tipo: "recalculado", detalle: "300 000 ≤ 320 000 : base nulle, pas d'impôt." },
    fecha: F,
    entrada: { revenu: "pension", brut: 300000, situation: "celibataire", enfants: 0, infirmes: 0, plus70: false },
    esperado: { base: 0, impot: 0 },
  },
  {
    nombre: "Plus d'enfants infirmes que d'enfants",
    origen: { tipo: "recalculado", detalle: "Saisie incohérente." },
    fecha: F,
    entrada: { revenu: "salaire", brut: 300000, situation: "marie", enfants: 1, infirmes: 2, plus70: null },
    esperaError: true,
  },
]);
