import type { TextosUi } from "../../tipos";
import type { UiPromedio } from "../definicion";

export const textosId: TextosUi<UiPromedio> = {
  slug: "kalkulator-rata-rata-tertimbang",
  ui: () => ({
    nota: (n) => `Nilai ${n}`,
    notaAyuda: "Isi setiap nilai beserta bobotnya. Kosongkan baris yang tidak dipakai.",
    peso: (n) => `Bobot ${n}`,
    pesoAyuda: "Bisa berupa persentase, SKS, atau berapa kali nilai itu dihitung. Tanpa bobot, semua nilai dihitung sama.",
    ponderado: "Rata-rata tertimbang",
    simple: "Rata-rata biasa",
    cantidad: "Jumlah nilai",
    sumaPesos: "Total bobot",
    errorSinNotas: "Isi minimal satu nilai.",
    errorFaltaPeso: "Nilai ini belum punya bobot. Jika memakai bobot, isi bobot untuk setiap nilai.",
    errorFaltaNota: "Bobot ini belum punya nilai. Isi nilainya atau hapus bobotnya.",
    errorPesosCero: "Total bobot 0: minimal satu bobot harus lebih dari nol.",
    sinPesos: "Tanpa bobot, rata-rata tertimbang sama dengan rata-rata biasa.",
  }),
};
