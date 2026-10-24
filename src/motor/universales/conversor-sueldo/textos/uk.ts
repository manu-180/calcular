import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosUk: TextosUi<UiConversorSueldo> = {
  slug: "zarplata-za-hodynu",
  ui: () => ({
    monto: "Оплата",
    periodo: "Оплата за",
    hora: "Годину",
    dia: "День",
    semana: "Тиждень",
    quincena: "Пів місяця (24 рази на рік)",
    mes: "Місяць",
    anio: "Рік",
    horasSemana: "Робочих годин на тиждень",
    diasSemana: "Робочих днів на тиждень",
    semanasAnio: "Оплачуваних тижнів на рік",
    semanasAnioAyuda: "52, якщо у вас оплачувана відпустка. Якщо вам платять лише за відпрацьовані тижні, відніміть решту.",
    porHora: "За годину",
    porDia: "За день",
    porSemana: "За тиждень",
    porQuincena: "За пів місяця",
    porMes: "За місяць",
    porAnio: "За рік",
    errorHoras: "Введіть, скільки годин на тиждень ви працюєте.",
    errorSemanas: "Оплачуваних тижнів на рік має бути більше нуля.",
    observacionBruto: "Це та сама сума, перерахована на інші періоди. Премії не додаються, податки не віднімаються.",
  }),
};
