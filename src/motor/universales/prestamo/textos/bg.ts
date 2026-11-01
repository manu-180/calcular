import { formaBg } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosBg: TextosUi<UiPrestamo> = {
  slug: "krediten-kalkulator",
  ui: () => ({
    monto: "Размер на кредита",
    tasa: "Годишен лихвен процент (%)",
    tasaAyuda: "Номиналният годишен лихвен процент от офертата (ГЛП). Таксите не са включени.",
    meses: "Срок в месеци",
    extra: "Допълнителна вноска на месец (по избор)",
    extraAyuda: "Сумата, която бихте добавяли всеки месец, за да изплатите по-рано. Тя отива изцяло за главницата.",
    cuota: "Месечна вноска",
    intereses: "Обща лихва",
    total: "Общо платено",
    mesesReales: "Месеци до изплащане с допълнителната вноска",
    ahorro: "Спестена лихва",
    tabla: "Погасителен план",
    colMes: "Месец",
    colPago: "Вноска",
    colInteres: "Лихва",
    colCapital: "Главница",
    colSaldo: "Остатък",
    errorMonto: "Въведете сума, по-голяма от нула.",
    observacionCostos: "Вноската не включва застраховки, такси и данъци, които кредиторът може да добави. Поискайте общата цена на кредита, преди да подпишете.",
    observacionExtra: (meses, ahorro) => `С допълнителната вноска изплащате кредита за ${meses} ${formaBg(meses, "месец", "месеца")} и спестявате ${ahorro} лихва.`,
  }),
};
