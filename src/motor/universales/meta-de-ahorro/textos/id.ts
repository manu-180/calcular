import type { TextosUi } from "../../tipos";
import type { UiMetaDeAhorro } from "../definicion";

export const textosId: TextosUi<UiMetaDeAhorro> = {
  slug: "kalkulator-tabungan",
  ui: () => ({
    meta: "Target tabungan Anda",
    actual: "Tabungan yang sudah ada (opsional)",
    meses: "Waktu untuk mencapainya (bulan)",
    rendimiento: "Bunga atau imbal hasil per tahun (%, opsional)",
    rendimientoAyuda: "Jika uangnya disimpan di rekening atau investasi yang memberi bunga. Kosongkan jika tidak ada bunga.",
    aporteMensual: "Yang perlu Anda tabung per bulan",
    aporteSemanal: "Atau per minggu",
    totalAportado: "Total setoran Anda",
    intereses: "Bunga yang diperoleh",
    errorMeta: "Masukkan target tabungan Anda.",
    yaLlegas: "Tabungan Anda yang sekarang sudah cukup untuk mencapai target dalam waktu itu tanpa setoran tambahan.",
  }),
};
