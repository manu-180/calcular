import type { TextosUi } from "../../tipos";
import type { UiRendimientoInversion } from "../definicion";

export const textosId: TextosUi<UiRendimientoInversion> = {
  slug: "kalkulator-roi",
  ui: () => ({
    inicial: "Modal yang diinvestasikan",
    final: "Nilai akhir",
    finalAyuda: "Nilai investasi saat ini, atau uang yang Anda terima saat menjualnya.",
    cobrado: "Hasil yang diterima selama investasi (opsional)",
    cobradoAyuda: "Dividen, bunga, atau sewa yang Anda terima dan tidak diinvestasikan kembali.",
    anios: "Lama investasi (tahun)",
    aniosAyuda: "Boleh pakai desimal untuk sebagian tahun, misalnya satu setengah tahun.",
    ganancia: "Keuntungan",
    roi: "Imbal hasil total (ROI)",
    cagr: "Imbal hasil per tahun (CAGR)",
    cagrAyuda: "Imbal hasil tahunan yang memberi hasil sama jika dimajemukkan dari tahun ke tahun.",
    errorInicial: "Masukkan modal awal yang Anda investasikan.",
    observacionCorto:
      "Untuk jangka di bawah satu tahun, imbal hasil tahunan menganggap hasil singkat itu terulang sepanjang tahun. Baca dengan hati-hati.",
    observacionInflacion: "Untuk melihat apakah daya beli Anda bertambah, bandingkan imbal hasil per tahun dengan inflasi pada periode yang sama.",
  }),
};
