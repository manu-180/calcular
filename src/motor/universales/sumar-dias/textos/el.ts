import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosEl: TextosUi<UiSumarDias> = {
  slug: "prosthesi-imeron",
  ui: () => ({
    fecha: "Ημερομηνία έναρξης",
    operacion: "Πράξη",
    sumar: "Πρόσθεση ημερών",
    restar: "Αφαίρεση ημερών",
    dias: "Αριθμός ημερών",
    tipo: "Είδος ημερών",
    corridos: "Ημερολογιακές ημέρες",
    habiles: "Εργάσιμες ημέρες (Δευτέρα έως Παρασκευή)",
    resultado: "Ημερομηνία που προκύπτει",
    diaSemana: "Ημέρα της εβδομάδας",
    diasCorridos: "Ημερολογιακές ημέρες συνολικά",
    nombresDias: ["Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"],
    errorDias: "Ο αριθμός των ημερών πρέπει να είναι ακέραιος, έως 100 χρόνια.",
    notaHabiles: "Οι εργάσιμες ημέρες παραλείπουν Σάββατα και Κυριακές, αλλά όχι τις επίσημες αργίες. Αν μεσολαβεί κάποια, προσθέστε τη χωριστά.",
  }),
};
