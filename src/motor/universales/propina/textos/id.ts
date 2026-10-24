import type { TextosUi } from "../../tipos";
import type { UiPropina } from "../definicion";

export const textosId: TextosUi<UiPropina> = {
  slug: "kalkulator-tip",
  ui: () => ({
    cuenta: "Total tagihan",
    porcentaje: "Tip (%)",
    porcentajeAyuda: "Kebiasaan memberi tip berbeda di tiap negara dan tempat. Pilih yang menurut Anda pantas.",
    personas: "Jumlah orang yang membayar",
    redondear: "Bulatkan bagian tiap orang ke atas",
    redondearAyuda: "Agar setiap orang membayar jumlah yang bulat. Kelebihannya masuk ke tip.",
    propina: "Tip",
    total: "Total dengan tip",
    porPersona: "Bagian tiap orang",
    propinaEfectiva: "Tip setelah dibulatkan",
    errorPersonas: "Minimal harus ada satu orang yang membayar.",
    observacionRedondeo: (efectiva) => `Setelah dibulatkan ke atas, tipnya menjadi ${efectiva}% dari tagihan.`,
  }),
};
