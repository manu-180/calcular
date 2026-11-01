import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosRu: TextosUi<UiVariacion> = {
  slug: "izmenenie-v-protsentakh",
  ui: () => ({
    inicial: "Начальное значение",
    final: "Конечное значение",
    variacion: "Изменение в процентах",
    diferencia: "Разница",
    vuelta: "Чтобы вернуться к началу",
    vueltaAyuda: "На сколько процентов должно измениться конечное значение, чтобы снова стать начальным.",
    errorInicialCero: "Начальное значение не может быть равно 0: от нуля изменение в процентах не считается.",
    subio: (p) => `Значение выросло на ${p}%.`,
    bajo: (p) => `Значение снизилось на ${p}%.`,
    igual: "Изменений нет: оба значения одинаковые.",
  }),
};
