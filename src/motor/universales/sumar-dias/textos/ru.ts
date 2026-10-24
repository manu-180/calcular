import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosRu: TextosUi<UiSumarDias> = {
  slug: "pribavit-dni-k-date",
  ui: () => ({
    fecha: "Начальная дата",
    operacion: "Действие",
    sumar: "Прибавить дни",
    restar: "Вычесть дни",
    dias: "Количество дней",
    tipo: "Какие дни считать",
    corridos: "Календарные дни",
    habiles: "Рабочие дни (с понедельника по пятницу)",
    resultado: "Итоговая дата",
    diaSemana: "День недели",
    diasCorridos: "Всего календарных дней",
    nombresDias: ["воскресенье", "понедельник", "вторник", "среда", "четверг", "пятница", "суббота"],
    errorDias: "Количество дней должно быть целым числом, не больше чем за 100 лет.",
    notaHabiles: "Рабочие дни пропускают субботы и воскресенья, но не праздники. Если между датами есть праздник, прибавьте его отдельно.",
  }),
};
