import type { TextosUi } from "../../tipos";
import type { UiPuntoDeEquilibrio } from "../definicion";

export const textosTr: TextosUi<UiPuntoDeEquilibrio> = {
  slug: "basabas-noktasi-hesaplama",
  ui: () => ({
    fijos: "Aylık sabit giderler",
    fijosAyuda: "Hiç satış yapmasanız da ödediğiniz giderler: kira, sabit maaşlar, faturalar, yazılım.",
    precio: "Birim satış fiyatı",
    variable: "Birim değişken maliyet",
    variableAyuda: "Satılan her birimin size maliyeti: hammadde, ürün alışı, komisyon, kargo.",
    objetivo: "Aylık hedef kâr (isteğe bağlı)",
    objetivoAyuda: "Giderleri karşılamanın üzerine ne kadar satmanız gerektiğini görmek için.",
    unidades: "Başabaş için satılması gereken adet",
    facturacion: "Başabaş için gereken ciro",
    contribucion: "Birim katkı payı",
    contribucionAyuda: "Her satışın sabit giderleri karşılamak için bıraktığı tutar: fiyat eksi değişken maliyet.",
    contribucionPct: "Katkı payı oranı (%)",
    unidadesObjetivo: "Hedef kâr için gereken adet",
    facturacionObjetivo: "Hedef kâr için gereken ciro",
    errorPrecio: "Bir birimin satış fiyatını girin.",
    errorMargen: "Değişken maliyet fiyata eşit ya da fiyattan yüksek: her satışta para kaybedersiniz ve başabaşa hiç ulaşamazsınız. Fiyatı ya da maliyeti kontrol edin.",
    observacionRedondeo: "Adet yukarı yuvarlanır, çünkü bir birimin bir kısmı satılamaz.",
  }),
};
