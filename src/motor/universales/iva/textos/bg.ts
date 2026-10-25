import type { TextosUi } from "../../tipos";
import type { UiIva } from "../definicion";

export const textosBg: TextosUi<UiIva> = {
  slug: "kalkulator-dds",
  ui: () => ({
    operacion: "Какво искате да изчислите?",
    agregar: "Начисляване на ДДС към цена без данък",
    quitar: "Изваждане на ДДС от цена, която го включва",
    monto: "Цена",
    montoAyuda: "Без ДДС, ако начислявате данъка; с ДДС, ако го изваждате.",
    otraTasa: "Друга ставка на ДДС (%)",
    otraTasaAyuda: "По избор. Ако за стоката или услугата важи намалена ставка, въведете я тук. Иначе се прилага основната ставка.",
    neto: "Цена без ДДС",
    impuesto: "Размер на ДДС",
    total: "Цена с ДДС",
    tasaUsada: "Приложена ставка",
    errorTasa: "Ставката на ДДС не е валидна.",
  }),
};
