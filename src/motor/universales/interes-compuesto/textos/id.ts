import type { TextosUi } from "../../tipos";
import type { UiInteresCompuesto } from "../definicion";

export const textosId: TextosUi<UiInteresCompuesto> = {
  slug: "kalkulator-bunga-majemuk",
  ui: () => ({
    capital: "Dana awal",
    aporte: "Setoran per bulan (opsional)",
    aporteAyuda: "Jumlah yang Anda tambahkan setiap bulan. Dihitung masuk di akhir bulan.",
    tasa: "Bunga per tahun (%)",
    anios: "Jangka waktu (tahun)",
    capitalizacion: "Periode bunga majemuk",
    anual: "Tahunan",
    semestral: "Semesteran",
    trimestral: "Triwulanan",
    mensual: "Bulanan",
    diaria: "Harian",
    saldo: "Saldo akhir",
    aportado: "Total setoran",
    intereses: "Bunga yang diperoleh",
    tabla: "Pertumbuhan per tahun",
    colAnio: "Tahun",
    colAportado: "Setoran",
    colIntereses: "Bunga",
    colSaldo: "Saldo akhir tahun",
    errorSinDinero: "Masukkan dana awal atau setoran per bulan.",
    observacionIntereses: (porcentaje) => `Sebanyak ${porcentaje}% dari saldo akhir berasal dari bunga.`,
  }),
};
