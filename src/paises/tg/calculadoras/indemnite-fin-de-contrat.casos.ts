import { definirCasos } from "@/motor/calculo";
import calculadora from "./indemnite-fin-de-contrat";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Quatre ans de CDD sans CDI",
    origen: { tipo: "recalculado", detalle: "Article 54 : un mois du dernier salaire brut, 250 000." },
    fecha: F,
    entrada: { annees: 4, mois: 0, salaire: 250000, suite: "fin" },
    esperado: { indemnite: 250000, droit: "Oui" },
  },
  {
    nombre: "Trois ans et onze mois",
    origen: { tipo: "recalculado", detalle: "Moins de quatre ans : pas d'indemnité." },
    fecha: F,
    entrada: { annees: 3, mois: 11, salaire: 250000, suite: "fin" },
    esperado: { indemnite: 0, droit: "Non" },
  },
  {
    nombre: "Embauche en CDI",
    origen: { tipo: "recalculado", detalle: "Article 55, point a : pas d'indemnité." },
    fecha: F,
    entrada: { annees: 5, mois: 0, salaire: 250000, suite: "cdi" },
    esperado: { indemnite: 0 },
  },
]);
