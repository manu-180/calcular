import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-plus-value-immobiliere";

const F = "2026-10-27";
const CDI = "https://www.impots.mg/explorer?path=/legislation/Codes%20et%20Manuels/CDI-LFI%202026.pdf";

export default definirCasos(calculadora, [
  {
    nombre: "Maison vendue 200 000 000 Ar",
    origen: { tipo: "recalculado", url: CDI, detalle: "Articles 01.05.04 et 01.05.07 : prix de revient 75 % = 150 000 000, plus-value 50 000 000, impôt 20 % = 10 000 000." },
    fecha: F,
    entrada: { prix: 200000000, valeurAdministrative: null },
    esperado: { prixRevient: 150000000, plusValue: 50000000, impot: 10000000, partDuPrix: 5 },
  },
  {
    nombre: "Valeur administrative supérieure au prix déclaré",
    origen: { tipo: "recalculado", url: CDI, detalle: "Base 120 000 000 au lieu de 100 000 000 : plus-value 30 000 000, impôt 6 000 000." },
    fecha: F,
    entrada: { prix: 100000000, valeurAdministrative: 120000000 },
    esperado: { base: 120000000, impot: 6000000, netVendeur: 94000000 },
  },
]);
