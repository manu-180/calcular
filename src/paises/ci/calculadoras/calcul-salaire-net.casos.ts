import { definirCasos } from "@/motor/calculo";
import calculadora from "./calcul-salaire-net";

const F = "2026-10-23";

export default definirCasos(calculadora, [
  {
    nombre: "300 000 F bruts, célibataire sans enfant",
    origen: { tipo: "recalculado", detalle: "ITS 39 000 ; retraite CNPS 6,3 % = 18 900. Net 300 000 − 39 000 − 18 900 = 242 100." },
    fecha: F,
    entrada: { brut: 300000, nonImposable: 0, situation: "celibataire", enfants: 0, infirmes: 0, autres: 0 },
    esperado: { its: 39000, cnps: 18900, net: 242100, netAnnuel: 2905200 },
  },
  {
    nombre: "300 000 F, marié avec deux enfants, transport et retenue",
    origen: { tipo: "recalculado", detalle: "ITS 39 000 − 22 000 = 17 000. Net 300 000 − 17 000 − 18 900 − 1 000 + 30 000 = 293 100." },
    fecha: F,
    entrada: { brut: 300000, nonImposable: 30000, situation: "marie", enfants: 2, infirmes: 0, autres: 1000 },
    esperado: { its: 17000, net: 293100, parts: 3 },
  },
  {
    nombre: "Retenues supérieures au salaire",
    origen: { tipo: "recalculado", detalle: "Saisie impossible." },
    fecha: F,
    entrada: { brut: 100000, nonImposable: 0, situation: "celibataire", enfants: 0, infirmes: 0, autres: 200000 },
    esperaError: true,
  },
]);
