import type { TextosUi } from "../../tipos";
import type { UiAhorroRetiro } from "../definicion";

export const textosId: TextosUi<UiAhorroRetiro> = {
  slug: "kalkulator-dana-pensiun",
  ui: () => ({
    edadActual: "Usia Anda sekarang",
    edadRetiro: "Usia pensiun yang Anda inginkan",
    actual: "Dana yang sudah terkumpul",
    aporte: "Setoran per bulan",
    rendimiento: "Imbal hasil riil per tahun (%)",
    rendimientoAyuda: "Hasil investasi di atas inflasi. Untuk jangka panjang, 2% sampai 5% adalah asumsi yang hati-hati.",
    aniosRenta: "Lama masa pensiun yang ingin dibiayai (tahun)",
    aniosRentaAyuda: "Berapa tahun Anda ingin memakai dana ini setelah pensiun.",
    capital: "Dana saat pensiun",
    renta: "Penghasilan per bulan dari dana itu",
    aportado: "Total setoran",
    intereses: "Total pertumbuhan",
    tabla: "Pertumbuhan menurut usia",
    colEdad: "Usia",
    colAportado: "Setoran sampai saat itu",
    colSaldo: "Dana",
    errorEdades: "Usia pensiun harus lebih tinggi dari usia Anda sekarang.",
    errorSinAhorro: "Masukkan dana yang sudah ada atau setoran per bulan.",
    observacionDineroDeHoy: "Semua angka dalam nilai uang hari ini, karena imbal hasilnya sudah dikurangi inflasi.",
    observacionPublica: "Ini hanya dana pensiun pribadi Anda. Jaminan pensiun dari program pemerintah atau dari tempat kerja tidak termasuk.",
  }),
};
