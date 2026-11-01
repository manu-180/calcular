import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosRu: TextosUi<UiReglaDeTres> = {
  slug: "proportsiya",
  ui: () => ({
    tipo: "Вид пропорции",
    directa: "Прямая (A растет, B тоже растет)",
    inversa: "Обратная (A растет, B уменьшается)",
    a: "A",
    aAyuda: "Читается так: A относится к B, как C относится к X. Введите A, B и C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Это значение не может быть равно 0: на него делится результат.",
    fraseDirecta: (a, b, c, x) => `Если ${a} соответствует ${b}, то ${c} соответствует ${x}. Расчет: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Если при ${a} получается ${b}, то при ${c} получается ${x}. Расчет: ${a} × ${b} ÷ ${c}.`,
  }),
};
