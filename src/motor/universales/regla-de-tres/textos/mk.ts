import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosMk: TextosUi<UiReglaDeTres> = {
  slug: "kalkulator-za-trojno-pravilo",
  ui: () => ({
    tipo: "Вид пропорција",
    directa: "Права (кога A расте, расте и B)",
    inversa: "Обратна (кога A расте, B се намалува)",
    a: "A",
    aAyuda: "Се чита вака: A се однесува спрема B како C спрема X. Внесете ги A, B и C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Оваа вредност не може да биде 0, бидејќи пресметката се дели со неа.",
    fraseDirecta: (a, b, c, x) => `Ако на ${a} одговара ${b}, тогаш на ${c} одговара ${x}. Пресметка: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Ако ${a} дава ${b}, тогаш ${c} дава ${x}. Пресметка: ${a} × ${b} ÷ ${c}.`,
  }),
};
