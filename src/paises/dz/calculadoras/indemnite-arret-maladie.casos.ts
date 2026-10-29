import { definirCasos } from "@/motor/calculo";
import calculadora from "./indemnite-arret-maladie";

const ORD9617 = "https://www.joradp.dz/FTP/jo-francais/1996/F1996042.pdf" as const;
const LOI8311 = "https://www.joradp.dz/FTP/jo-francais/1983/F1983028.pdf" as const;

export default definirCasos(calculadora, [
  {
    nombre: "Arrêt de 20 jours, 60 000 DA brut",
    origen: {
      tipo: "recalculado",
      url: ORD9617,
      detalle: "Net 47 558 ; journalier 47 558 / 30 = 1 585,27. Jours 1 à 15 : 50 % = 792,635 × 15 = 11 889,53. Jours 16 à 20 : 100 % × 5 = 7 926,35. Total 19 815,88.",
    },
    fecha: "2026-10-27",
    entrada: { brut: 60000, jours: 20, plein: false },
    esperado: { journalier: 1585.27, joursReduits: 15, montantReduit: 11889.53, joursPleins: 5, montantPlein: 7926.35, total: 19815.88 },
  },
  {
    nombre: "Hospitalisation de 10 jours, SNMG",
    origen: { tipo: "recalculado", url: LOI8311, detalle: "Article 14 : 100 % dès le premier jour en cas d'hospitalisation. Net 21 840 / 30 = 728 × 10 = 7 280." },
    fecha: "2026-10-27",
    entrada: { brut: 24000, jours: 10, plein: true },
    esperado: { journalier: 728, joursReduits: 0, total: 7280, perte: 0 },
  },
  {
    nombre: "Arrêt de 5 jours",
    origen: { tipo: "recalculado", url: ORD9617, detalle: "5 jours à 50 % de 728 = 1 820 ; écart 1 820 avec le net de la période." },
    fecha: "2026-10-27",
    entrada: { brut: 24000, jours: 5, plein: false },
    esperado: { total: 1820, joursPleins: 0, perte: 1820 },
  },
  {
    nombre: "Salaire nul",
    origen: { tipo: "recalculado", detalle: "Saisie invalide." },
    fecha: "2026-10-27",
    entrada: { brut: 0, jours: 5, plein: false },
    esperaError: true,
  },
]);
