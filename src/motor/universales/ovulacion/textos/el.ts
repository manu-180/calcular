import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosEl: TextosUi<UiOvulacion> = {
  slug: "ypologismos-oorrixias",
  ui: () => ({
    fum: "Πρώτη ημέρα της τελευταίας περιόδου",
    fumAyuda: "Η πρώτη ημέρα της αιμορραγίας, όχι η τελευταία.",
    ciclo: "Διάρκεια του κύκλου (ημέρες)",
    cicloAyuda: "Από την πρώτη ημέρα μιας περιόδου έως την ημέρα πριν από την επόμενη. Αν αλλάζει, βάλτε τον μέσο όρο.",
    ovulacion: "Εκτιμώμενη ωορρηξία",
    fertilDesde: "Γόνιμες ημέρες από",
    fertilHasta: "Γόνιμες ημέρες έως",
    proxima: "Επόμενη περίοδος",
    tabla: "Επόμενοι κύκλοι",
    colRegla: "Περίοδος",
    colDesde: "Γόνιμες από",
    colHasta: "Γόνιμες έως",
    colOvulacion: "Ωορρηξία",
    errorCiclo: "Η διάρκεια του κύκλου πρέπει να είναι από 21 έως 45 ημέρες.",
    aviso: "Πρόκειται για εκτίμηση για κανονικούς κύκλους. Δεν είναι μέθοδος αντισύλληψης και δεν αντικαθιστά τη συμβουλή γιατρού ή άλλου επαγγελματία υγείας.",
  }),
};
