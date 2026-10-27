import { definirCasos } from "@/motor/calculo";
import calculadora from "./preavis";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Employé à 250 000 F",
    origen: { tipo: "recalculado", detalle: "Article 74 : un mois ; indemnité 250 000." },
    fecha: F,
    entrada: { categorie: "employes", salaire: 250000 },
    esperado: { duree: "1 mois", mois: 1, indemnite: 250000 },
  },
  {
    nombre: "Cadre à 900 000 F",
    origen: { tipo: "recalculado", detalle: "Article 74 : trois mois ; 900 000 × 3 = 2 700 000." },
    fecha: F,
    entrada: { categorie: "cadres", salaire: 900000 },
    esperado: { duree: "3 mois", indemnite: 2700000 },
  },
  {
    nombre: "Travailleur payé à l'heure",
    origen: { tipo: "recalculado", detalle: "Article 74 : quinze jours ; 60 000 ÷ 30 × 15 = 30 000." },
    fecha: F,
    entrada: { categorie: "horaire", salaire: 60000 },
    esperado: { duree: "15 jours", jours: 15, indemnite: 30000 },
  },
]);
