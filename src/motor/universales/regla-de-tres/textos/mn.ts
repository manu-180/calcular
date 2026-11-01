import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosMn: TextosUi<UiReglaDeTres> = {
  slug: "gurvyn-durmiin-tootsooluur",
  ui: () => ({
    tipo: "Пропорцын төрөл",
    directa: "Шууд (A өсөхөд B мөн өснө)",
    inversa: "Урвуу (A өсөхөд B буурна)",
    a: "A",
    aAyuda: "Дараах байдлаар уншина: A ба B хоёрын харьцаа C ба X хоёрын харьцаатай ижил. A, B, C утгыг оруулна уу.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Энэ утга 0 байж болохгүй, учир нь тооцоонд түүнд хуваана.",
    fraseDirecta: (a, b, c, x) => `Хэрэв ${a} утгад ${b} харгалзвал ${c} утгад ${x} харгалзана. Тооцоо: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Хэрэв ${a} нь ${b} өгдөг бол ${c} нь ${x} өгнө. Тооцоо: ${a} × ${b} ÷ ${c}.`,
  }),
};
