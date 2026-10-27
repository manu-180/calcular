import { definirCasos } from "@/motor/calculo";
import calculadora from "./conge-maternite";

const ORD9617 = "https://www.joradp.dz/FTP/jo-francais/1996/F1996042.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Accouchement prévu le 15 décembre 2026, 60 000 DA brut",
    origen: {
      tipo: "recalculado",
      url: ORD9617,
      detalle:
        "Articles 28 et 29 de la loi 83-11 : 14 semaines, au plus tôt 6 semaines avant le terme, à 100 % du salaire net. Début au plus tôt 3 novembre 2026, fin 8 février 2027. Net 47 558 ; indemnité journalière 47 558 / 30 = 1 585,27 (article 15) ; sur 98 jours 155 356,46.",
    },
    fecha: "2026-10-27",
    entrada: { terme: "2026-12-15", brut: 60000 },
    esperado: { duree: 14, debut: "2026-11-03", fin: "2027-02-08", finTerme: "2027-03-22", mensuel: 47558, journaliere: 1585.27, jours: 98, total: 155356.46 },
  },
  {
    nombre: "SNMG de 24 000 DA brut",
    origen: { tipo: "recalculado", url: ORD9617, detalle: "Net 21 840 sans IRG ; 728 par jour ; sur 98 jours 71 344." },
    fecha: "2026-10-27",
    entrada: { terme: "2027-03-01", brut: 24000 },
    esperado: { mensuel: 21840, journaliere: 728, total: 71344, debut: "2027-01-18" },
  },
  {
    nombre: "Salaire nul",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-27",
    entrada: { terme: "2027-03-01", brut: 0 },
    esperaError: true,
  },
]);
