import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosMk: TextosUi<UiMetaDeAhorro> = {
  slug: "kalkulator-za-shtedenje",
  ui: () => ({
    meta: "Колку сакате да заштедите?",
    actual: "Колку веќе имате заштедено (незадолжително)",
    meses: "За колку месеци",
    rendimiento: "Годишен принос на заштедите (%, незадолжително)",
    rendimientoAyuda: "Ако парите се на сметка или во инвестиција што носи камата. Оставете празно ако не носат ништо.",
    aporteMensual: "Треба да одвојувате месечно",
    aporteSemanal: "Тоа значи неделно",
    totalAportado: "Вкупно уплатено од вас",
    intereses: "Добиена камата",
    errorMeta: "Внесете колку сакате да заштедите.",
    yaLlegas: "Тоа што веќе го имате ја достигнува целта во овој рок и без нови уплати.",
  }),
};
