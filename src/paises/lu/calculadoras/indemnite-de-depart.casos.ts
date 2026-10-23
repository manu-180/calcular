import { definirCasos } from "@/motor/calculo";
import indemniteDeDepart from "./indemnite-de-depart";

const CT = "https://legilux.public.lu/eli/etat/leg/code/travail/20260310";

export default definirCasos(indemniteDeDepart, [
  {
    nombre: "12 ans d'ancienneté",
    origen: { tipo: "recalculado", url: CT, detalle: "Au moins dix années : deux mois de salaire (art. L. 124-7). 2 x 4000 = 8000." },
    fecha: "2026-10-16",
    entrada: { salaire: 4000, anciennete: 12 },
    esperado: { mois: 2, indemnite: 8000 },
  },
  {
    nombre: "30 ans d'ancienneté",
    origen: { tipo: "recalculado", url: CT, detalle: "Trente années au moins : douze mois. 12 x 5000 = 60 000." },
    fecha: "2026-10-16",
    entrada: { salaire: 5000, anciennete: 30 },
    esperado: { mois: 12, indemnite: 60000 },
  },
  {
    nombre: "Moins de 5 ans",
    origen: { tipo: "recalculado", url: CT, detalle: "Pas d'indemnité avant cinq années." },
    fecha: "2026-10-16",
    entrada: { salaire: 4000, anciennete: 4 },
    esperado: { mois: 0, indemnite: 0 },
  },
]);
