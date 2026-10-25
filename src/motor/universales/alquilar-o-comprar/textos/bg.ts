import { formaBg } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiAlquilarOComprar } from "../definicion";

// «anios» llega ya formateado: se lee de vuelta para elegir «година» o «години».
const anios = (n: string) => `${n} ${formaBg(Number(n.replace(/\s/g, "").replace(",", ".")), "година", "години")}`;

export const textosBg: TextosUi<UiAlquilarOComprar> = {
  slug: "naem-ili-pokupka-na-zhilishte",
  ui: () => ({
    precio: "Цена на жилището",
    entrada: "Самоучастие (% от цената)",
    gastosCompra: "Разходи по покупката (% от цената)",
    gastosCompraAyuda: "Нотариални такси, местен данък при придобиване, вписване, оценка и комисионна на агенцията.",
    tasa: "Лихва по ипотечния кредит (% годишно)",
    aniosHipoteca: "Срок на ипотечния кредит в години",
    alquiler: "Месечен наем за подобно жилище",
    aumentoAlquiler: "Годишно увеличение на наема (%)",
    gastosPropietario: "Годишни разходи на собственика (% от стойността)",
    gastosPropietarioAyuda: "Поддръжка, данък върху недвижимите имоти и застраховка. Обикновено 1% до 2%.",
    revalorizacion: "Годишен ръст на цената на жилището (%)",
    rendimiento: "Доходност на алтернативна инвестиция (% годишно)",
    rendimientoAyuda: "Колко бихте спечелили, ако инвестирате самоучастието, вместо да купувате.",
    horizonte: "За колко години да се сравни",
    veredicto: "Резултат",
    patrimonioComprar: "Нетно имущество в края, ако купите",
    patrimonioAlquilar: "Нетно имущество в края, ако наемате",
    diferencia: "Разлика",
    anioDesde: "Година, от която покупката става по-изгодна",
    pagadoAlquilando: "Общо платен наем",
    pagadoComprando: "Общо вноски по кредита и разходи на собственика",
    tabla: "Сравнение година по година",
    colAnio: "Година",
    colComprar: "Покупка",
    colAlquilar: "Наем",
    colDiferencia: "Разлика",
    errorPrecio: "Въведете цената на жилището.",
    errorAlquiler: "Въведете колко би струвал наемът на подобно жилище.",
    convieneComprar: (n, diferencia) => `По-изгодно е да купите: след ${anios(n)} ще имате с ${diferencia} повече.`,
    convieneAlquilar: (n, diferencia) => `По-изгодно е да наемате: след ${anios(n)} ще имате с ${diferencia} повече.`,
    empate: (n) => `След ${anios(n)} двата варианта излизат еднакво.`,
    observacionDesde: (anio) => `Покупката изпреварва наема в година ${anio} и остава напред.`,
    observacionMetodo:
      "Сравнява се какво притежавате във всеки от двата случая. Ако наемате, самоучастието и това, което спестявате всеки месец, остават инвестирани. Разходите по продажбата не се изваждат.",
  }),
};
