import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-sur-les-societes";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Bénéfice de 10 000 500 F, réel normal",
    origen: { tipo: "recalculado", detalle: "Bénéfice ramené à 10 000 000 ; IS 27,5 % = 2 750 000. MFP 0,5 % × 100 000 000 = 500 000, porté au minimum de 1 000 000. L'IS est plus élevé." },
    fecha: F,
    entrada: { benefice: 10000500, chiffre: 100000000, regime: "reel-normal", cga: false },
    esperado: { is: 2750000, mfp: 1000000, du: 2750000, retenu: "Impôt sur les sociétés" },
  },
  {
    nombre: "Société déficitaire au réel simplifié, adhérente d'un CGA",
    origen: { tipo: "recalculado", detalle: "IS nul. MFP 0,5 % × 50 000 000 = 250 000, porté à 300 000, réduit de 50 % : 150 000." },
    fecha: F,
    entrada: { benefice: 0, chiffre: 50000000, regime: "reel-simplifie", cga: true },
    esperado: { is: 0, mfp: 150000, du: 150000, retenu: "Minimum forfaitaire de perception" },
  },
  {
    nombre: "Grand chiffre d'affaires et faible bénéfice",
    origen: { tipo: "recalculado", detalle: "Chiffre arrondi à 1 234 500 000 ; MFP 0,5 % = 6 172 500. IS 27,5 % × 5 000 000 = 1 375 000. Le MFP s'applique." },
    fecha: F,
    entrada: { benefice: 5000000, chiffre: 1234567890, regime: "reel-normal", cga: false },
    esperado: { mfp: 6172500, du: 6172500 },
  },
]);
