import { formaRu } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import { duracionRu } from "../../dias-entre-fechas/textos/ru";
import type { UiEdad } from "../definicion";

export const textosRu: TextosUi<UiEdad> = {
  slug: "kalkulyator-vozrasta",
  ui: () => ({
    nacimiento: "Дата рождения",
    referencia: "Возраст на дату",
    referenciaAyuda: "По умолчанию сегодня. Измените дату, чтобы узнать возраст на другой день.",
    edad: "Возраст",
    anios: "Полных лет",
    totalMeses: "В месяцах",
    totalSemanas: "В неделях",
    totalDias: "В днях",
    proximo: "Следующий день рождения",
    faltan: "Осталось дней",
    cumplira: "Исполнится лет",
    duracion: duracionRu,
    errorFutura: "Дата рождения не может быть позже даты, на которую считается возраст.",
    cumpleHoy: (anios) => `Сегодня день рождения: исполняется ${anios} ${formaRu(anios, "год", "года", "лет")}.`,
    nota29: "Тем, кто родился 29 февраля, в невисокосные годы день рождения засчитывается 28 февраля.",
  }),
};
