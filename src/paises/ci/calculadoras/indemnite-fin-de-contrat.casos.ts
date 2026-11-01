import { definirCasos } from "@/motor/calculo";
import calculadora from "./indemnite-fin-de-contrat";

export default definirCasos(calculadora, [
  {"nombre": "CDD arrivé à son terme", "origen": {"tipo": "recalculado", "detalle": "1 800 000 × 3 % = 54 000."}, "fecha": "2026-10-23", "entrada": {"total": 1800000, "fin": "terme"}, "esperado": {"indemnite": 54000, "taux": 3}},
  {"nombre": "Refus d'un CDI équivalent", "origen": {"tipo": "recalculado", "detalle": "L'indemnité n'est pas due."}, "fecha": "2026-10-23", "entrada": {"total": 1800000, "fin": "refus"}, "esperado": {"indemnite": 0}},
]);
