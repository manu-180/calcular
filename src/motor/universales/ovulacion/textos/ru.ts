import type { TextosUi } from "../../tipos";
import type { UiOvulacion } from "../definicion";

export const textosRu: TextosUi<UiOvulacion> = {
  slug: "kalkulyator-ovulyatsii",
  ui: () => ({
    fum: "Первый день последней менструации",
    fumAyuda: "Первый день кровотечения, а не последний.",
    ciclo: "Длина цикла (дней)",
    cicloAyuda: "От первого дня одной менструации до дня перед следующей. Если цикл меняется, укажите среднее значение.",
    ovulacion: "Предполагаемая овуляция",
    fertilDesde: "Фертильное окно с",
    fertilHasta: "Фертильное окно по",
    proxima: "Следующая менструация",
    tabla: "Следующие циклы",
    colRegla: "Менструация",
    colDesde: "Фертильно с",
    colHasta: "Фертильно по",
    colOvulacion: "Овуляция",
    errorCiclo: "Длина цикла должна быть от 21 до 45 дней.",
    aviso: "Это оценка для регулярного цикла. Она не служит методом контрацепции и не заменяет консультацию врача.",
  }),
};
