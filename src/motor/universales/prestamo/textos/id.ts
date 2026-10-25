import type { TextosUi } from "../../tipos";
import type { UiPrestamo } from "../definicion";

export const textosId: TextosUi<UiPrestamo> = {
  slug: "kalkulator-pinjaman",
  ui: () => ({
    monto: "Jumlah pinjaman",
    tasa: "Bunga per tahun (%)",
    tasaAyuda: "Bunga efektif tahunan yang tertulis di penawaran. Biaya provisi dan administrasi tidak termasuk.",
    meses: "Tenor (bulan)",
    extra: "Bayar lebih per bulan (opsional)",
    extraAyuda: "Tambahan yang Anda bayar setiap bulan agar lunas lebih cepat. Seluruhnya mengurangi pokok pinjaman.",
    cuota: "Cicilan per bulan",
    intereses: "Total bunga",
    total: "Total yang dibayar",
    mesesReales: "Bulan sampai lunas dengan pembayaran tambahan",
    ahorro: "Bunga yang Anda hemat",
    tabla: "Tabel angsuran",
    colMes: "Bulan",
    colPago: "Cicilan",
    colInteres: "Bunga",
    colCapital: "Pokok",
    colSaldo: "Sisa pinjaman",
    errorMonto: "Masukkan jumlah pinjaman lebih dari nol.",
    observacionCostos:
      "Cicilan ini belum termasuk asuransi, provisi, biaya administrasi, atau pajak yang bisa ditambahkan pemberi pinjaman. Tanyakan total biayanya sebelum tanda tangan.",
    observacionExtra: (meses, ahorro) => `Dengan pembayaran tambahan, pinjaman lunas dalam ${meses} bulan dan Anda menghemat bunga sebesar ${ahorro}.`,
  }),
};
