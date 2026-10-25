import type { TextosUi } from "../../tipos";
import type { UiHipoteca } from "../definicion";

export const textosId: TextosUi<UiHipoteca> = {
  slug: "kalkulator-kpr",
  ui: () => ({
    precio: "Harga rumah",
    entradaPorcentaje: "Uang muka (% dari harga)",
    entradaMonto: "Jumlah uang muka (opsional)",
    entradaMontoAyuda: "Jika diisi, angka ini dipakai sebagai pengganti persentase.",
    tasa: "Bunga KPR per tahun (%)",
    anios: "Tenor (tahun)",
    gastos: "Biaya rumah per bulan (opsional)",
    gastosAyuda: "PBB, asuransi rumah, atau iuran pengelolaan lingkungan yang Anda bayar bersama cicilan.",
    cuota: "Cicilan KPR per bulan",
    cuotaTotal: "Cicilan per bulan dengan biaya rumah",
    entrada: "Uang muka (DP)",
    prestado: "Plafon KPR",
    intereses: "Total bunga",
    total: "Total cicilan KPR",
    tabla: "Per tahun",
    colAnio: "Tahun",
    colIntereses: "Bunga dibayar",
    colCapital: "Pokok dibayar",
    colSaldo: "Sisa pinjaman akhir tahun",
    errorPrecio: "Masukkan harga rumah.",
    errorEntrada: "Uang muka sudah menutup seluruh harga rumah, jadi tidak ada KPR yang perlu dihitung. Kurangi uang mukanya.",
    observacionPrestado: (porcentaje) => `Anda meminjam ${porcentaje}% dari harga rumah. Makin besar porsinya, biasanya makin ketat syarat dari bank.`,
    observacionCostos: "Biaya akad, notaris, pajak pembelian, appraisal, dan provisi belum termasuk. Siapkan dana untuk biaya ini di luar uang muka.",
  }),
};
