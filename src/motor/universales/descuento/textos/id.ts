import type { TextosUi } from "../../tipos";
import type { UiDescuento } from "../definicion";

export const textosId: TextosUi<UiDescuento> = {
  slug: "kalkulator-diskon",
  ui: () => ({
    precio: "Harga awal",
    descuento: "Diskon (%)",
    segundoDescuento: "Diskon tambahan (%)",
    segundoDescuentoAyuda: "Jika ada diskon lagi di atas diskon pertama, isi di sini.",
    ahorro: "Anda hemat",
    final: "Harga akhir",
    descuentoTotal: "Total diskon",
    errorMayorA100: "Diskon tidak boleh lebih dari 100%.",
    observacionDoble: (efectivo) => `Dua diskon berturut-turut tidak dijumlahkan begitu saja: totalnya memotong harga ${efectivo}%.`,
  }),
};
