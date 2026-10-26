import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosEl: TextosUi<UiReglaDeTres> = {
  slug: "apli-methodos-ton-trion",
  ui: () => ({
    tipo: "Είδος αναλογίας",
    directa: "Ανάλογα ποσά (όταν αυξάνεται το A, αυξάνεται και το B)",
    inversa: "Αντιστρόφως ανάλογα ποσά (όταν αυξάνεται το A, μειώνεται το B)",
    a: "A",
    aAyuda: "Διαβάζεται έτσι: το A αντιστοιχεί στο B όπως το C στο X. Εισάγετε A, B και C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Αυτή η τιμή δεν μπορεί να είναι 0: ο λογαριασμός διαιρεί με αυτήν.",
    fraseDirecta: (a, b, c, x) => `Αν το ${a} αντιστοιχεί σε ${b}, τότε το ${c} αντιστοιχεί σε ${x}. Πράξη: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Αν το ${a} δίνει ${b}, τότε το ${c} δίνει ${x}. Πράξη: ${a} × ${b} ÷ ${c}.`,
  }),
};
