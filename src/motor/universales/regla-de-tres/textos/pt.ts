import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosPt: TextosUi<UiReglaDeTres> = {
  slug: "regra-de-tres",
  ui: () => ({
    tipo: "Tipo de proporção",
    directa: "Direta (se A aumenta, B aumenta)",
    inversa: "Inversa (se A aumenta, B diminui)",
    a: "A",
    aAyuda: "Leia assim: A está para B assim como C está para X. Preencha A, B e C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Este valor não pode ser 0: a conta divide por ele.",
    fraseDirecta: (a, b, c, x) => `Se ${a} está para ${b}, então ${c} está para ${x}. Conta: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Se ${a} dá ${b}, então ${c} dá ${x}. Conta: ${a} × ${b} ÷ ${c}.`,
  }),
};
