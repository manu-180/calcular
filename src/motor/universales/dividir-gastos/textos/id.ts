import type { TextosUi } from "../../tipos";
import type { UiDividirGastos } from "../definicion";

export const textosId: TextosUi<UiDividirGastos> = {
  slug: "kalkulator-patungan",
  ui: () => ({
    persona: (n) => `Orang ${n}`,
    personaAyuda: "Isi jumlah yang dibayar tiap orang. Jika ada yang belum membayar tetapi ikut menanggung biaya, isi 0. Kosongkan sisanya.",
    total: "Total pengeluaran",
    personas: "Jumlah orang",
    cuota: "Bagian tiap orang",
    transferencias: "Transfer untuk melunasi",
    tabla: "Siapa membayar ke siapa",
    colDe: "Membayar",
    colPara: "Menerima",
    colMonto: "Jumlah",
    errorPocas: "Minimal dua orang untuk membagi biaya.",
    aMano: "Semua sudah impas: setiap orang membayar jumlah yang sama.",
  }),
};
