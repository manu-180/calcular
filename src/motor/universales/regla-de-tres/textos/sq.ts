import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosSq: TextosUi<UiReglaDeTres> = {
  slug: "rregulli-i-treshit",
  ui: () => ({
    tipo: "Lloji i përpjesëtimit",
    directa: "I drejtë (kur rritet A, rritet edhe B)",
    inversa: "I zhdrejtë (kur rritet A, ulet B)",
    a: "A",
    aAyuda: "Lexohet kështu: A i përgjigjet B-së ashtu si C i përgjigjet X-it. Vendosni A, B dhe C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Kjo vlerë nuk mund të jetë 0: llogaritja pjesëtohet me të.",
    fraseDirecta: (a, b, c, x) => `Nëse ${a} i përgjigjet ${b}, atëherë ${c} i përgjigjet ${x}. Llogaritja: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Nëse ${a} jep ${b}, atëherë ${c} jep ${x}. Llogaritja: ${a} × ${b} ÷ ${c}.`,
  }),
};
