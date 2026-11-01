import { definirCasos } from "@/motor/calculo";
import calculadora from "./preavis";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Employé licencié sans préavis, 200 000 F",
    origen: { tipo: "recalculado", detalle: "Art. 53 et 55 : préavis d'un mois (30 jours) non respecté = 200 000 F ; 4 semaines entières × 2 jours de liberté = 8 jours." },
    fecha: F,
    entrada: { categorie: "employe", salaire: 200000, respectes: 0 },
    esperado: { duree: 30, manquants: 30, indemnite: 200000, joursLiberte: 8 },
  },
  {
    nombre: "Cadre qui a respecté 2 mois sur 3",
    origen: { tipo: "recalculado", detalle: "Art. 53 : trois mois (90 jours) ; 60 jours respectés, 30 manquants = 600 000 / 30 × 30 = 600 000 pour 600 000 F par mois ; 12 semaines × 2 = 24 jours." },
    fecha: F,
    entrada: { categorie: "cadre", salaire: 600000, respectes: 60 },
    esperado: { duree: 90, manquants: 30, indemnite: 600000, joursLiberte: 24 },
  },
  {
    nombre: "Travailleur payé à l'heure, préavis complet",
    origen: { tipo: "recalculado", detalle: "Art. 53 : quinze jours, tous respectés : aucune indemnité ; 2 semaines entières = 4 jours de liberté." },
    fecha: F,
    entrada: { categorie: "horaire", salaire: 90000, respectes: 15 },
    esperado: { duree: 15, manquants: 0, indemnite: 0, joursLiberte: 4 },
  },
]);
