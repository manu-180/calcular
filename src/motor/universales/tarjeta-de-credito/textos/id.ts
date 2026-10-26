import type { TextosUi } from "../../tipos";
import type { UiTarjetaDeCredito } from "../definicion";

export const textosId: TextosUi<UiTarjetaDeCredito> = {
  slug: "kalkulator-kartu-kredit",
  ui: () => ({
    saldo: "Tagihan kartu kredit",
    tasa: "Bunga per tahun (%)",
    tasaAyuda: "Bunga untuk transaksi belanja, per tahun. Jika lembar tagihan mencantumkan bunga per bulan, kalikan 12.",
    modo: "Bagaimana Anda akan membayar?",
    modoFijo: "Jumlah tetap setiap bulan",
    modoMinimo: "Pembayaran minimum",
    pagoFijo: "Pembayaran tetap per bulan",
    minimoPorcentaje: "Pembayaran minimum (% dari tagihan)",
    minimoPorcentajeAyuda: "Persentase yang diminta penerbit kartu setiap bulan. Lihat di lembar tagihan Anda.",
    minimoPiso: "Pembayaran minimum paling sedikit",
    meses: "Bulan sampai lunas",
    intereses: "Bunga yang Anda bayar",
    total: "Total yang dibayar",
    primerPago: "Pembayaran minimum pertama",
    tabla: "Rencana per bulan",
    colMes: "Bulan",
    colPago: "Pembayaran",
    colInteres: "Bunga",
    colCapital: "Pokok",
    colSaldo: "Sisa tagihan",
    errorSaldo: "Masukkan sisa tagihan kartu kredit Anda.",
    errorFaltaPago: "Masukkan jumlah yang akan Anda bayar setiap bulan.",
    errorNoCubre: (interes) => `Dengan pembayaran itu tagihan tidak pernah berkurang: bunga bulan pertama saja sudah ${interes}. Naikkan pembayarannya.`,
    errorMuyLargo: "Dengan pembayaran itu, pelunasan butuh lebih dari 50 tahun. Naikkan pembayarannya.",
    observacionAnios: (anios, meses) => (meses === "0" ? `Itu sama dengan ${anios} tahun.` : `Itu sama dengan ${anios} tahun ${meses} bulan.`),
    observacionFijo: (pago, meses, ahorro) =>
      `Jika Anda selalu membayar ${pago}, sama dengan pembayaran minimum pertama, tagihan lunas dalam ${meses} bulan dan Anda menghemat bunga ${ahorro}.`,
    observacionNoGastar: "Perhitungan ini menganggap Anda tidak memakai kartu untuk belanja baru selama masa pelunasan.",
  }),
};
