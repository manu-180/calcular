import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-impot-sur-les-societes";

export default definirCasos(calculadora, [
  {
    nombre: "Bénéfice de 20 millions",
    origen: { tipo: "recalculado", detalle: "IS 30 % = 6 000 000 ; IMF 0,5 % de 300 000 000 = 1 500 000." },
    fecha: "2026-10-18",
    entrada: { benefice: 20000000, chiffre: 300000000 },
    esperado: { du: 6000000, is: 6000000, imf: 1500000 },
  },
  {
    nombre: "Déficit avec un gros chiffre d'affaires",
    origen: { tipo: "recalculado", detalle: "IMF 0,5 % de 2 000 000 000 = 10 000 000, plafonné à 5 000 000." },
    fecha: "2026-10-18",
    entrada: { benefice: 0, chiffre: 2000000000 },
    esperado: { du: 5000000, imf: 5000000 },
  },
]);
