import type { TextosUi } from "../../tipos";
import type { UiTasaEfectiva } from "../definicion";

export const textosId: TextosUi<UiTasaEfectiva> = {
  slug: "kalkulator-bunga-efektif",
  ui: () => ({
    direccion: "Bunga mana yang Anda punya?",
    nominalAEfectiva: "Bunga nominal (ubah ke bunga efektif tahunan)",
    efectivaANominal: "Bunga efektif tahunan (ubah ke bunga nominal)",
    tasa: "Bunga per tahun (%)",
    tasaAyuda: "Masukkan persis seperti yang tertulis di penawaran atau perjanjian.",
    capitalizacion: "Periode bunga majemuk",
    capitalizacionAyuda: "Seberapa sering bunga ditambahkan ke saldo. Pinjaman dan kartu kredit biasanya bulanan.",
    mensual: "Bulanan (12 kali setahun)",
    trimestral: "Triwulanan (4 kali setahun)",
    semestral: "Semesteran (2 kali setahun)",
    diaria: "Harian (365 kali setahun)",
    efectiva: "Bunga efektif tahunan",
    nominal: "Bunga nominal tahunan",
    periodica: "Bunga per periode",
    errorNegativa: "Bunga tidak boleh negatif. Masukkan angka mulai dari 0.",
    observacionDiferencia: (puntos) => `Bunga efektif ${puntos} poin lebih tinggi dari bunga nominal karena bunga juga menghasilkan bunga.`,
  }),
};
