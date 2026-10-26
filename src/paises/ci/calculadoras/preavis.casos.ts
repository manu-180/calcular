import { definirCasos } from "@/motor/calculo";
import calculadora from "./preavis";

export default definirCasos(calculadora, [
  {"nombre": "Payé au mois, 3 ans", "origen": {"tipo": "recalculado", "detalle": "Jusqu'à 6 ans : 1 mois."}, "fecha": "2026-10-23", "entrada": {"categorie": "mensuel", "annees": 3, "mois": 0, "incapacite": false, "salaire": 300000}, "esperado": {"mois": 1, "jours": 0, "duree": "1 mois", "indemnite": 300000}},
  {"nombre": "Payé à l'heure, 4 mois", "origen": {"tipo": "recalculado", "detalle": "Jusqu'à 6 mois : 8 jours. 300 000 / 30 × 8 = 80 000."}, "fecha": "2026-10-23", "entrada": {"categorie": "horaire", "annees": 0, "mois": 4, "incapacite": false, "salaire": 300000}, "esperado": {"jours": 8, "duree": "8 jours", "indemnite": 80000}},
  {"nombre": "Payé à l'heure, 8 mois", "origen": {"tipo": "recalculado", "detalle": "De 6 mois à 1 an : 15 jours."}, "fecha": "2026-10-23", "entrada": {"categorie": "horaire", "annees": 0, "mois": 8, "incapacite": false, "salaire": 300000}, "esperado": {"jours": 15, "indemnite": 150000}},
  {"nombre": "Payé au mois, 6 ans tout juste", "origen": {"tipo": "recalculado", "detalle": "De 6 à 11 ans : 2 mois."}, "fecha": "2026-10-23", "entrada": {"categorie": "mensuel", "annees": 6, "mois": 0, "incapacite": false, "salaire": 300000}, "esperado": {"mois": 2}},
  {"nombre": "Cadre, 10 ans", "origen": {"tipo": "recalculado", "detalle": "6e catégorie jusqu'à 16 ans : 3 mois."}, "fecha": "2026-10-23", "entrada": {"categorie": "cadre", "annees": 10, "mois": 0, "incapacite": false, "salaire": 300000}, "esperado": {"mois": 3, "indemnite": 900000}},
  {"nombre": "Payé au mois, 12 ans, incapacité de plus de 40 %", "origen": {"tipo": "recalculado", "detalle": "3 mois doublés : 6 mois."}, "fecha": "2026-10-23", "entrada": {"categorie": "mensuel", "annees": 12, "mois": 0, "incapacite": true, "salaire": 300000}, "esperado": {"mois": 6}},
]);
