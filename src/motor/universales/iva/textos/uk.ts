import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosUk: TextosUi<UiIva> = {
  slug: "kalkuliator-pdv",
  ui: () => ({
    operacion: "Що ви хочете зробити?",
    agregar: "Нарахувати ПДВ на ціну без ПДВ",
    quitar: "Виділити ПДВ з ціни, що його містить",
    monto: "Ціна",
    montoAyuda: "Без ПДВ, якщо ви його нараховуєте; з ПДВ, якщо виділяєте.",
    otraTasa: "Інша ставка ПДВ (%)",
    otraTasaAyuda: "Необовʼязково. Якщо для вашого товару чи послуги діє знижена ставка, введіть її тут. Інакше застосовується основна ставка.",
    neto: "Ціна без ПДВ",
    impuesto: "Сума ПДВ",
    total: "Ціна з ПДВ",
    tasaUsada: "Застосована ставка",
    errorTasa: "Ставка ПДВ некоректна.",
  }),
};
