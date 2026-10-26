import type { TextosUi } from "../../tipos";
import type { UiConversorSueldo } from "../definicion";

export const textosId: TextosUi<UiConversorSueldo> = {
  slug: "kalkulator-gaji-per-jam",
  ui: () => ({
    monto: "Gaji",
    periodo: "Gaji dihitung per",
    hora: "Jam",
    dia: "Hari",
    semana: "Minggu",
    quincena: "Setengah bulan (24 kali setahun)",
    mes: "Bulan",
    anio: "Tahun",
    horasSemana: "Jam kerja per minggu",
    diasSemana: "Hari kerja per minggu",
    semanasAnio: "Minggu yang dibayar per tahun",
    semanasAnioAyuda: "52 jika cuti Anda tetap dibayar. Jika hanya dibayar untuk minggu Anda bekerja, kurangi minggu lainnya.",
    porHora: "Per jam",
    porDia: "Per hari",
    porSemana: "Per minggu",
    porQuincena: "Per setengah bulan",
    porMes: "Per bulan",
    porAnio: "Per tahun",
    errorHoras: "Masukkan jumlah jam kerja Anda per minggu.",
    errorSemanas: "Minggu yang dibayar per tahun harus lebih dari nol.",
    observacionBruto: "Ini jumlah yang sama untuk periode lain. Bonus dan THR tidak ditambahkan, dan pajak tidak dipotong.",
  }),
};
