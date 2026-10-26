import { definirCasos } from "@/motor/calculo";
import calculadora from "./delai-de-preavis";

export default definirCasos(calculadora, [
  {
    nombre: "Lettre reçue le 1er octobre : fin le 1er novembre",
    origen: { tipo: "recalculado", detalle: "Un mois de préavis (article 14 bis) : 31 jours, seconde moitié à partir du 17 octobre." },
    fecha: "2026-10-24",
    entrada: { notification: "2026-10-01", salaire: 1500 },
    esperado: { fin: "2026-11-01", jours: 31, secondeMoitie: "2026-10-17", indemnite: 1500 },
  },
  {
    nombre: "Lettre reçue le 31 janvier : fin au dernier jour de février",
    origen: { tipo: "recalculado", detalle: "Février 2027 a 28 jours : fin le 28 février, 28 jours de préavis." },
    fecha: "2026-10-24",
    entrada: { notification: "2027-01-31", salaire: 2200 },
    esperado: { fin: "2027-02-28", jours: 28, secondeMoitie: "2027-02-14", indemnite: 2200 },
  },
]);
