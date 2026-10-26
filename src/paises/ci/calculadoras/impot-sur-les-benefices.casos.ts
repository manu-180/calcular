import { definirCasos } from "@/motor/calculo";
import calculadora from "./impot-sur-les-benefices";

export default definirCasos(calculadora, [
  {"nombre": "Bénéfice de 20 millions", "origen": {"tipo": "recalculado", "detalle": "25 % : 5 000 000."}, "fecha": "2026-10-23", "entrada": {"benefice": 20000000, "secteur": "general"}, "esperado": {"impot": 5000000, "apresImpot": 15000000}},
  {"nombre": "Entreprise de télécommunications", "origen": {"tipo": "recalculado", "detalle": "30 % : 6 000 000."}, "fecha": "2026-10-23", "entrada": {"benefice": 20000000, "secteur": "telecom"}, "esperado": {"impot": 6000000}},
]);
