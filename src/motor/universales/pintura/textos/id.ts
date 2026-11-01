import type { TextosUi } from "../../tipos";
import type { UiPintura } from "../definicion";

const volumen = (u: string) => (u === "L" ? "liter" : "galon AS");

export const textosId: TextosUi<UiPintura> = {
  slug: "kalkulator-cat-tembok",
  ui: () => ({
    modo: "Ukuran apa yang Anda punya?",
    modoMedidas: "Panjang dan tinggi dinding",
    modoSuperficie: "Luas totalnya",
    largo: (u) => `Panjang total dinding (${u})`,
    largoAyuda: "Jumlahkan semua dinding yang akan dicat. Untuk satu ruangan, pakai kelilingnya.",
    alto: (u) => `Tinggi dinding (${u})`,
    superficie: (u) => `Luas yang akan dicat (${u})`,
    aberturas: (u) => `Pintu dan jendela yang tidak dicat (${u})`,
    aberturasAyuda: "Satu pintu sekitar 2 m² (21 ft²) dan satu jendela biasa sekitar 1 sampai 2 m².",
    manos: "Jumlah lapisan",
    rendimiento: (u) => `Daya sebar cat (${u})`,
    rendimientoAyuda: "Tertera di kaleng cat: luas yang bisa ditutup per lapis. Jika tidak tahu, pakai nilai yang disarankan.",
    recomendado: (u) => `Cat yang perlu dibeli (${volumen(u)})`,
    recomendadoAyuda: "Sudah termasuk cadangan 10% untuk perbaikan dan cat yang tertinggal di roller.",
    necesario: (u) => `Jumlah pas (${volumen(u)})`,
    neta: (u) => `Luas yang dicat (${u})`,
    errorMedidas: "Isi panjang dan tinggi dinding.",
    errorSuperficie: "Isi luas yang akan dicat.",
    errorAberturas: "Pintu dan jendela tidak bisa menutupi seluruh dinding.",
    errorRendimiento: "Daya sebar cat harus lebih dari 0.",
  }),
};
