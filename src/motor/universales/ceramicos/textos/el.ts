import type { TextosUi } from "../../tipos";
import type { UiCeramicos } from "../definicion";

export const textosEl: TextosUi<UiCeramicos> = {
  slug: "ypologismos-plakidion",
  ui: () => ({
    superficie: (u) => `Επιφάνεια για επένδυση (${u})`,
    largo: (u) => `Μήκος πλακιδίου (${u})`,
    ancho: (u) => `Πλάτος πλακιδίου (${u})`,
    desperdicio: "Περιθώριο φύρας (%)",
    desperdicioAyuda: "Για κοψίματα και σπασμένα κομμάτια. Σε ίσια τοποθέτηση υπολογίστε 10%, σε διαγώνια 15%.",
    porCaja: "Πλακίδια ανά κουτί",
    porCajaAyuda: "Προαιρετικό. Συμπληρώστε το αν θέλετε να δείτε πόσα κουτιά θα αγοράσετε.",
    piezas: "Πλακίδια που χρειάζεστε (τεμ.)",
    cajas: "Κουτιά για αγορά",
    conDesperdicio: (u) => `Επιφάνεια με τη φύρα (${u})`,
    cubre: (u) => `Επιφάνεια που καλύπτουν τα κουτιά (${u})`,
    errorSuperficie: "Η επιφάνεια πρέπει να είναι μεγαλύτερη από μηδέν.",
    errorPieza: "Οι διαστάσεις του πλακιδίου πρέπει να είναι μεγαλύτερες από μηδέν.",
  }),
};
