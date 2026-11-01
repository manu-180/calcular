import { formaRu, pluralRu } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosRu: TextosUi<UiTarjetaDeCredito> = {
  slug: "pogashenie-kreditnoy-karty",
  ui: () => ({
    saldo: "Долг по карте",
    tasa: "Годовая процентная ставка (%)",
    tasaAyuda: "Ставка на покупки после льготного периода. Ее можно найти в договоре или в выписке по карте.",
    modo: "Как вы будете платить?",
    modoFijo: "Фиксированную сумму каждый месяц",
    modoMinimo: "Минимальный платеж",
    pagoFijo: "Фиксированный платеж в месяц",
    minimoPorcentaje: "Минимальный платеж (% от долга)",
    minimoPorcentajeAyuda: "Сколько банк требует внести каждый месяц. Если вы не уверены, часто это около 5%.",
    minimoPiso: "Минимальный платеж не меньше",
    meses: "Месяцев до полного погашения",
    intereses: "Переплата по процентам",
    total: "Всего к выплате",
    primerPago: "Первый минимальный платеж",
    tabla: "План погашения по месяцам",
    colMes: "Месяц",
    colPago: "Платеж",
    colInteres: "Проценты",
    colCapital: "Основной долг",
    colSaldo: "Остаток долга",
    errorSaldo: "Введите сумму долга по карте.",
    errorFaltaPago: "Введите сумму, которую вы будете платить каждый месяц.",
    errorNoCubre: (interes) => `С таким платежом долг не уменьшается: одни только проценты за первый месяц составляют ${interes}. Увеличьте платеж.`,
    errorMuyLargo: "С таким платежом погашение займет больше 50 лет. Увеличьте платеж.",
    observacionAnios: (anios, meses) => {
      const a = pluralRu(anios, "год", "года", "лет");
      const m = meses === "0" ? "" : ` и ${pluralRu(meses, "месяц", "месяца", "месяцев")}`;
      return `Это ${a}${m}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Если всегда платить ${pago}, как первый минимальный платеж, вы погасите долг за ${meses} ${formaRu(meses, "месяц", "месяца", "месяцев")} и сэкономите ${ahorro} на процентах.`,
    observacionNoGastar: "Расчет исходит из того, что пока вы гасите долг, новых покупок по карте нет.",
  }),
};
