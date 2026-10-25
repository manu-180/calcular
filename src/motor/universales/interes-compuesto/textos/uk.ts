import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosUk: TextosUi<UiInteresCompuesto> = {
  slug: "skladni-vidsotky",
  ui: () => ({
    capital: "Початкова сума",
    aporte: "Щомісячне поповнення (необовʼязково)",
    aporteAyuda: "Скільки ви додаватимете щомісяця. Поповнення зараховується в кінці кожного місяця.",
    tasa: "Річна відсоткова ставка (%)",
    anios: "Кількість років",
    capitalizacion: "Капіталізація відсотків",
    anual: "Щороку",
    semestral: "Щопівроку",
    trimestral: "Щокварталу",
    mensual: "Щомісяця",
    diaria: "Щодня",
    saldo: "Підсумкова сума",
    aportado: "Загалом внесено",
    intereses: "Нараховані відсотки",
    tabla: "Зростання по роках",
    colAnio: "Рік",
    colAportado: "Внески",
    colIntereses: "Відсотки",
    colSaldo: "Сума на кінець року",
    errorSinDinero: "Введіть початкову суму або щомісячне поповнення.",
    observacionIntereses: (porcentaje) => `${porcentaje}% підсумкової суми становлять відсотки.`,
  }),
};
