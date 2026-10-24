import { definirCasos } from "@/motor/calculo";
import calculadora from "./convertisseur-dollar-fcfa";

export default definirCasos(calculadora, [
  {"nombre": "100 dollars au cours du 23 octobre 2026", "origen": {"tipo": "recalculado", "detalle": "Moyenne BCEAO (582,5 + 589,5) / 2 = 586. 100 × 586 = 58 600."}, "fecha": "2026-10-23", "entrada": {"sens": "usd-xof", "montant": 100}, "esperado": {"francs": 58600, "cours": 586}},
  {"nombre": "58 600 F en dollars", "origen": {"tipo": "recalculado", "detalle": "58 600 / 586 = 100."}, "fecha": "2026-10-23", "entrada": {"sens": "xof-usd", "montant": 58600}, "esperado": {"dollars": 100}},
]);
