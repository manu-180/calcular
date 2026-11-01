import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-foncier-propriete-batie";

const F = "2026-10-27";
const CDI = "https://www.impots.mg/explorer?path=/legislation/Codes%20et%20Manuels/CDI-LFI%202026.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Maison louée 600 000 Ar par mois",
    origen: { tipo: "recalculado", url: CDI, detalle: "Articles 10.02.06 et 10.02.10 : 600 000 × 12 = 7 200 000 ; 5 % = 360 000." },
    fecha: F,
    entrada: { occupation: "loue", loyerMensuel: 600000, valeurLocative: null },
    esperado: { base: 7200000, impot: 360000 },
  },
  {
    nombre: "Résidence principale de valeur locative 3 000 000 Ar",
    origen: { tipo: "recalculado", url: CDI, detalle: "Base 30 % × 3 000 000 = 900 000 ; 5 % = 45 000." },
    fecha: F,
    entrada: { occupation: "residence", loyerMensuel: null, valeurLocative: 3000000 },
    esperado: { base: 900000, impot: 45000 },
  },
  {
    nombre: "Petite case : minimum de 5 000 Ar",
    origen: { tipo: "recalculado", url: CDI, detalle: "30 % × 200 000 = 60 000 ; 5 % = 3 000, relevé au minimum de 5 000." },
    fecha: F,
    entrada: { occupation: "residence", loyerMensuel: null, valeurLocative: 200000 },
    esperado: { impot: 5000 },
  },
]);
