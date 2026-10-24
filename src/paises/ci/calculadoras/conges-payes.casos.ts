import { definirCasos } from "@/motor/calculo";
import calculadora from "./conges-payes";

export default definirCasos(calculadora, [
  {"nombre": "12 mois, 6 ans d'ancienneté", "origen": {"tipo": "recalculado", "detalle": "12 × 2,2 = 26,4, arrondi à 27 jours, plus 1 jour après 5 ans. Allocation 3 600 000 / 12 = 300 000 ; jour d'ancienneté 300 000 / 27 = 11 111."}, "fecha": "2026-10-23", "entrada": {"mois": 12, "annees": 6, "remuneration": 3600000}, "esperado": {"joursPrincipal": 27, "supplement": 1, "jours": 28, "allocationPrincipale": 300000, "allocationSupplement": 11111, "allocation": 311111}},
  {"nombre": "6 mois, 2 ans d'ancienneté", "origen": {"tipo": "recalculado", "detalle": "6 × 2,2 = 13,2, arrondi à 14 jours. Allocation 1 500 000 / 12 = 125 000."}, "fecha": "2026-10-23", "entrada": {"mois": 6, "annees": 2, "remuneration": 1500000}, "esperado": {"jours": 14, "supplement": 0, "allocation": 125000}},
  {"nombre": "30 ans d'ancienneté", "origen": {"tipo": "recalculado", "detalle": "27 jours plus 8 jours. 300 000 / 27 × 8 = 88 889."}, "fecha": "2026-10-23", "entrada": {"mois": 12, "annees": 30, "remuneration": 3600000}, "esperado": {"jours": 35, "allocationSupplement": 88889, "allocation": 388889}},
]);
