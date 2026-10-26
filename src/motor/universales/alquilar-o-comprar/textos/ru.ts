import { formaRu } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiAlquilarOComprar } from "../definicion";

// «anios» llega ya formateado: se lee de vuelta para elegir «год», «года» o «лет».
const lets = (anios: string) => `${anios} ${formaRu(Number(anios.replace(/\s/g, "").replace(",", ".")), "год", "года", "лет", "года")}`;

export const textosRu: TextosUi<UiAlquilarOComprar> = {
  slug: "arenda-ili-pokupka-zhilya",
  ui: () => ({
    precio: "Стоимость жилья",
    entrada: "Первоначальный взнос (% от стоимости)",
    gastosCompra: "Расходы на покупку (% от стоимости)",
    gastosCompraAyuda: "Услуги нотариуса и риелтора, оценка, госпошлины и регистрация сделки.",
    tasa: "Ставка по ипотеке (% годовых)",
    aniosHipoteca: "Срок ипотеки (лет)",
    alquiler: "Аренда похожего жилья в месяц",
    aumentoAlquiler: "Рост аренды в год (%)",
    gastosPropietario: "Расходы собственника в год (% от стоимости)",
    gastosPropietarioAyuda: "Ремонт и содержание, налог на имущество и страховка. Обычно от 1% до 2%.",
    revalorizacion: "Рост цены жилья в год (%)",
    rendimiento: "Доходность другого вложения (% годовых)",
    rendimientoAyuda: "Сколько вы получили бы, если бы вложили первоначальный взнос, а не купили жилье.",
    horizonte: "Сколько лет сравнивать",
    veredicto: "Итог",
    patrimonioComprar: "Капитал в конце срока при покупке",
    patrimonioAlquilar: "Капитал в конце срока при аренде",
    diferencia: "Разница",
    anioDesde: "Год, с которого покупка выгоднее",
    pagadoAlquilando: "Всего заплачено за аренду",
    pagadoComprando: "Всего платежей по ипотеке и расходов собственника",
    tabla: "Сравнение по годам",
    colAnio: "Год",
    colComprar: "Покупка",
    colAlquilar: "Аренда",
    colDiferencia: "Разница",
    errorPrecio: "Введите стоимость жилья.",
    errorAlquiler: "Введите, сколько стоила бы аренда похожего жилья.",
    convieneComprar: (anios, diferencia) => `Выгоднее купить. Через ${lets(anios)} у вас будет на ${diferencia} больше.`,
    convieneAlquilar: (anios, diferencia) => `Выгоднее арендовать. Через ${lets(anios)} у вас будет на ${diferencia} больше.`,
    empate: (anios) => `Через ${lets(anios)} оба варианта дают одинаковый результат.`,
    observacionDesde: (anio) => `Покупка обгоняет аренду с ${anio}-го года и дальше остается выгоднее.`,
    observacionMetodo:
      "Сравнивается то, чем вы будете владеть в каждом случае. При аренде первоначальный взнос и все, что вы экономите каждый месяц, остаются вложенными. Расходы на продажу жилья не вычитаются.",
  }),
};
