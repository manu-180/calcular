import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosEl: TextosUi<UiMetaDeAhorro> = {
  slug: "stochos-apotamiefsis",
  ui: () => ({
    meta: "Πόσα θέλετε να αποταμιεύσετε;",
    actual: "Όσα έχετε ήδη αποταμιεύσει (προαιρετικό)",
    meses: "Μήνες για να φτάσετε τον στόχο",
    rendimiento: "Ετήσια απόδοση των αποταμιεύσεων (%, προαιρετικό)",
    rendimientoAyuda: "Αν τα χρήματα βρίσκονται σε λογαριασμό ή επένδυση με τόκο. Αφήστε το κενό αν δεν αποδίδουν τίποτα.",
    aporteMensual: "Χρειάζεται να αποταμιεύετε τον μήνα",
    aporteSemanal: "Δηλαδή την εβδομάδα",
    totalAportado: "Σύνολο των καταθέσεών σας",
    intereses: "Τόκοι που κερδίζετε",
    errorMeta: "Εισάγετε πόσα θέλετε να αποταμιεύσετε.",
    yaLlegas: "Με όσα έχετε ήδη φτάνετε τον στόχο σε αυτό το διάστημα, χωρίς να προσθέσετε άλλα.",
  }),
};
