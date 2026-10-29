import { definirCasos } from "@/motor/calculo";
import calculadora from "./preavis";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Salarié au mois à 150 000 F",
    origen: { tipo: "recalculado", detalle: "Article 76 : un mois. Indemnité compensatrice 150 000." },
    fecha: F,
    entrada: { categorie: "employe", salaire: 150000, journalier: null },
    esperado: { mois: 1, duree: "1 mois", indemnite: 150000 },
  },
  {
    nombre: "Cadre à 600 000 F",
    origen: { tipo: "recalculado", detalle: "Article 76 : trois mois. 3 × 600 000 = 1 800 000." },
    fecha: F,
    entrada: { categorie: "cadre", salaire: 600000, journalier: null },
    esperado: { mois: 3, indemnite: 1800000 },
  },
  {
    nombre: "Journalier à 2 500 F par jour",
    origen: { tipo: "recalculado", detalle: "Article 76 : huit jours. 8 × 2 500 = 20 000." },
    fecha: F,
    entrada: { categorie: "horaire", salaire: null, journalier: 2500 },
    esperado: { jours: 8, duree: "8 jours", indemnite: 20000 },
  },
]);
