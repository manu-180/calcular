import type { TextosUi } from "../../tipos";
import type { UiMargenDeGanancia } from "../definicion";

export const textosTr: TextosUi<UiMargenDeGanancia> = {
  slug: "kar-marji-hesaplama",
  ui: () => ({
    modo: "Neyi hesaplamak istiyorsunuz?",
    modoPrecio: "Maliyet ve fiyattan kâr marjını",
    modoMargen: "Hedef kâr marjı için satış fiyatını",
    modoMarkup: "Hedef kâr oranı (maliyet üzerinden) için satış fiyatını",
    costo: "Birim maliyet",
    costoAyuda: "Bir birimi almanın ya da üretmenin maliyeti; müşteriye yansıtılan KDV hariç.",
    precio: "Satış fiyatı",
    precioAyuda: "Yalnızca kâr marjını hesaplıyorsanız. KDV hariç.",
    objetivo: "Hedef kâr marjı ya da kâr oranı (%)",
    objetivoAyuda: "Yalnızca satış fiyatını hesaplıyorsanız.",
    precioResultado: "Satış fiyatı",
    margen: "Kâr marjı",
    margenAyuda: "Kârın satış fiyatına oranı, yüzde olarak.",
    markup: "Maliyet üzerinden kâr oranı",
    markupAyuda: "Kârın maliyete oranı, yüzde olarak.",
    ganancia: "Birim başına kâr",
    errorCosto: "Bir birimin maliyetini girin.",
    errorFaltaPrecio: "Kâr marjını hesaplamak için satış fiyatını girin.",
    errorFaltaObjetivo: "Hedeflediğiniz kâr marjını ya da kâr oranını girin.",
    errorMargen100: "Kâr marjı %100'ün altında olmalıdır: aksi hâlde fiyatın tamamı maliyetsiz kâr demektir.",
    observacionPerdida: "Bu fiyatla maliyetin altında satıyorsunuz: her satışta para kaybedersiniz.",
  }),
};
