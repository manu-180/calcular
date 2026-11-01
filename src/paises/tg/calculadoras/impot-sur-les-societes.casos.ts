import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-sur-les-societes";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Bénéfice de 10 000 000 F pour 200 000 000 F de chiffre d'affaires",
    origen: { tipo: "recalculado", detalle: "IS 27 % = 2 700 000 ; MFP 1 % = 2 000 000. L'IS l'emporte ; acomptes 675 000." },
    fecha: F,
    entrada: { benefice: 10000000, ca: 200000000 },
    esperado: { is: 2700000, mfp: 2000000, du: 2700000, retenu: "Impôt sur les sociétés", acompte: 675000 },
  },
  {
    nombre: "Déficit, 50 000 000 F de chiffre d'affaires",
    origen: { tipo: "recalculado", detalle: "IS nul ; MFP 1 % = 500 000." },
    fecha: F,
    entrada: { benefice: 0, ca: 50000000 },
    esperado: { is: 0, du: 500000, retenu: "Minimum forfaitaire de perception" },
  },
  {
    nombre: "Petit chiffre d'affaires : minimum de 20 000 F",
    origen: { tipo: "recalculado", detalle: "1 % de 1 000 000 = 10 000, porté au minimum de 20 000." },
    fecha: F,
    entrada: { benefice: 0, ca: 1000000 },
    esperado: { mfp: 20000, du: 20000 },
  },
  {
    nombre: "Bénéfice avec centaines de francs",
    origen: { tipo: "recalculado", detalle: "1 234 567 ramené à 1 234 000 ; 27 % = 333 180." },
    fecha: F,
    entrada: { benefice: 1234567, ca: 0 },
    esperado: { is: 333180 },
  },
]);
