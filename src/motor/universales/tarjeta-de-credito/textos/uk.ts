import { pluralUk } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

const misiatsi = (n: string) => pluralUk(n, "місяць", "місяці", "місяців");

export const textosUk: TextosUi<UiTarjetaDeCredito> = {
  slug: "pohashennia-kredytnoi-kartky",
  ui: () => ({
    saldo: "Заборгованість за карткою",
    tasa: "Річна відсоткова ставка (%)",
    tasaAyuda: "Ставка за покупками після пільгового періоду. Її вказано у виписці або в договорі.",
    modo: "Як ви будете погашати?",
    modoFijo: "Фіксованою сумою щомісяця",
    modoMinimo: "Мінімальним платежем",
    pagoFijo: "Фіксований щомісячний платіж",
    minimoPorcentaje: "Мінімальний платіж (% від заборгованості)",
    minimoPorcentajeAyuda: "Скільки банк вимагає сплатити щомісяця. Якщо не знаєте, часто це 5%.",
    minimoPiso: "Мінімальний платіж не менше ніж",
    meses: "Місяців до повного погашення",
    intereses: "Відсотки, які ви сплатите",
    total: "Загалом до сплати",
    primerPago: "Перший мінімальний платіж",
    tabla: "План по місяцях",
    colMes: "Місяць",
    colPago: "Платіж",
    colInteres: "Відсотки",
    colCapital: "Тіло боргу",
    colSaldo: "Залишок",
    errorSaldo: "Введіть суму заборгованості за карткою.",
    errorFaltaPago: "Введіть, скільки ви сплачуватимете щомісяця.",
    errorNoCubre: (interes) => `З таким платежем борг ніколи не зменшиться: лише відсотки за перший місяць становлять ${interes}. Збільште платіж.`,
    errorMuyLargo: "З таким платежем погашення триватиме понад 50 років. Збільште платіж.",
    observacionAnios: (anios, meses) => {
      const a = pluralUk(anios, "рік", "роки", "років");
      return meses === "0" ? `Це ${a}.` : `Це ${a} і ${misiatsi(meses)}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Якщо завжди платити ${pago}, тобто стільки, скільки перший мінімальний платіж, ви погасите борг за ${misiatsi(meses)} і заощадите ${ahorro} на відсотках.`,
    observacionNoGastar: "Розрахунок передбачає, що під час погашення ви не робите нових покупок карткою.",
  }),
};
