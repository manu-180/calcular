import { pluralUk } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiAlquilarOComprar } from "../definicion";

const roky = (n: string) => pluralUk(n, "рік", "роки", "років");

export const textosUk: TextosUi<UiAlquilarOComprar> = {
  slug: "orenda-chy-kupivlia-zhytla",
  ui: () => ({
    precio: "Вартість житла",
    entrada: "Перший внесок (% від вартості)",
    gastosCompra: "Витрати на купівлю (% від вартості)",
    gastosCompraAyuda: "Нотаріус, оцінка, державні збори і послуги рієлтора.",
    tasa: "Ставка за іпотекою (% річних)",
    aniosHipoteca: "Строк іпотеки (років)",
    alquiler: "Щомісячна оренда схожого житла",
    aumentoAlquiler: "Щорічне зростання оренди (%)",
    gastosPropietario: "Витрати власника на рік (% від вартості)",
    gastosPropietarioAyuda: "Ремонт і утримання, податок на нерухомість, страхування житла. Зазвичай від 1% до 2%.",
    revalorizacion: "Щорічне зростання ціни житла (%)",
    rendimiento: "Дохідність альтернативного вкладення (% річних)",
    rendimientoAyuda: "Скільки ви заробили б, якби інвестували перший внесок замість купівлі.",
    horizonte: "За скільки років порівнювати",
    veredicto: "Результат",
    patrimonioComprar: "Ваші статки наприкінці, якщо купите",
    patrimonioAlquilar: "Ваші статки наприкінці, якщо орендуватимете",
    diferencia: "Різниця",
    anioDesde: "Рік, з якого купівля вигідніша",
    pagadoAlquilando: "Загалом сплачено за оренду",
    pagadoComprando: "Загалом сплачено за іпотеку і утримання",
    tabla: "Порівняння по роках",
    colAnio: "Рік",
    colComprar: "Купівля",
    colAlquilar: "Оренда",
    colDiferencia: "Різниця",
    errorPrecio: "Введіть вартість житла.",
    errorAlquiler: "Введіть, скільки коштувала б оренда схожого житла.",
    convieneComprar: (anios, diferencia) => `Купівля вигідніша: через ${roky(anios)} у вас буде на ${diferencia} більше.`,
    convieneAlquilar: (anios, diferencia) => `Оренда вигідніша: через ${roky(anios)} у вас буде на ${diferencia} більше.`,
    empate: (anios) => `Через ${roky(anios)} обидва варіанти дають однаковий результат.`,
    observacionDesde: (anio) => `Купівля випереджає оренду з ${anio}-го року і далі залишається вигіднішою.`,
    observacionMetodo:
      "Порівнюється, що ви матимете в кожному варіанті. Якщо орендуєте, перший внесок і те, що ви щомісяця заощаджуєте, залишаються інвестованими. Витрати на продаж житла не віднімаються.",
  }),
};
