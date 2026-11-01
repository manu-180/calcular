import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosEl: TextosUi<UiInteresSimple> = {
  slug: "aplos-tokos",
  ui: () => ({
    capital: "Κεφάλαιο",
    tasa: "Ετήσιο επιτόκιο (%)",
    tiempo: "Διάρκεια",
    unidad: "Η διάρκεια είναι σε",
    dias: "Ημέρες",
    meses: "Μήνες",
    anios: "Έτη",
    base: "Ημέρες του έτους (για διάρκεια σε ημέρες)",
    baseAyuda: "Ορισμένες τράπεζες λογαριάζουν το έτος με 360 ημέρες. Αν δεν είστε βέβαιοι, αφήστε το 365.",
    base365: "365 ημέρες",
    base360: "360 ημέρες (τραπεζικό έτος)",
    interes: "Τόκος",
    montoFinal: "Κεφάλαιο μαζί με τον τόκο",
    tasaPeriodo: "Επιτόκιο της περιόδου",
    errorCapital: "Εισάγετε κεφάλαιο μεγαλύτερο από το μηδέν.",
  }),
};
