import type { TextosUi } from "../../tipos";
import type { UiHorasTrabajadas } from "../definicion";

export const textosId: TextosUi<UiHorasTrabajadas> = {
  slug: "kalkulator-jam-kerja",
  ui: () => ({
    dias: ["Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu", "Minggu"],
    entrada: (dia) => `${dia}: jam masuk`,
    salida: (dia) => `${dia}: jam pulang`,
    horarioAyuda: "Kosongkan hari Anda tidak bekerja. Jika pulang lewat tengah malam, tetap dihitung satu shift.",
    pausa: "Istirahat tidak dibayar per hari (menit)",
    pausaAyuda: "Waktu makan siang atau istirahat yang tidak dibayar. Dikurangi dari setiap hari kerja.",
    pagoHora: "Upah per jam",
    umbral: "Jam kerja normal per minggu (opsional)",
    umbralAyuda: "Jam di atas angka ini dibayar dengan tarif lembur. Kosongkan jika tidak ada lembur.",
    recargo: "Tambahan upah lembur (%)",
    recargoAyuda: "Berapa persen lebih tinggi upah setiap jam lembur. 50% berarti 1,5 kali upah per jam.",
    horasTotales: "Jam kerja",
    horasReloj: "Dalam jam dan menit",
    horasNormales: "Jam normal",
    horasExtra: "Jam lembur",
    pagoNormal: "Upah jam normal",
    pagoExtra: "Upah lembur",
    pagoTotal: "Total upah minggu ini",
    tabla: "Rincian per hari",
    colDia: "Hari",
    colEntrada: "Masuk",
    colSalida: "Pulang",
    colHoras: "Jam",
    errorFaltaSalida: (dia) => `Jam pulang hari ${dia} belum diisi.`,
    errorFaltaEntrada: (dia) => `Jam masuk hari ${dia} belum diisi.`,
    errorIguales: (dia) => `Jam masuk dan jam pulang hari ${dia} sama.`,
    errorPausa: (dia) => `Waktu istirahat sama dengan atau lebih lama dari shift hari ${dia}.`,
    errorSinDias: "Isi jam masuk dan jam pulang untuk minimal satu hari.",
    observacionNoche: "Ada shift yang selesai keesokan harinya: seluruh jamnya dihitung pada hari shift dimulai.",
    observacionGenerico:
      "Ini perhitungan umum. Batas jam kerja, aturan lembur, dan upah kerja malam atau hari libur bergantung pada peraturan dan kontrak kerja Anda.",
  }),
};
