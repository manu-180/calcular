import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosMk: TextosUi<UiIva> = {
  slug: "kalkulator-ddv",
  ui: () => ({
    operacion: "Што сакате да пресметате?",
    agregar: "Додавање ДДВ на цена без данок",
    quitar: "Одбивање ДДВ од цена што го вклучува",
    monto: "Цена",
    montoAyuda: "Без ДДВ ако го додавате данокот, со ДДВ ако го одбивате.",
    otraTasa: "Друга стапка на ДДВ (%)",
    otraTasaAyuda: "Незадолжително. Ако за стоката или услугата важи повластена стапка, внесете ја овде. Инаку се применува општата стапка.",
    neto: "Цена без ДДВ",
    impuesto: "Износ на ДДВ",
    total: "Цена со ДДВ",
    tasaUsada: "Применета стапка",
    errorTasa: "Стапката на ДДВ не е валидна.",
  }),
};
