import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosBg: TextosUi<UiAumentoDeSueldo> = {
  slug: "uvelichenie-na-zaplatata",
  ui: () => ({
    sueldo: "Сегашна месечна заплата",
    sueldoAyuda: "Брутна или нетна, както предпочитате. Резултатът е на същата основа.",
    aumentoPorcentaje: "Увеличение (%)",
    aumentoMonto: "Увеличение като сума (по желание)",
    aumentoMontoAyuda: "Ако увеличението е фиксирана сума, въведете я тук. Тя се използва вместо процента.",
    inflacion: "Инфлация за периода (%, по желание)",
    inflacionAyuda: "Инфлацията от последното Ви увеличение насам, за да видите дали заплатата купува повече или по-малко от преди.",
    sueldosAnio: "Заплати в годината",
    sueldosAnioAyuda: "12 при месечна заплата. 13 или 14, ако получавате и допълнителна заплата всяка година.",
    nuevo: "Нова месечна заплата",
    diferenciaMensual: "Разлика на месец",
    diferenciaAnual: "Разлика на година",
    porcentaje: "Увеличение в проценти",
    real: "Реално увеличение (след инфлацията)",
    realAyuda: "Колко повече купува новата заплата в сравнение със старата.",
    errorSueldo: "Въведете сегашната си заплата.",
    errorSinAumento: "Въведете увеличението в проценти или като сума.",
    observacionGana: (puntos) => `Изпреварвате инфлацията: заплатата Ви купува с ${puntos}% повече от преди.`,
    observacionPierde: (puntos) => `Увеличението изостава от инфлацията: заплатата Ви купува с ${puntos}% по-малко от преди.`,
    observacionIgual: "Увеличението е колкото инфлацията: заплатата Ви купува толкова, колкото и преди.",
  }),
};
