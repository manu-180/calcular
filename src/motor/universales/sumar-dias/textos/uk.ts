import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosUk: TextosUi<UiSumarDias> = {
  slug: "dodaty-dni-do-daty",
  ui: () => ({
    fecha: "Початкова дата",
    operacion: "Дія",
    sumar: "Додати дні",
    restar: "Відняти дні",
    dias: "Кількість днів",
    tipo: "Які дні рахувати",
    corridos: "Календарні дні",
    habiles: "Робочі дні (з понеділка по пʼятницю)",
    resultado: "Отримана дата",
    diaSemana: "День тижня",
    diasCorridos: "Усього календарних днів",
    nombresDias: ["Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "Пʼятниця", "Субота"],
    errorDias: "Кількість днів має бути цілим числом, не більше ніж за 100 років.",
    notaHabiles: "Робочі дні пропускають суботи й неділі, але не свята. Якщо в проміжку є святковий день, додайте його окремо.",
  }),
};
