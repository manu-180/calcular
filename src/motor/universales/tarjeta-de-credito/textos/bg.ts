import { pluralBg } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosBg: TextosUi<UiTarjetaDeCredito> = {
  slug: "izplashtane-na-kreditna-karta",
  ui: () => ({
    saldo: "Дълг по картата",
    tasa: "Годишен лихвен процент (%)",
    tasaAyuda: "Лихвата за покупки. Ще я намерите в извлечението по картата.",
    modo: "Как ще плащате?",
    modoFijo: "Фиксирана сума всеки месец",
    modoMinimo: "Минималната вноска",
    pagoFijo: "Фиксирана месечна вноска",
    minimoPorcentaje: "Минимална вноска (% от дълга)",
    minimoPorcentajeAyuda: "Колко изисква издателят на картата всеки месец. Ако не сте сигурни, 5% е често срещан процент.",
    minimoPiso: "Минималната вноска никога не е под",
    meses: "Месеци до изплащане",
    intereses: "Платена лихва",
    total: "Общо платено",
    primerPago: "Първа минимална вноска",
    tabla: "План по месеци",
    colMes: "Месец",
    colPago: "Вноска",
    colInteres: "Лихва",
    colCapital: "Главница",
    colSaldo: "Остатък",
    errorSaldo: "Въведете колко дължите по картата.",
    errorFaltaPago: "Въведете колко ще плащате всеки месец.",
    errorNoCubre: (interes) => `С тази вноска дългът никога не намалява. Само лихвата за първия месец е ${interes}. Увеличете вноската.`,
    errorMuyLargo: "С тази вноска изплащането ще отнеме над 50 години. Увеличете вноската.",
    observacionAnios: (anios, meses) => {
      const a = pluralBg(anios, "година", "години");
      const m = meses === "0" ? "" : ` и ${pluralBg(meses, "месец", "месеца")}`;
      return `Това прави ${a}${m}.`;
    },
    observacionFijo: (pago, meses, ahorro) =>
      `Ако винаги плащате ${pago}, колкото е първата минимална вноска, ще изплатите картата за ${pluralBg(meses, "месец", "месеца")} и ще спестите ${ahorro} лихва.`,
    observacionNoGastar: "Сметката приема, че не правите нови покупки с картата, докато я изплащате.",
  }),
};
