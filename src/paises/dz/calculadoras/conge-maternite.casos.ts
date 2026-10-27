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
        "Articles 28 et 29 de la loi 83-11 : 14 semaines, au plus tôt 6 semaines avant le terme, à 100 % du salaire net. Début au plus tôt 3 novembre 2026, fin 8 février 2027. Net 47 558 ; par semaine 47 558 × 12 / 52 = 10 974,92 ; sur 14 semaines 153 648,88.",
    },
    fecha: "2026-10-27",
    entrada: { terme: "2026-12-15", brut: 60000 },
    esperado: { duree: 14, debut: "2026-11-03", fin: "2027-02-08", finTerme: "2027-03-22", mensuel: 47558, hebdo: 10974.92, total: 153648.88 },
  },
  {
    nombre: "SNMG de 24 000 DA brut",
    origen: { tipo: "recalculado", url: ORD9617, detalle: "Net 21 840 sans IRG ; par semaine 5 040 ; sur 14 semaines 70 560." },
    fecha: "2026-10-27",
    entrada: { terme: "2027-03-01", brut: 24000 },
    esperado: { mensuel: 21840, hebdo: 5040, total: 70560, debut: "2027-01-18" },
  },
  {
    nombre: "Salaire nul",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-27",
    entrada: { terme: "2027-03-01", brut: 0 },
    esperaError: true,
  },
]);
