import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosPl: TextosUi<UiReglaDeTres> = {
  slug: "kalkulator-proporcji",
  ui: () => ({
    tipo: "Rodzaj proporcji",
    directa: "Prosta (gdy A rośnie, B też rośnie)",
    inversa: "Odwrotna (gdy A rośnie, B maleje)",
    a: "A",
    aAyuda: "Czytaj tak: A ma się do B jak C do X. Wpisz A, B i C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Ta wartość nie może wynosić 0: dzielimy przez nią.",
    fraseDirecta: (a, b, c, x) => `Jeśli ${a} odpowiada ${b}, to ${c} odpowiada ${x}. Rachunek: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Jeśli ${a} daje ${b}, to ${c} daje ${x}. Rachunek: ${a} × ${b} ÷ ${c}.`,
  }),
};
