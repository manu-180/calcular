import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosTr: TextosUi<UiReglaDeTres> = {
  slug: "oran-oranti-hesaplama",
  ui: () => ({
    tipo: "Orantı türü",
    directa: "Doğru orantı (A artınca B de artar)",
    inversa: "Ters orantı (A artınca B azalır)",
    a: "A",
    aAyuda: "Şöyle okuyun: A değeri B'ye karşılık geliyorsa C değeri X'e karşılık gelir. A, B ve C değerlerini girin.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Bu değer 0 olamaz: hesapta bu sayıya bölünür.",
    fraseDirecta: (a, b, c, x) => `Doğru orantıda ${a} karşılığı ${b} ise ${c} karşılığı ${x} olur. Hesap: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Ters orantıda ${a} karşılığı ${b} ise ${c} karşılığı ${x} olur. Hesap: ${a} × ${b} ÷ ${c}.`,
  }),
};
