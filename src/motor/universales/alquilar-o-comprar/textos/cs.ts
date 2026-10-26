import { pluralCs } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiAlquilarOComprar } from "../definicion";

const roky = (n: string) => pluralCs(n, "rok", "roky", "let", "roku");

export const textosCs: TextosUi<UiAlquilarOComprar> = {
  slug: "najem-nebo-koupe-bytu",
  ui: () => ({
    precio: "Cena bytu",
    entrada: "Vlastní zdroje (% z ceny)",
    gastosCompra: "Náklady na koupi (% z ceny)",
    gastosCompraAyuda: "Odhad nemovitosti, poplatky za úvěr, notář nebo advokát, zápis do katastru a provize realitní kanceláře.",
    tasa: "Úroková sazba hypotéky (% ročně)",
    aniosHipoteca: "Doba splácení hypotéky (roky)",
    alquiler: "Měsíční nájem podobného bytu",
    aumentoAlquiler: "Roční zvýšení nájmu (%)",
    gastosPropietario: "Roční náklady vlastníka (% z ceny)",
    gastosPropietarioAyuda: "Opravy a údržba, daň z nemovitých věcí, pojištění nemovitosti. Obvykle 1 až 2 %.",
    revalorizacion: "Roční růst ceny bytu (%)",
    rendimiento: "Výnos alternativní investice (% ročně)",
    rendimientoAyuda: "Kolik byste vydělali, kdybyste vlastní zdroje investovali místo koupě.",
    horizonte: "Za kolik let porovnat",
    veredicto: "Výsledek",
    patrimonioComprar: "Váš majetek na konci, pokud koupíte",
    patrimonioAlquilar: "Váš majetek na konci, pokud budete v nájmu",
    diferencia: "Rozdíl",
    anioDesde: "Rok, od kterého se koupě vyplatí víc",
    pagadoAlquilando: "Celkem zaplaceno na nájmu",
    pagadoComprando: "Celkem zaplaceno na hypotéce a údržbě",
    tabla: "Porovnání po letech",
    colAnio: "Rok",
    colComprar: "Koupě",
    colAlquilar: "Nájem",
    colDiferencia: "Rozdíl",
    errorPrecio: "Zadejte cenu bytu.",
    errorAlquiler: "Zadejte, kolik by stál nájem podobného bytu.",
    convieneComprar: (anios, diferencia) => `Víc se vyplatí koupě: za ${roky(anios)} budete mít o ${diferencia} víc.`,
    convieneAlquilar: (anios, diferencia) => `Víc se vyplatí nájem: za ${roky(anios)} budete mít o ${diferencia} víc.`,
    empate: (anios) => `Za ${roky(anios)} vyjdou obě možnosti nastejno.`,
    observacionDesde: (anio) => `Koupě předstihne nájem od ${anio}. roku a pak už zůstává výhodnější.`,
    observacionMetodo:
      "Porovnává se, co budete mít v každé z možností. Když bydlíte v nájmu, vlastní zdroje a to, co každý měsíc ušetříte, zůstávají investované. Náklady na pozdější prodej bytu se neodečítají.",
  }),
};
