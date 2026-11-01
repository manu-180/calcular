import type { TextosUi } from "../../tipos";
import type { UiPorcentaje } from "../definicion";

export const textosId: TextosUi<UiPorcentaje> = {
  slug: "kalkulator-persen",
  ui: () => ({
    modo: "Apa yang ingin Anda hitung?",
    modoParte: "Berapa X% dari Y?",
    modoProporcion: "X itu berapa persen dari Y?",
    modoAumento: "Y ditambah X%",
    modoRebaja: "Y dikurangi X%",
    x: "Angka X",
    xAyuda: "Persentasenya. Jika Anda memilih “X itu berapa persen dari Y?”, isi dengan bagiannya.",
    y: "Angka Y",
    resultado: "Hasil",
    porcentaje: "Persentase",
    diferencia: "Jumlah yang ditambah atau dikurangi",
    errorYCero: "Y tidak boleh 0: tidak ada persentase dari nol.",
    fraseParte: (x, y, r) => `${x}% dari ${y} adalah ${r}.`,
    fraseProporcion: (x, y, p) => `${x} adalah ${p}% dari ${y}.`,
    fraseAumento: (x, y, r, d) => `${y} ditambah ${x}% menjadi ${r}: bertambah ${d}.`,
    fraseRebaja: (x, y, r, d) => `${y} dikurangi ${x}% menjadi ${r}: berkurang ${d}.`,
  }),
};
