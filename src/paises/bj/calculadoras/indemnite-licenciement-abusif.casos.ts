import { definirCasos } from "@/motor/calculo";
import calculadora from "./indemnite-licenciement-abusif";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Licenciement abusif à 250 000 F",
    origen: { tipo: "recalculado", detalle: "Loi n° 2017-05, art. 30 et 31 : 3 × 250 000 = 750 000 au minimum, 9 × 250 000 = 2 250 000 au maximum." },
    fecha: F,
    entrada: { situation: "abusif", salaire: 250000, anciennete: 5 },
    esperado: { minimum: 750000, maximum: 2250000, mois: "De 3 à 9 mois de salaire brut" },
  },
  {
    nombre: "Licenciement irrégulier après 5 ans",
    origen: { tipo: "recalculado", detalle: "Art. 29 : au plus 2 mois de salaire brut, soit 2 × 250 000 = 500 000, due à partir d'un an de travail." },
    fecha: F,
    entrada: { situation: "irregulier", salaire: 250000, anciennete: 5 },
    esperado: { minimum: 0, maximum: 500000, mois: "Jusqu'à 2 mois de salaire brut" },
  },
  {
    nombre: "Licenciement irrégulier avant un an",
    origen: { tipo: "recalculado", detalle: "Art. 29, dernier alinéa : l'indemnité n'est due qu'à compter d'un an de travail effectif." },
    fecha: F,
    entrada: { situation: "irregulier", salaire: 250000, anciennete: 0.5 },
    esperado: { maximum: 0, mois: "Aucune indemnité avant un an de travail effectif" },
  },
]);
