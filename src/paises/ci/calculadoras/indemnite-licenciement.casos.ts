import { definirCasos } from "@/motor/calculo";
import calculadora from "./indemnite-licenciement";

export default definirCasos(calculadora, [
  {"nombre": "7 ans de présence à 400 000 F", "origen": {"tipo": "recalculado", "detalle": "5 × 30 % + 2 × 35 % = 220 % du salaire : 880 000."}, "fecha": "2026-10-23", "entrada": {"salaire": 400000, "annees": 7, "mois": 0}, "esperado": {"pourcentage": 220, "indemnite": 880000}},
  {"nombre": "12 ans et 6 mois", "origen": {"tipo": "recalculado", "detalle": "150 % + 175 % + 2,5 × 40 % = 425 % : 1 700 000."}, "fecha": "2026-10-23", "entrada": {"salaire": 400000, "annees": 12, "mois": 6}, "esperado": {"pourcentage": 425, "indemnite": 1700000}},
  {"nombre": "3 ans et 4 mois : la fraction compte au mois", "origen": {"tipo": "recalculado", "detalle": "3,3333 ans × 30 % = 100 % : 400 000."}, "fecha": "2026-10-23", "entrada": {"salaire": 400000, "annees": 3, "mois": 4}, "esperado": {"pourcentage": 100, "indemnite": 400000}},
  {"nombre": "Moins d'un an de présence", "origen": {"tipo": "recalculado", "detalle": "Ancienneté de 10 mois, inférieure à 1 an : pas d'indemnité."}, "fecha": "2026-10-23", "entrada": {"salaire": 400000, "annees": 0, "mois": 10}, "esperado": {"indemnite": 0}},
  {"nombre": "Mois hors limite", "origen": {"tipo": "recalculado", "detalle": "12 mois en plus des années est une saisie invalide."}, "fecha": "2026-10-23", "entrada": {"salaire": 400000, "annees": 2, "mois": 12}, "esperaError": true},
]);
