import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosMk: TextosUi<UiAhorroRetiro> = {
  slug: "kalkulator-za-shtedenje-za-penzija",
  ui: () => ({
    edadActual: "Вашата сегашна возраст",
    edadRetiro: "На колку години сакате да се пензионирате",
    actual: "Колку сте заштеделе досега",
    aporte: "Месечна уплата",
    rendimiento: "Реален годишен принос (%)",
    rendimientoAyuda: "Колку заработува инвестицијата над инфлацијата. На долг рок, 2 % до 5 % е претпазлива претпоставка.",
    aniosRenta: "За колку години пензија да стигнат заштедите",
    aniosRentaAyuda: "Колку години сакате да подигате пари од овие заштеди.",
    capital: "Заштеди при пензионирање",
    renta: "Месечен приход од заштедите",
    aportado: "Вкупно уплатено",
    intereses: "Вкупен раст",
    tabla: "Раст по возраст",
    colEdad: "Возраст",
    colAportado: "Уплатено досега",
    colSaldo: "Заштеди",
    errorEdades: "Возраста за пензионирање мора да биде поголема од вашата сегашна возраст.",
    errorSinAhorro: "Внесете ги сегашните заштеди или месечна уплата.",
    observacionDineroDeHoy: "Износите се во денешни пари, бидејќи приносот веќе е без инфлацијата.",
    observacionPublica: "Ова се само вашите лични заштеди. Државната пензија и дополнителното пензиско осигурување не се вклучени.",
  }),
};
