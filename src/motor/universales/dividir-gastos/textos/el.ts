import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosEl: TextosUi<UiDividirGastos> = {
  slug: "moirasma-exodon",
  ui: () => ({
    persona: (n) => `Άτομο ${n}`,
    personaAyuda: "Εισάγετε πόσα πλήρωσε ο καθένας. Αν κάποιος δεν πλήρωσε τίποτα αλλά συμμετέχει στο έξοδο, εισάγετε 0. Τα υπόλοιπα πεδία αφήστε τα κενά.",
    total: "Συνολικό έξοδο",
    personas: "Αριθμός ατόμων",
    cuota: "Μερίδιο ανά άτομο",
    transferencias: "Πληρωμές για εξόφληση",
    tabla: "Ποιος πληρώνει ποιον",
    colDe: "Πληρώνει",
    colPara: "Λαμβάνει",
    colMonto: "Ποσό",
    errorPocas: "Για να μοιραστεί το έξοδο, εισάγετε τουλάχιστον δύο άτομα.",
    aMano: "Είστε ήδη εξοφλημένοι: όλοι πλήρωσαν το ίδιο ποσό.",
  }),
};
