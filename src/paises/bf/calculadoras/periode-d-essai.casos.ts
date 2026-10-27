import { definirCasos } from "@/motor/calculo";
import calculadora from "./periode-d-essai";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Salarié au mois, sans renouvellement",
    origen: { tipo: "recalculado", detalle: "Article 49 : un mois." },
    fecha: F,
    entrada: { categorie: "employe", renouvellement: false },
    esperado: { mois: 1, duree: "1 mois" },
  },
  {
    nombre: "Cadre avec renouvellement",
    origen: { tipo: "recalculado", detalle: "Article 49 : trois mois, renouvelables une fois pour la même durée. Total six mois." },
    fecha: F,
    entrada: { categorie: "cadre", renouvellement: true },
    esperado: { mois: 6, duree: "6 mois", essai: "3 mois" },
  },
  {
    nombre: "Journalier",
    origen: { tipo: "recalculado", detalle: "Article 49 : huit jours." },
    fecha: F,
    entrada: { categorie: "horaire", renouvellement: false },
    esperado: { jours: 8, duree: "8 jours" },
  },
]);
