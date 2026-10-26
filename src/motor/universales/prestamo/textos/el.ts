import { formaEl } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosEl: TextosUi<UiPrestamo> = {
  slug: "ypologismos-dosis-daneiou",
  ui: () => ({
    monto: "Ποσό δανείου",
    tasa: "Ετήσιο ονομαστικό επιτόκιο (%)",
    tasaAyuda: "Το ονομαστικό ετήσιο επιτόκιο της προσφοράς. Δεν περιλαμβάνει έξοδα και προμήθειες.",
    meses: "Διάρκεια σε μήνες",
    extra: "Επιπλέον καταβολή κάθε μήνα (προαιρετικό)",
    extraAyuda: "Όσα θα προσθέτατε κάθε μήνα για να το εξοφλήσετε νωρίτερα. Πηγαίνουν όλα στο κεφάλαιο.",
    cuota: "Μηνιαία δόση",
    intereses: "Σύνολο τόκων",
    total: "Συνολικό ποσό αποπληρωμής",
    mesesReales: "Μήνες αποπληρωμής με την επιπλέον καταβολή",
    ahorro: "Τόκοι που εξοικονομείτε",
    tabla: "Πρόγραμμα αποπληρωμής",
    colMes: "Μήνας",
    colPago: "Δόση",
    colInteres: "Τόκος",
    colCapital: "Κεφάλαιο",
    colSaldo: "Υπόλοιπο",
    errorMonto: "Εισάγετε ποσό μεγαλύτερο από το μηδέν.",
    observacionCostos: "Η δόση δεν περιλαμβάνει ασφάλειες, έξοδα ή φόρους που μπορεί να προσθέσει η τράπεζα. Ζητήστε το συνολικό κόστος πριν υπογράψετε.",
    observacionExtra: (meses, ahorro) => `Με την επιπλέον καταβολή εξοφλείτε σε ${meses} ${formaEl(meses, "μήνα", "μήνες")} και εξοικονομείτε ${ahorro} σε τόκους.`,
  }),
};
