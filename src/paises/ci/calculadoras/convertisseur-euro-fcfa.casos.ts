import { definirCasos } from "@/motor/calculo";
import calculadora from "./convertisseur-euro-fcfa";

export default definirCasos(calculadora, [
  {"nombre": "100 euros en francs CFA", "origen": {"tipo": "recalculado", "detalle": "100 × 655,957 = 65 595,7, arrondi à 65 596."}, "fecha": "2026-10-23", "entrada": {"sens": "eur-xof", "montant": 100}, "esperado": {"francs": 65596, "parite": 655.957}},
  {"nombre": "655 957 F en euros", "origen": {"tipo": "recalculado", "detalle": "655 957 / 655,957 = 1 000."}, "fecha": "2026-10-23", "entrada": {"sens": "xof-eur", "montant": 655957}, "esperado": {"euros": 1000}},
]);
