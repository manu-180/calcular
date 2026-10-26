import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosEl: TextosUi<UiDescuento> = {
  slug: "ypologismos-ekptosis",
  ui: () => ({
    precio: "Αρχική τιμή",
    descuento: "Έκπτωση (%)",
    segundoDescuento: "Επιπλέον έκπτωση (%)",
    segundoDescuentoAyuda: "Αν ισχύει και δεύτερη έκπτωση πάνω στην πρώτη, εισάγετέ την εδώ.",
    ahorro: "Εξοικονομείτε",
    final: "Τιμή μετά την έκπτωση",
    descuentoTotal: "Συνολική έκπτωση",
    errorMayorA100: "Η έκπτωση δεν μπορεί να ξεπερνά το 100%.",
    observacionDoble: (efectivo) => `Δύο διαδοχικές εκπτώσεις δεν προστίθενται: μαζί μειώνουν την τιμή κατά ${efectivo}%.`,
  }),
};
