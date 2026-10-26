import type { TextosUi } from "../../tipos";
import type { UiReglaDeTres } from "../definicion";

export const textosId: TextosUi<UiReglaDeTres> = {
  slug: "perbandingan-senilai",
  ui: () => ({
    tipo: "Jenis perbandingan",
    directa: "Senilai (jika A naik, B ikut naik)",
    inversa: "Berbalik nilai (jika A naik, B turun)",
    a: "A",
    aAyuda: "Bacanya: A berbanding B sama dengan C berbanding X. Isi A, B, dan C.",
    b: "B",
    c: "C",
    x: "X",
    errorCero: "Nilai ini tidak boleh 0 karena menjadi pembagi.",
    fraseDirecta: (a, b, c, x) => `Jika ${a} sebanding dengan ${b}, maka ${c} sebanding dengan ${x}. Hitungannya: ${b} × ${c} ÷ ${a}.`,
    fraseInversa: (a, b, c, x) => `Jika ${a} menghasilkan ${b}, maka ${c} menghasilkan ${x}. Hitungannya: ${a} × ${b} ÷ ${c}.`,
  }),
};
