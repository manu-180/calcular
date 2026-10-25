import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosBg: TextosUi<UiMetaDeAhorro> = {
  slug: "kalkulator-za-spestyavane",
  ui: () => ({
    meta: "Колко искате да спестите?",
    actual: "Колко вече сте спестили (по избор)",
    meses: "За колко месеца",
    rendimiento: "Годишна доходност на спестяванията (%, по избор)",
    rendimientoAyuda: "Ако парите са в сметка или инвестиция, която носи лихва. Оставете празно, ако не носят нищо.",
    aporteMensual: "Трябва да отделяте на месец",
    aporteSemanal: "Това прави на седмица",
    totalAportado: "Общо внесени от Вас",
    intereses: "Получена лихва",
    errorMeta: "Въведете колко искате да спестите.",
    yaLlegas: "Това, което вече имате, достига целта в този срок и без нови вноски.",
  }),
};
