import type { TextosUi } from "../../tipos";
import type { UiPresupuesto } from "../definicion";

export const textosId: TextosUi<UiPresupuesto> = {
  slug: "kalkulator-anggaran-50-30-20",
  ui: () => ({
    ingreso: "Gaji bersih per bulan",
    ingresoAyuda: "Yang masuk ke rekening Anda setiap bulan, setelah pajak dan potongan.",
    pctNecesidades: "Kebutuhan (%)",
    pctNecesidadesAyuda: "Tempat tinggal, belanja dapur, listrik dan air, transportasi, kesehatan, dan cicilan minimum.",
    pctGustos: "Keinginan (%)",
    pctGustosAyuda: "Makan di luar, belanja yang tidak wajib, langganan, dan liburan.",
    pctAhorro: "Tabungan (%)",
    pctAhorroAyuda: "Dana darurat, target tabungan, dana pensiun, dan pelunasan utang lebih cepat.",
    necesidades: "Untuk kebutuhan",
    gustos: "Untuk keinginan",
    ahorro: "Untuk tabungan",
    ahorroAnual: "Tabungan dalam setahun",
    errorIngreso: "Masukkan penghasilan bulanan Anda.",
    errorSuma: (suma) => `Jumlah ketiga persentase adalah ${suma}%. Totalnya harus 100%.`,
    observacionAhorroBajo: "Menabung kurang dari 10% menyisakan sedikit ruang untuk kebutuhan mendadak. Jika bisa, kurangi sebagian pos keinginan.",
  }),
};
