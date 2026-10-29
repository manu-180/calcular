import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-sur-les-dividendes";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Dividendes de 1 000 000 F",
    origen: { tipo: "recalculado", detalle: "Article 79 : 13 % = 130 000 ; net 870 000." },
    fecha: F,
    entrada: { revenu: "distribues", montant: 1000000 },
    esperado: { retenue: 130000, net: 870000, taux: 13 },
  },
  {
    nombre: "Dividendes d'une société cotée à la BRVM",
    origen: { tipo: "recalculado", detalle: "Article 79 : 3 % de 1 000 000 = 30 000." },
    fecha: F,
    entrada: { revenu: "cotees", montant: 1000000 },
    esperado: { retenue: 30000 },
  },
  {
    nombre: "Intérêts de 500 000 F",
    origen: { tipo: "recalculado", detalle: "Article 80 : 13 % = 65 000." },
    fecha: F,
    entrada: { revenu: "interets", montant: 500000 },
    esperado: { retenue: 65000 },
  },
]);
