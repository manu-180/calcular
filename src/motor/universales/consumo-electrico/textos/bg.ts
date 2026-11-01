import type { TextosUi } from "../../tipos";
import type { UiConsumoElectrico } from "../definicion";

export const textosBg: TextosUi<UiConsumoElectrico> = {
  slug: "razhod-na-elektroenergia",
  ui: () => ({
    potencia: "Мощност на уреда (W)",
    potenciaAyuda: "Посочена е на етикета или в ръководството, във ватове (W). Ако пише kW, умножете по 1000.",
    cantidad: "Брой еднакви уреди",
    horas: "Часове работа на ден",
    dias: "Дни работа в месеца",
    precio: "Цена на kWh",
    precioAyuda: "Посочена е във фактурата за ток: цената на kWh, с данъците, ако искате пълната сума.",
    kwhDia: "Консумация на ден (kWh)",
    kwhMes: "Консумация на месец (kWh)",
    kwhAnio: "Консумация на година (kWh)",
    costoDia: "Разход на ден",
    costoMes: "Разход на месец",
    costoAnio: "Разход на година",
    errorHoras: "Денят има 24 часа: работата трябва да е между 0 и 24 часа.",
  }),
};
