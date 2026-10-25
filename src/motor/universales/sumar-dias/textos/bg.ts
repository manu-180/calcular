import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosBg: TextosUi<UiSumarDias> = {
  slug: "dobavyane-na-dni-kam-data",
  ui: () => ({
    fecha: "Начална дата",
    operacion: "Действие",
    sumar: "Добавяне на дни",
    restar: "Изваждане на дни",
    dias: "Брой дни",
    tipo: "Вид дни",
    corridos: "Календарни дни",
    habiles: "Работни дни (от понеделник до петък)",
    resultado: "Получена дата",
    diaSemana: "Ден от седмицата",
    diasCorridos: "Общо календарни дни",
    nombresDias: ["неделя", "понеделник", "вторник", "сряда", "четвъртък", "петък", "събота"],
    errorDias: "Броят дни трябва да е цяло число, до 100 години.",
    notaHabiles: "Работните дни пропускат съботите и неделите, но не и официалните празници. Ако има празник по средата, добавете го отделно.",
  }),
};
