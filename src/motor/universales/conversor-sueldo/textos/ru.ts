import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosRu: TextosUi<UiConversorSueldo> = {
  slug: "zarplata-v-chas",
  ui: () => ({
    monto: "Сумма оплаты",
    periodo: "За какой период указана сумма",
    hora: "Час",
    dia: "День",
    semana: "Неделя",
    quincena: "Полмесяца (24 раза в год)",
    mes: "Месяц",
    anio: "Год",
    horasSemana: "Рабочих часов в неделю",
    diasSemana: "Рабочих дней в неделю",
    semanasAnio: "Оплачиваемых недель в году",
    semanasAnioAyuda: "52, если отпуск оплачивается. Если вам платят только за отработанные недели, вычтите остальные.",
    porHora: "В час",
    porDia: "В день",
    porSemana: "В неделю",
    porQuincena: "За полмесяца",
    porMes: "В месяц",
    porAnio: "В год",
    errorHoras: "Введите, сколько часов в неделю вы работаете.",
    errorSemanas: "Оплачиваемых недель в году должно быть больше нуля.",
    observacionBruto: "Это та же сумма, пересчитанная на другие периоды. Премии не добавлены, налоги не вычтены.",
  }),
};
