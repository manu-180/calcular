import type { TextosUi } from "../../tipos";
import type { UiInteresSimple } from "../definicion";

export const textosId: TextosUi<UiInteresSimple> = {
  slug: "kalkulator-bunga-tunggal",
  ui: () => ({
    capital: "Modal awal",
    tasa: "Bunga per tahun (%)",
    tiempo: "Jangka waktu",
    unidad: "Satuan waktu",
    dias: "Hari",
    meses: "Bulan",
    anios: "Tahun",
    base: "Jumlah hari dalam setahun (untuk jangka waktu harian)",
    baseAyuda: "Sebagian bank menghitung setahun 360 hari. Jika tidak yakin, biarkan 365.",
    base365: "365 hari",
    base360: "360 hari (tahun bank)",
    interes: "Bunga",
    montoFinal: "Modal ditambah bunga",
    tasaPeriodo: "Bunga untuk jangka waktu ini",
    errorCapital: "Masukkan modal awal lebih dari nol.",
  }),
};
