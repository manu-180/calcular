import { formaSq } from "../../../i18n/plural";
import type { TextosUi } from "../../tipos";
import type { UiAlquilarOComprar } from "../definicion";

export const textosSq: TextosUi<UiAlquilarOComprar> = {
  slug: "qira-apo-blerje-shtepie",
  ui: () => ({
    precio: "Çmimi i shtëpisë",
    entrada: "Parapagimi (% e çmimit)",
    gastosCompra: "Kostot e blerjes (% e çmimit)",
    gastosCompraAyuda: "Noteri, taksat e kalimit të pronësisë, vlerësimi dhe komisioni i agjencisë.",
    tasa: "Norma e interesit të kredisë për shtëpi (% në vit)",
    aniosHipoteca: "Afati i kredisë në vite",
    alquiler: "Qiraja mujore për një shtëpi të ngjashme",
    aumentoAlquiler: "Rritja vjetore e qirasë (%)",
    gastosPropietario: "Kostot e pronarit në vit (% e vlerës)",
    gastosPropietarioAyuda: "Mirëmbajtja, taksa e pronës dhe sigurimi i shtëpisë. Zakonisht midis 1% dhe 2%.",
    revalorizacion: "Rritja vjetore e çmimit të shtëpisë (%)",
    rendimiento: "Kthimi i një investimi alternativ (% në vit)",
    rendimientoAyuda: "Sa do të fitonit nëse do ta investonit parapagimin në vend që të blinit.",
    horizonte: "Numri i viteve për krahasim",
    veredicto: "Rezultati",
    patrimonioComprar: "Pasuria neto në fund nëse blini",
    patrimonioAlquilar: "Pasuria neto në fund nëse qëndroni me qira",
    diferencia: "Diferenca",
    anioDesde: "Viti nga i cili blerja del më mirë",
    pagadoAlquilando: "Totali i qirasë së paguar",
    pagadoComprando: "Totali i kësteve dhe i kostove të pronarit",
    tabla: "Krahasim vit pas viti",
    colAnio: "Viti",
    colComprar: "Blerje",
    colAlquilar: "Qira",
    colDiferencia: "Diferenca",
    errorPrecio: "Vendosni çmimin e shtëpisë.",
    errorAlquiler: "Vendosni sa do të kushtonte qiraja e një shtëpie të ngjashme.",
    convieneComprar: (anios, diferencia) => `Blerja del më mirë: pas ${anios} ${formaVit(anios)} do të kishit ${diferencia} më shumë.`,
    convieneAlquilar: (anios, diferencia) => `Qiraja del më mirë: pas ${anios} ${formaVit(anios)} do të kishit ${diferencia} më shumë.`,
    empate: (anios) => `Pas ${anios} ${formaVit(anios)} të dyja mundësitë dalin njësoj.`,
    observacionDesde: (anio) => `Blerja kalon përpara qirasë në vitin ${anio} dhe mbetet përpara.`,
    observacionMetodo:
      "Krahasohet ajo që do të kishit në secilin rast. Nëse qëndroni me qira, parapagimi dhe ajo që kurseni çdo muaj mbeten të investuara. Kostot e shitjes nuk zbriten.",
  }),
};

function formaVit(anios: string): string {
  return formaSq(anios, "vit", "vjet");
}
