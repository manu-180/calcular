import { pluralSk } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiAlquilarOComprar } from "../definicion";

const roky = (n: string) => pluralSk(n, "rok", "roky", "rokov", "roka");

export const textosSk: TextosUi<UiAlquilarOComprar> = {
  slug: "najom-alebo-kupa-bytu",
  ui: () => ({
    precio: "Cena bytu",
    entrada: "Vlastné zdroje (% z ceny)",
    gastosCompra: "Náklady na kúpu (% z ceny)",
    gastosCompraAyuda: "Odhad nehnuteľnosti, poplatky za úver, notár alebo advokát, zápis do katastra a provízia realitnej kancelárie.",
    tasa: "Úroková sadzba hypotéky (% ročne)",
    aniosHipoteca: "Doba splácania hypotéky (roky)",
    alquiler: "Mesačný nájom podobného bytu",
    aumentoAlquiler: "Ročné zvýšenie nájmu (%)",
    gastosPropietario: "Ročné náklady vlastníka (% z ceny)",
    gastosPropietarioAyuda: "Opravy a údržba, daň z nehnuteľností, poistenie nehnuteľnosti. Zvyčajne 1 až 2 %.",
    revalorizacion: "Ročný rast ceny bytu (%)",
    rendimiento: "Výnos alternatívnej investície (% ročne)",
    rendimientoAyuda: "Koľko by ste zarobili, keby ste vlastné zdroje investovali namiesto kúpy.",
    horizonte: "O koľko rokov porovnať",
    veredicto: "Výsledok",
    patrimonioComprar: "Váš majetok na konci, ak kúpite",
    patrimonioAlquilar: "Váš majetok na konci, ak budete v nájme",
    diferencia: "Rozdiel",
    anioDesde: "Rok, od ktorého sa kúpa oplatí viac",
    pagadoAlquilando: "Spolu zaplatené na nájme",
    pagadoComprando: "Spolu zaplatené na hypotéke a údržbe",
    tabla: "Porovnanie po rokoch",
    colAnio: "Rok",
    colComprar: "Kúpa",
    colAlquilar: "Nájom",
    colDiferencia: "Rozdiel",
    errorPrecio: "Zadajte cenu bytu.",
    errorAlquiler: "Zadajte, koľko by stál nájom podobného bytu.",
    convieneComprar: (anios, diferencia) => `Viac sa oplatí kúpa: o ${roky(anios)} budete mať o ${diferencia} viac.`,
    convieneAlquilar: (anios, diferencia) => `Viac sa oplatí nájom: o ${roky(anios)} budete mať o ${diferencia} viac.`,
    empate: (anios) => `O ${roky(anios)} vyjdú obe možnosti rovnako.`,
    observacionDesde: (anio) => `Kúpa predbehne nájom od ${anio}. roka a potom už zostáva výhodnejšia.`,
    observacionMetodo:
      "Porovnáva sa, čo budete mať v každej z možností. Keď bývate v nájme, vlastné zdroje a to, čo každý mesiac ušetríte, zostávajú investované. Náklady na neskorší predaj bytu sa neodpočítavajú.",
  }),
};
