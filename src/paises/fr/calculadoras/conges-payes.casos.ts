import { definirCasos } from "@/motor/calculo";
import congesPayes from "./conges-payes";

export default definirCasos(congesPayes, [
  {
    nombre: "Deux semaines de congés, 24 000 € sur la période",
    origen: {
      tipo: "oficial",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F33359",
      detalle: "Exemple Service-Public : maintien 2 000 × 10 ÷ 21 = 952,38 € ; dixième 2 400 × 10 ÷ 25 = 960 €. Le salarié perçoit 960 €.",
    },
    fecha: "2026-10-14",
    entrada: { mois: 12, brutPeriode: 24000, salaireMensuel: 2000, joursPris: 10, joursMois: 21 },
    esperado: { acquisOuvrables: 30, maintien: 952.38, dixieme: 960, indemnite: 960, methode: "Règle du dixième" },
  },
  {
    nombre: "5 mois de travail",
    origen: {
      tipo: "oficial",
      url: "https://www.service-public.gouv.fr/particuliers/vosdroits/F2258",
      detalle: "Exemple Service-Public : 2,5 × 5 = 12,5, arrondi à 13 jours ouvrables.",
    },
    fecha: "2026-10-14",
    entrada: { mois: 5, brutPeriode: 10000, salaireMensuel: 2000, joursPris: 5, joursMois: 21 },
    esperado: { acquisOuvrables: 13 },
  },
  {
    nombre: "Augmentation récente : le maintien l'emporte",
    origen: {
      tipo: "recalculado",
      detalle: "Dixième : 2 400 × 5 ÷ 25 = 480. Maintien : 2 600 × 5 ÷ 22 = 590,91. Le maintien est plus favorable.",
    },
    fecha: "2026-10-14",
    entrada: { mois: 12, brutPeriode: 24000, salaireMensuel: 2600, joursPris: 5, joursMois: 22 },
    esperado: { dixieme: 480, maintien: 590.91, indemnite: 590.91, methode: "Maintien de salaire" },
  },
]);
