import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-sur-les-benefices";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Bénéfice de 2 000 000 F",
    origen: { tipo: "recalculado", detalle: "10 % × 500 000 = 50 000 ; 20 % × 500 000 = 100 000 ; 27,5 % × 1 000 000 = 275 000. Total 425 000." },
    fecha: F,
    entrada: { benefice: 2000000, cga: false },
    esperado: { bareme: 425000, impot: 425000, tauxMoyen: 21.25 },
  },
  {
    nombre: "Même bénéfice, adhérent d'un CGA",
    origen: { tipo: "recalculado", detalle: "Réduction de 30 % : 127 500. Impôt 297 500." },
    fecha: F,
    entrada: { benefice: 2000000, cga: true },
    esperado: { reduction: 127500, impot: 297500 },
  },
  {
    nombre: "Bénéfice de 750 900 F",
    origen: { tipo: "recalculado", detalle: "Arrondi à 750 000. 50 000 + 20 % × 250 000 (50 000) = 100 000." },
    fecha: F,
    entrada: { benefice: 750900, cga: false },
    esperado: { base: 750000, impot: 100000 },
  },
]);
