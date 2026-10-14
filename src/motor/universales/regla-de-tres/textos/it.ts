import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosIt: TextosUi<UiReglaDeTres> = {
  slug: "calcolo-proporzioni",
  ui: () => ({
    tipo: "Tipo di proporzione",
    directa: "Diretta (se A aumenta, aumenta anche B)",
    inversa: "Inversa (se A aumenta, B diminuisce)",
    a: "A",
    aAyuda: "Si legge così: A sta a B come C sta a X. Inserisci A, B e C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Questo valore non può essere 0: il calcolo divide per questo numero.",
    fraseDirecta: (a, b, c, x) => `${a} : ${b} = ${c} : ${x}. Calcolo: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Se con ${a} ottieni ${b}, con ${c} ottieni ${x}. Calcolo: ${a} × ${b} ÷ ${c}.`,
  }),
};
