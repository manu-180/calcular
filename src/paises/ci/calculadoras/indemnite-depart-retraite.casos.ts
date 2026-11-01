import { definirCasos } from "@/motor/calculo";
import calculadora from "./indemnite-depart-retraite";

export default definirCasos(calculadora, [
  {"nombre": "20 ans de présence à 400 000 F", "origen": {"tipo": "recalculado", "detalle": "150 % + 175 % + 10 × 40 % = 725 % : 2 900 000, soit 7,25 mois."}, "fecha": "2026-10-23", "entrada": {"salaire": 400000, "annees": 20, "mois": 0}, "esperado": {"pourcentage": 725, "indemnite": 2900000, "enMois": 7.25}},
]);
