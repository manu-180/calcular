import { definirCasos } from "@/motor/calculo";
import calculadora from "./prime-anciennete";

export default definirCasos(calculadora, [
  {"nombre": "10 ans d'ancienneté", "origen": {"tipo": "recalculado", "detalle": "2 % + 8 × 1 % = 10 % de 150 000 = 15 000."}, "fecha": "2026-10-23", "entrada": {"salaire": 150000, "annees": 10}, "esperado": {"taux": 10, "prime": 15000, "primeAnnuelle": 180000}},
  {"nombre": "2 ans tout juste", "origen": {"tipo": "recalculado", "detalle": "2 % de 150 000 = 3 000."}, "fecha": "2026-10-23", "entrada": {"salaire": 150000, "annees": 2}, "esperado": {"taux": 2, "prime": 3000}},
  {"nombre": "1 an : pas encore de prime", "origen": {"tipo": "recalculado", "detalle": "Il faut 2 ans."}, "fecha": "2026-10-23", "entrada": {"salaire": 150000, "annees": 1}, "esperado": {"taux": 0, "prime": 0}},
  {"nombre": "30 ans : plafond à la 25e année", "origen": {"tipo": "recalculado", "detalle": "2 % + 23 × 1 % = 25 %. 37 500."}, "fecha": "2026-10-23", "entrada": {"salaire": 150000, "annees": 30}, "esperado": {"taux": 25, "prime": 37500}},
]);
