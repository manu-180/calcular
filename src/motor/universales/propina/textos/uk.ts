import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosUk: TextosUi<UiPropina> = {
  slug: "chaiovi",
  ui: () => ({
    cuenta: "Сума рахунку",
    porcentaje: "Чайові (%)",
    porcentajeAyuda: "Звичаї різняться залежно від країни і закладу. Оберіть суму, яка здається вам доречною.",
    personas: "Скільки людей платить",
    redondear: "Округлити частку кожного вгору",
    redondearAyuda: "Щоб кожен платив цілу суму. Різниця додається до чайових.",
    propina: "Чайові",
    total: "Разом із чайовими",
    porPersona: "Кожен платить",
    propinaEfectiva: "Чайові після округлення",
    errorPersonas: "Платити має щонайменше одна людина.",
    observacionRedondeo: (efectiva) => `Після округлення чайові становлять ${efectiva}% від рахунку.`,
  }),
};
