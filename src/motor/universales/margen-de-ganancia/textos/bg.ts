import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosBg: TextosUi<UiMargenDeGanancia> = {
  slug: "kalkulator-za-marzh",
  ui: () => ({
    modo: "Какво искате да изчислите?",
    modoPrecio: "Маржа по себестойност и цена",
    modoMargen: "Цената за желан марж",
    modoMarkup: "Цената за желана надценка",
    costo: "Себестойност на брой",
    costoAyuda: "Колко струва да купите или произведете един брой, без ДДС, който се прехвърля на клиента.",
    precio: "Продажна цена",
    precioAyuda: "Само ако изчислявате маржа. Без ДДС.",
    objetivo: "Желан марж или надценка (%)",
    objetivoAyuda: "Само ако изчислявате цената.",
    precioResultado: "Продажна цена",
    margen: "Марж на печалбата",
    margenAyuda: "Печалбата като процент от продажната цена.",
    markup: "Надценка",
    markupAyuda: "Печалбата като процент от себестойността.",
    ganancia: "Печалба на брой",
    errorCosto: "Въведете себестойността на един брой.",
    errorFaltaPrecio: "Въведете продажната цена, за да изчислим маржа.",
    errorFaltaObjetivo: "Въведете маржа или надценката, към които се стремите.",
    errorMargen100: "Маржът трябва да е под 100%: при 100% цялата цена би била печалба без никаква себестойност.",
    observacionPerdida: "При тази цена продавате под себестойността и губите пари от всяка продажба.",
  }),
};
