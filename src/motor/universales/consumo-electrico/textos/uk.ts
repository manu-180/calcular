import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosUk: TextosUi<UiConsumoElectrico> = {
  slug: "spozhyvannia-elektroenerhii",
  ui: () => ({
    potencia: "Потужність приладу (Вт)",
    potenciaAyuda: "Її вказують на етикетці або в інструкції у ватах (Вт). Якщо написано кВт, помножте на 1000.",
    cantidad: "Кількість однакових приладів",
    horas: "Годин роботи на добу",
    dias: "Днів роботи на місяць",
    precio: "Ціна 1 кВт·год",
    precioAyuda: "Її вказано в рахунку за електроенергію: тариф за 1 кВт·год. Для повної вартості введіть ціну з податками.",
    kwhDia: "Споживання за добу (кВт·год)",
    kwhMes: "Споживання за місяць (кВт·год)",
    kwhAnio: "Споживання за рік (кВт·год)",
    costoDia: "Вартість за добу",
    costoMes: "Вартість за місяць",
    costoAnio: "Вартість за рік",
    errorHoras: "У добі 24 години: час роботи має бути від 0 до 24.",
  }),
};
