import { definirCasos } from "@/motor/calculo";
import calculadora from "./allocation-chomage";

const DECRET = "https://www.joradp.dz/FTP/jo-francais/2026/F2026006.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Nouveau bénéficiaire en 2026",
    origen: {
      tipo: "oficial",
      url: DECRET,
      detalle: "Décret 26-87 : 18 000 DA par mois pendant un an, renouvelable une fois, plus une année supplémentaire (article 7 bis), soit 36 mois et 648 000 DA au plus.",
    },
    fecha: "2026-10-27",
    entrada: { dejaPercus: 0 },
    esperado: { mensuel: 18000, annuel: 216000, restants: 36, montantRestant: 648000, maximum: 36 },
  },
  {
    nombre: "Bénéficiaire avec 24 mois d'ancienneté",
    origen: { tipo: "recalculado", url: DECRET, detalle: "36 − 24 = 12 mois restants, soit 216 000 DA." },
    fecha: "2026-10-27",
    entrada: { dejaPercus: 24 },
    esperado: { restants: 12, montantRestant: 216000 },
  },
  {
    nombre: "Plus que la durée maximale",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-27",
    entrada: { dejaPercus: 40 },
    esperaError: true,
  },
]);
