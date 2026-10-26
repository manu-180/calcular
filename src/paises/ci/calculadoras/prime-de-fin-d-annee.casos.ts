import { definirCasos } from "@/motor/calculo";
import calculadora from "./prime-de-fin-d-annee";

export default definirCasos(calculadora, [
  {"nombre": "Année complète", "origen": {"tipo": "recalculado", "detalle": "3/4 de 150 000 = 112 500."}, "fecha": "2026-10-23", "entrada": {"salaire": 150000, "mois": 12}, "esperado": {"prime": 112500, "pleine": 112500}},
  {"nombre": "Six mois de service", "origen": {"tipo": "recalculado", "detalle": "112 500 × 6 / 12 = 56 250."}, "fecha": "2026-10-23", "entrada": {"salaire": 150000, "mois": 6}, "esperado": {"prime": 56250}},
]);
