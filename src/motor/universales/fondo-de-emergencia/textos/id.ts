import type { TextosUi } from "../../tipos";
import type { UiFondoDeEmergencia } from "../definicion";

export const textosId: TextosUi<UiFondoDeEmergencia> = {
  slug: "kalkulator-dana-darurat",
  ui: () => ({
    gastos: "Pengeluaran pokok per bulan",
    gastosAyuda: "Biaya yang tetap harus dibayar: tempat tinggal, makan, listrik dan air, transportasi, kesehatan, dan cicilan utang.",
    meses: "Jumlah bulan yang ingin ditanggung",
    mesesAyuda: "3 sampai 6 bulan jika penghasilan Anda tetap. Lebih lama jika penghasilan tidak menentu atau hanya ada satu sumber penghasilan di rumah.",
    actual: "Dana yang sudah Anda sisihkan (opsional)",
    aporte: "Yang bisa Anda tabung per bulan (opsional)",
    meta: "Dana darurat yang disarankan",
    falta: "Kekurangan yang masih perlu ditabung",
    mesesParaLlegar: "Bulan sampai dana terkumpul",
    cobertura: "Bulan yang tertutup oleh tabungan Anda saat ini",
    errorGastos: "Masukkan pengeluaran pokok Anda untuk satu bulan.",
    yaCubierto: "Dana darurat Anda sudah lengkap. Tabungan berikutnya bisa dipakai untuk tujuan lain.",
    sinAporte: "Masukkan jumlah yang bisa Anda tabung setiap bulan, lalu kami hitung berapa lama waktunya.",
    observacionDonde:
      "Simpan di rekening terpisah yang bisa dicairkan di hari yang sama dan nilainya terjaga, misalnya tabungan atau reksa dana pasar uang.",
  }),
};
