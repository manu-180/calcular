import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "λίτρα" : "γαλόνια");

export const textosEl: TextosUi<UiPintura> = {
  slug: "ypologismos-chromatos",
  ui: () => ({
    modo: "Ποιες μετρήσεις έχετε;",
    modoMedidas: "Μήκος και ύψος των τοίχων",
    modoSuperficie: "Τη συνολική επιφάνεια",
    largo: (u) => `Συνολικό μήκος των τοίχων (${u})`,
    largoAyuda: "Όλοι οι τοίχοι που θα βάψετε μαζί. Για ένα δωμάτιο, η περίμετρος.",
    alto: (u) => `Ύψος των τοίχων (${u})`,
    superficie: (u) => `Επιφάνεια για βάψιμο (${u})`,
    aberturas: (u) => `Πόρτες και παράθυρα που εξαιρούνται (${u})`,
    aberturasAyuda: "Μια πόρτα είναι περίπου 2 m² (21 ft²) και ένα συνηθισμένο παράθυρο από 1 έως 2 m².",
    manos: "Αριθμός χεριών",
    rendimiento: (u) => `Απόδοση του χρώματος (${u})`,
    rendimientoAyuda: "Αναγράφεται στη συσκευασία: πόση επιφάνεια καλύπτει σε κάθε χέρι. Αν δεν τη γνωρίζετε, κρατήστε την προτεινόμενη τιμή.",
    recomendado: (u) => `Χρώμα που θα αγοράσετε (${volumen(u)})`,
    recomendadoAyuda: "Περιλαμβάνει 10% επιπλέον για διορθώσεις και ό,τι μένει στο ρολό.",
    necesario: (u) => `Ακριβής ποσότητα (${volumen(u)})`,
    neta: (u) => `Επιφάνεια για βάψιμο (${u})`,
    errorMedidas: "Συμπληρώστε το μήκος και το ύψος των τοίχων.",
    errorSuperficie: "Συμπληρώστε την επιφάνεια για βάψιμο.",
    errorAberturas: "Οι πόρτες και τα παράθυρα δεν μπορούν να καλύπτουν όλο τον τοίχο.",
    errorRendimiento: "Η απόδοση πρέπει να είναι μεγαλύτερη από 0.",
  }),
};
