import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosMk: TextosUi<UiConsumoElectrico> = {
  slug: "kalkulator-za-potroshuvachka-na-struja",
  ui: () => ({
    potencia: "Моќност на уредот (W)",
    potenciaAyuda: "Наведена е на етикетата или во упатството, во вати (W). Ако пишува kW, помножете со 1.000.",
    cantidad: "Број на исти уреди",
    horas: "Часови работа на ден",
    dias: "Денови работа во месецот",
    precio: "Цена на kWh",
    precioAyuda: "Наведена е на сметката за струја: цената на kWh, со даноците ако го сакате целиот износ.",
    kwhDia: "Потрошувачка на ден (kWh)",
    kwhMes: "Потрошувачка на месец (kWh)",
    kwhAnio: "Потрошувачка на година (kWh)",
    costoDia: "Трошок на ден",
    costoMes: "Трошок на месец",
    costoAnio: "Трошок на година",
    errorHoras: "Денот има 24 часа: работата мора да биде меѓу 0 и 24 часа.",
  }),
};
