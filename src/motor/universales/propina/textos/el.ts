import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosEl: TextosUi<UiPropina> = {
  slug: "ypologismos-filodorimatos",
  ui: () => ({
    cuenta: "Ποσό λογαριασμού",
    porcentaje: "Φιλοδώρημα (%)",
    porcentajeAyuda: "Η συνήθεια αλλάζει από χώρα σε χώρα και από μαγαζί σε μαγαζί. Επιλέξτε ό,τι σας φαίνεται σωστό.",
    personas: "Πόσα άτομα πληρώνουν",
    redondear: "Στρογγυλοποίηση κάθε μεριδίου προς τα πάνω",
    redondearAyuda: "Έτσι ο καθένας πληρώνει στρογγυλό ποσό. Η διαφορά πηγαίνει στο φιλοδώρημα.",
    propina: "Φιλοδώρημα",
    total: "Σύνολο με φιλοδώρημα",
    porPersona: "Πληρώνει ο καθένας",
    propinaEfectiva: "Φιλοδώρημα μετά τη στρογγυλοποίηση",
    errorPersonas: "Πρέπει να πληρώνει τουλάχιστον ένα άτομο.",
    observacionRedondeo: (efectiva) => `Μετά τη στρογγυλοποίηση, το φιλοδώρημα είναι ${efectiva}% του λογαριασμού.`,
  }),
};
