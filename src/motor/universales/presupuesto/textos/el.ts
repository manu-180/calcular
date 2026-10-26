import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosEl: TextosUi<UiPresupuesto> = {
  slug: "oikogeneiakos-proypologismos",
  ui: () => ({
    ingreso: "Καθαρό μηνιαίο εισόδημα",
    ingresoAyuda: "Όσα μπαίνουν στον λογαριασμό σας κάθε μήνα, μετά από φόρους και κρατήσεις.",
    pctNecesidades: "Ανάγκες (%)",
    pctNecesidadesAyuda: "Στέγαση, σούπερ μάρκετ, λογαριασμοί, μετακινήσεις, υγεία και οι ελάχιστες δόσεις των χρεών.",
    pctGustos: "Επιθυμίες (%)",
    pctGustosAyuda: "Φαγητό έξω, μη απαραίτητες αγορές, συνδρομές, ταξίδια.",
    pctAhorro: "Αποταμίευση (%)",
    pctAhorroAyuda: "Αποθεματικό για έκτακτες ανάγκες, στόχοι, σύνταξη και επιπλέον αποπληρωμή χρεών.",
    necesidades: "Για ανάγκες",
    gustos: "Για επιθυμίες",
    ahorro: "Για αποταμίευση",
    ahorroAnual: "Αποταμίευση σε ένα έτος",
    errorIngreso: "Εισάγετε το μηνιαίο εισόδημά σας.",
    errorSuma: (suma) => `Τα τρία ποσοστά αθροίζουν ${suma}%. Πρέπει να αθροίζουν 100%.`,
    observacionAhorroBajo: "Αν αποταμιεύετε λιγότερο από 10%, μένει μικρό περιθώριο για απρόοπτα. Αν μπορείτε, περιορίστε κάποιες επιθυμίες.",
  }),
};
