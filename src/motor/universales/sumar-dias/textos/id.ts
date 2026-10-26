import type { TextosUi } from "../../tipos";
import type { UiSumarDias } from "../definicion";

export const textosId: TextosUi<UiSumarDias> = {
  slug: "tambah-hari-ke-tanggal",
  ui: () => ({
    fecha: "Tanggal mulai",
    operacion: "Operasi",
    sumar: "Tambah hari",
    restar: "Kurangi hari",
    dias: "Jumlah hari",
    tipo: "Jenis hari",
    corridos: "Hari kalender",
    habiles: "Hari kerja (Senin sampai Jumat)",
    resultado: "Tanggal hasil",
    diaSemana: "Hari",
    diasCorridos: "Total hari kalender",
    nombresDias: ["Minggu", "Senin", "Selasa", "Rabu", "Kamis", "Jumat", "Sabtu"],
    errorDias: "Jumlah hari harus bilangan bulat, paling banyak 100 tahun.",
    notaHabiles: "Hari kerja melewati Sabtu dan Minggu, tetapi tidak melewati hari libur nasional. Jika ada hari libur di antaranya, tambahkan secara terpisah.",
  }),
};
