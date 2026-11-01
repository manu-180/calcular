import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosRu: TextosUi<UiInteresCompuesto> = {
  slug: "slozhnye-protsenty",
  ui: () => ({
    capital: "Начальная сумма",
    aporte: "Ежемесячное пополнение (необязательно)",
    aporteAyuda: "Сколько вы будете добавлять каждый месяц. Пополнение учитывается в конце месяца.",
    tasa: "Годовая процентная ставка (%)",
    anios: "Срок (в годах)",
    capitalizacion: "Капитализация процентов",
    anual: "Раз в год",
    semestral: "Раз в полгода",
    trimestral: "Ежеквартально",
    mensual: "Ежемесячно",
    diaria: "Ежедневно",
    saldo: "Итоговая сумма",
    aportado: "Всего внесено",
    intereses: "Начисленные проценты",
    tabla: "Рост по годам",
    colAnio: "Год",
    colAportado: "Внесено",
    colIntereses: "Проценты",
    colSaldo: "Сумма на конец года",
    errorSinDinero: "Введите начальную сумму или ежемесячное пополнение.",
    observacionIntereses: (porcentaje) => `Проценты составляют ${porcentaje}% итоговой суммы.`,
  }),
};
