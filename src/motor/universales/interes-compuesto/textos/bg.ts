import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosBg: TextosUi<UiInteresCompuesto> = {
  slug: "slozhna-lihva",
  ui: () => ({
    capital: "Начална сума",
    aporte: "Месечна вноска (по желание)",
    aporteAyuda: "Сумата, която бихте добавяли всеки месец. Добавя се в края на всеки месец.",
    tasa: "Годишен лихвен процент (%)",
    anios: "Години",
    capitalizacion: "Капитализация на лихвата",
    anual: "Годишна",
    semestral: "Шестмесечна",
    trimestral: "Тримесечна",
    mensual: "Месечна",
    diaria: "Дневна",
    saldo: "Крайна сума",
    aportado: "Общо внесено",
    intereses: "Получена лихва",
    tabla: "Растеж година по година",
    colAnio: "Година",
    colAportado: "Вноски",
    colIntereses: "Лихва",
    colSaldo: "Сума в края на годината",
    errorSinDinero: "Въведете начална сума или месечна вноска.",
    observacionIntereses: (porcentaje) => `${porcentaje}% от крайната сума е лихва.`,
  }),
};
