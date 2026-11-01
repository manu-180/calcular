import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosBg: TextosUi<UiVariacion> = {
  slug: "protsentna-promyana",
  ui: () => ({
    inicial: "Начална стойност",
    final: "Крайна стойност",
    variacion: "Процентна промяна",
    diferencia: "Разлика",
    vuelta: "За връщане към началото",
    vueltaAyuda: "С колко трябва да се промени крайната стойност, за да се върне към началната.",
    errorInicialCero: "Началната стойност не може да е 0, защото от нула няма процентна промяна.",
    subio: (p) => `Увеличение с ${p}%.`,
    bajo: (p) => `Намаление с ${p}%.`,
    igual: "Няма промяна: двете стойности са еднакви.",
  }),
};
