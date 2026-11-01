import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosRu: TextosUi<UiConsumoElectrico> = {
  slug: "raskhod-elektroenergii",
  ui: () => ({
    potencia: "Мощность прибора (Вт)",
    potenciaAyuda: "Она указана на наклейке или в инструкции, в ваттах (Вт). Если указано в кВт, умножьте на 1000.",
    cantidad: "Количество одинаковых приборов",
    horas: "Часов работы в день",
    dias: "Дней работы в месяц",
    precio: "Цена за кВт·ч",
    precioAyuda: "Она указана в квитанции за электроэнергию: тариф за кВт·ч, с налогами, если нужна полная стоимость.",
    kwhDia: "Расход в день (кВт·ч)",
    kwhMes: "Расход в месяц (кВт·ч)",
    kwhAnio: "Расход в год (кВт·ч)",
    costoDia: "Стоимость в день",
    costoMes: "Стоимость в месяц",
    costoAnio: "Стоимость в год",
    errorHoras: "В сутках 24 часа: время работы должно быть от 0 до 24.",
  }),
};
