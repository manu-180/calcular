import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosEl: TextosUi<UiConsumoElectrico> = {
  slug: "katanalosi-revmatos",
  ui: () => ({
    potencia: "Ισχύς της συσκευής (W)",
    potenciaAyuda: "Τη βρίσκετε στην ετικέτα ή στο εγχειρίδιο, σε watt (W). Αν δίνεται σε kW, πολλαπλασιάστε με 1000.",
    cantidad: "Πλήθος ίδιων συσκευών",
    horas: "Ώρες λειτουργίας την ημέρα",
    dias: "Ημέρες λειτουργίας τον μήνα",
    precio: "Τιμή ανά kWh",
    precioAyuda: "Τη βρίσκετε στον λογαριασμό ρεύματος. Για το πραγματικό κόστος βάλτε την τιμή μαζί με τις ρυθμιζόμενες χρεώσεις και τον ΦΠΑ.",
    kwhDia: "Κατανάλωση την ημέρα (kWh)",
    kwhMes: "Κατανάλωση τον μήνα (kWh)",
    kwhAnio: "Κατανάλωση τον χρόνο (kWh)",
    costoDia: "Κόστος την ημέρα",
    costoMes: "Κόστος τον μήνα",
    costoAnio: "Κόστος τον χρόνο",
    errorHoras: "Η ημέρα έχει 24 ώρες: οι ώρες λειτουργίας πρέπει να είναι από 0 έως 24.",
  }),
};
