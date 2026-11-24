import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosMk: TextosUi<UiInteresCompuesto> = {
  slug: "kalkulator-za-slozhena-kamata",
  ui: () => ({
    capital: "Почетен износ",
    aporte: "Месечна уплата (по желба)",
    aporteAyuda: "Износот што би го додавале секој месец. Се додава на крајот на секој месец.",
    tasa: "Годишна каматна стапка (%)",
    anios: "Години",
    capitalizacion: "Капитализација на каматата",
    anual: "Годишна",
    semestral: "Полугодишна",
    trimestral: "Квартална",
    mensual: "Месечна",
    diaria: "Дневна",
    saldo: "Краен износ",
    aportado: "Вкупно уплатено",
    intereses: "Заработена камата",
    tabla: "Раст година по година",
    colAnio: "Година",
    colAportado: "Уплати",
    colIntereses: "Камата",
    colSaldo: "Износ на крајот на годината",
    errorSinDinero: "Внесете почетен износ или месечна уплата.",
    observacionIntereses: (porcentaje) => `${porcentaje} % од крајниот износ е камата.`,
  }),
};
