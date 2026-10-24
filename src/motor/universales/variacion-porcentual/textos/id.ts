import type { TextosUi } from "../../tipos";
import type { UiVariacion } from "../definicion";

export const textosId: TextosUi<UiVariacion> = {
  slug: "kalkulator-persentase-perubahan",
  ui: () => ({
    inicial: "Nilai awal",
    final: "Nilai akhir",
    variacion: "Persentase perubahan",
    diferencia: "Selisih",
    vuelta: "Untuk kembali ke nilai awal",
    vueltaAyuda: "Seberapa besar nilai akhir harus berubah agar kembali ke nilai awal.",
    errorInicialCero: "Nilai awal tidak boleh 0: perubahan persentase tidak bisa dihitung dari nol.",
    subio: (p) => `Naik ${p}%.`,
    bajo: (p) => `Turun ${p}%.`,
    igual: "Tidak ada perubahan: kedua nilai sama.",
  }),
};
