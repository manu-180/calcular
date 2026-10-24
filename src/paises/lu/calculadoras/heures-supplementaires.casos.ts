import { definirCasos } from "@/motor/calculo";
import heuresSupplementaires from "./heures-supplementaires";

const CT = "https://legilux.public.lu/eli/etat/leg/code/travail/20260310";

export default definirCasos(heuresSupplementaires, [
  {
    nombre: "10 heures sur un salaire de 5190 euros",
    origen: { tipo: "recalculado", url: CT, detalle: "5190 / 173 = 30 ; 10 x 30 x 140 % = 420 ; ou 15 heures de repos (art. L. 211-27)." },
    fecha: "2026-10-16",
    entrada: { brut: 5190, heures: 10 },
    esperado: { horaire: 30, paiement: 420, repos: 15 },
  },
  {
    nombre: "Une heure au salaire social minimum",
    origen: { tipo: "recalculado", url: CT, detalle: "2771,33 / 173 = 16,02 ; x 1,4 = 22,43." },
    fecha: "2026-10-16",
    entrada: { brut: 2771.33, heures: 1 },
    esperado: { horaire: 16.02, paiement: 22.43, repos: 1.5 },
  },
]);
