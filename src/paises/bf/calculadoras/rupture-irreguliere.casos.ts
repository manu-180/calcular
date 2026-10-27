import { definirCasos } from "@/motor/calculo";
import calculadora from "./rupture-irreguliere";

const F = "2026-10-27";

export default definirCasos(calculadora, [
  {
    nombre: "Licenciement sans lettre, salaire moyen de 250 000 F",
    origen: { tipo: "recalculado", detalle: "Article 84 : trois mois, 750 000. Article 87 : dommages et intérêts au plus 24 mois, 6 000 000." },
    fecha: F,
    entrada: { cas: "licenciement", salaire: 250000 },
    esperado: { indemnite: 750000, mois: 3, plafond: 6000000, beneficiaire: "Le travailleur" },
  },
  {
    nombre: "Démission verbale, salaire moyen de 120 000 F",
    origen: { tipo: "recalculado", detalle: "Article 84 : un mois au profit de l'employeur. Article 87 : au plus six mois, 720 000." },
    fecha: F,
    entrada: { cas: "demission", salaire: 120000 },
    esperado: { indemnite: 120000, plafond: 720000, beneficiaire: "L'employeur" },
  },
]);
