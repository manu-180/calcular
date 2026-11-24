import { formaMk } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiAlquilarOComprar } from "../definicion";

// «anios» llega ya formateado: se lee de vuelta para elegir «година» o «години».
const anios = (n: string) => `${n} ${formaMk(Number(n.replace(/\s/g, "").replace(",", ".")), "година", "години")}`;

export const textosMk: TextosUi<UiAlquilarOComprar> = {
  slug: "kirija-ili-kupuvanje-na-stan",
  ui: () => ({
    precio: "Цена на станот",
    entrada: "Сопствено учество (% од цената)",
    gastosCompra: "Трошоци за купување (% од цената)",
    gastosCompraAyuda: "Нотарски трошоци, данок на промет на недвижности, упис во катастар, проценка и провизија за агенција.",
    tasa: "Каматна стапка на станбениот кредит (% годишно)",
    aniosHipoteca: "Рок на станбениот кредит во години",
    alquiler: "Месечна кирија за сличен стан",
    aumentoAlquiler: "Годишно зголемување на киријата (%)",
    gastosPropietario: "Годишни трошоци на сопственикот (% од вредноста)",
    gastosPropietarioAyuda: "Одржување, данок на имот и осигурување. Обично 1 % до 2 %.",
    revalorizacion: "Годишен раст на цената на станот (%)",
    rendimiento: "Принос од алтернативна инвестиција (% годишно)",
    rendimientoAyuda: "Колку би заработиле ако го инвестирате сопственото учество наместо да купувате.",
    horizonte: "За колку години да се спореди",
    veredicto: "Резултат",
    patrimonioComprar: "Нето богатство на крајот ако купите",
    patrimonioAlquilar: "Нето богатство на крајот ако плаќате кирија",
    diferencia: "Разлика",
    anioDesde: "Од кога купувањето станува поисплатливо",
    pagadoAlquilando: "Вкупно платена кирија",
    pagadoComprando: "Вкупно рати за кредитот и трошоци на сопственикот",
    tabla: "Споредба година по година",
    colAnio: "Година",
    colComprar: "Купување",
    colAlquilar: "Кирија",
    colDiferencia: "Разлика",
    errorPrecio: "Внесете ја цената на станот.",
    errorAlquiler: "Внесете колку би чинела кирија за сличен стан.",
    convieneComprar: (n, diferencia) => `Поисплатливо е да купите: по ${anios(n)} ќе имате ${diferencia} повеќе.`,
    convieneAlquilar: (n, diferencia) => `Поисплатливо е да плаќате кирија: по ${anios(n)} ќе имате ${diferencia} повеќе.`,
    empate: (n) => `По ${anios(n)} двете можности излегуваат исто.`,
    observacionDesde: (anio) => `Купувањето ја престигнува киријата во година ${anio} и останува напред.`,
    observacionMetodo:
      "Се споредува што поседувате во секој од двата случаи. Ако плаќате кирија, сопственото учество и она што го заштедувате секој месец остануваат инвестирани. Трошоците за продажба не се одземаат.",
  }),
};
