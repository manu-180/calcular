import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosEl: TextosUi<UiVariacion> = {
  slug: "posostiaia-metavoli",
  ui: () => ({
    inicial: "Αρχική τιμή",
    final: "Τελική τιμή",
    variacion: "Ποσοστιαία μεταβολή",
    diferencia: "Διαφορά",
    vuelta: "Για να επιστρέψει στην αρχική",
    vueltaAyuda: "Πόσο θα έπρεπε να αλλάξει η τελική τιμή για να ξαναγίνει ίση με την αρχική.",
    errorInicialCero: "Η αρχική τιμή δεν μπορεί να είναι 0: από το μηδέν δεν υπάρχει ποσοστιαία μεταβολή.",
    subio: (p) => `Αυξήθηκε κατά ${p}%.`,
    bajo: (p) => `Μειώθηκε κατά ${p}%.`,
    igual: "Καμία μεταβολή: οι δύο τιμές είναι ίδιες.",
  }),
};
