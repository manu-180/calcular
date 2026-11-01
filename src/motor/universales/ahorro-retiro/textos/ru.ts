import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosRu: TextosUi<UiAhorroRetiro> = {
  slug: "nakopleniya-na-pensiyu",
  ui: () => ({
    edadActual: "Ваш возраст сейчас",
    edadRetiro: "Возраст выхода на пенсию",
    actual: "Сколько уже накоплено",
    aporte: "Ежемесячный взнос",
    rendimiento: "Реальная годовая доходность (%)",
    rendimientoAyuda: "Сколько приносят вложения сверх инфляции. На долгий срок осторожная оценка составляет от 2% до 5%.",
    aniosRenta: "Сколько лет на пенсии покрыть",
    aniosRentaAyuda: "Сколько лет вы хотите жить на эти накопления.",
    capital: "Накопления к пенсии",
    renta: "Ежемесячный доход из накоплений",
    aportado: "Всего внесено",
    intereses: "Общий доход от вложений",
    tabla: "Рост по возрасту",
    colEdad: "Возраст",
    colAportado: "Внесено к этому возрасту",
    colSaldo: "Накопления",
    errorEdades: "Возраст выхода на пенсию должен быть больше вашего возраста сейчас.",
    errorSinAhorro: "Введите текущие накопления или ежемесячный взнос.",
    observacionDineroDeHoy: "Суммы указаны в сегодняшних деньгах, потому что из доходности уже вычтена инфляция.",
    observacionPublica: "Здесь учтены только ваши личные накопления. Государственная пенсия и обязательные пенсионные взносы сюда не входят.",
  }),
};
