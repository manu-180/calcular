import type { TextosUi } from "../../tipos";
import type { UiTarifaFreelance } from "../definicion";

export const textosId: TextosUi<UiTarifaFreelance> = {
  slug: "tarif-freelance-per-jam",
  ui: () => ({
    ingreso: "Penghasilan bersih yang Anda inginkan per tahun",
    ingresoAyuda: "Setelah pajak dan biaya usaha. Anggap ini gaji Anda sebagai freelancer.",
    gastos: "Biaya usaha per tahun",
    gastosAyuda: "Perangkat, aplikasi, internet, kursus, jasa akuntan, asuransi kesehatan, dan tabungan pensiun.",
    impuestos: "Perkiraan pajak dan iuran (%)",
    impuestosAyuda:
      "Bagian yang dibayar sebagai pajak dari tagihan dikurangi biaya. Jika ragu, tanyakan ke konsultan pajak. 25% bisa menjadi titik awal.",
    diasLibres: "Hari libur per tahun",
    diasLibresAyuda: "Cuti, hari libur nasional, dan hari sakit. Tidak ada yang membayarnya, jadi tarif Anda harus menutupinya.",
    diasSemana: "Hari kerja per minggu",
    horasSemana: "Jam yang bisa ditagih per minggu",
    horasSemanaAyuda:
      "Hanya jam yang Anda tagihkan. Mencari klien, administrasi, dan belajar tidak bisa ditagih. Biasanya 20 sampai 30 dari 40 jam.",
    tarifaHora: "Tarif per jam",
    tarifaDia: "Tarif per hari",
    facturacionMensual: "Tagihan yang dibutuhkan per bulan",
    facturacionAnual: "Tagihan yang dibutuhkan per tahun",
    horasAnio: "Jam yang bisa ditagih per tahun",
    errorIngreso: "Masukkan penghasilan yang ingin Anda dapatkan per tahun.",
    errorImpuestos: "Pajak harus di bawah 100%.",
    errorDias: "Dengan hari libur sebanyak itu, tidak ada hari kerja yang tersisa dalam setahun.",
    errorHoras: "Masukkan berapa jam per minggu yang bisa Anda tagih.",
    observacionFacturables: "Jika tarif Anda lebih rendah dari ini, penghasilan Anda akan di bawah rencana atau jam kerja Anda bertambah.",
  }),
};
