import { pluralEl } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import { duracionEl } from "../../dias-entre-fechas/textos/el";
import type { UiEdad } from "../definicion";

export const textosEl: TextosUi<UiEdad> = {
  slug: "ypologismos-ilikias",
  ui: () => ({
    nacimiento: "Ημερομηνία γέννησης",
    referencia: "Ηλικία στις",
    referenciaAyuda: "Από προεπιλογή η σημερινή ημερομηνία. Αλλάξτε την αν θέλετε την ηλικία σε άλλη ημέρα.",
    edad: "Ηλικία",
    anios: "Συμπληρωμένα έτη",
    totalMeses: "Σε μήνες",
    totalSemanas: "Σε εβδομάδες",
    totalDias: "Σε ημέρες",
    proximo: "Επόμενα γενέθλια",
    faltan: "Ημέρες που απομένουν",
    cumplira: "Ηλικία στα επόμενα γενέθλια",
    duracion: duracionEl,
    errorFutura: "Η ημερομηνία γέννησης δεν μπορεί να είναι μεταγενέστερη από την ημερομηνία υπολογισμού.",
    cumpleHoy: (anios) => `Σήμερα είναι τα γενέθλια: συμπληρώνονται ακριβώς ${pluralEl(anios, "έτος", "έτη")}.`,
    nota29: "Για όσους γεννήθηκαν στις 29 Φεβρουαρίου, στα μη δίσεκτα έτη τα γενέθλια υπολογίζονται στις 28 Φεβρουαρίου.",
  }),
};
