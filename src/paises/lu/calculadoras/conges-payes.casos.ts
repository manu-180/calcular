import { definirCasos } from "@/motor/calculo";
import congesPayes from "./conges-payes";

const CT = "https://legilux.public.lu/eli/etat/leg/code/travail/20260310";

export default definirCasos(congesPayes, [
  {
    nombre: "Année complète",
    origen: { tipo: "recalculado", url: CT, detalle: "26 jours ouvrables (art. L. 233-4). 4325 / 173 = 25 euros de l'heure ; 8 heures = 200 par jour (art. L. 233-14) ; 26 jours = 5200." },
    fecha: "2026-10-16",
    entrada: { mois: 12, contrat: null, brut: 4325, heuresJour: 8 },
    esperado: { jours: 26, indemniteJour: 200, indemnite: 5200 },
  },
  {
    nombre: "Six mois travaillés",
    origen: { tipo: "recalculado", url: CT, detalle: "Un douzième par mois entier (art. L. 233-7 et L. 233-12) : 26 x 6 / 12 = 13 jours." },
    fecha: "2026-10-16",
    entrada: { mois: 6, contrat: null, brut: 4325, heuresJour: 8 },
    esperado: { jours: 13, indemnite: 2600 },
  },
  {
    nombre: "Contrat plus favorable",
    origen: { tipo: "recalculado", url: CT, detalle: "30 jours par contrat, 9 mois : 22,5 jours." },
    fecha: "2026-10-16",
    entrada: { mois: 9, contrat: 30, brut: 4325, heuresJour: 8 },
    esperado: { jours: 22.5 },
  },
]);
