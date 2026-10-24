import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosTr: TextosUi<UiDescuento> = {
  slug: "indirim-hesaplama",
  ui: () => ({
    precio: "Etiket fiyatı",
    descuento: "İndirim (%)",
    segundoDescuento: "Ek indirim (%)",
    segundoDescuentoAyuda: "İndirimin üzerine ayrıca bir indirim daha varsa buraya girin.",
    ahorro: "Tasarrufunuz",
    final: "İndirimli fiyat",
    descuentoTotal: "Toplam indirim",
    errorMayorA100: "İndirim %100'den fazla olamaz.",
    observacionDoble: (efectivo) => `Art arda iki indirim toplanmaz: ikisi birlikte yüzde ${efectivo} indirim yapar.`,
  }),
};
