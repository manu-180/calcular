import type { TextosUi } from "../../tipos";
import type { UiCostoDeUnAuto } from "../definicion";

export const textosId: TextosUi<UiCostoDeUnAuto> = {
  slug: "biaya-kepemilikan-mobil",
  ui: () => ({
    precio: "Nilai mobil",
    precioAyuda: "Harga beli, atau harga pasarnya sekarang jika mobil sudah lama Anda pakai.",
    depreciacion: "Penyusutan nilai per tahun (%)",
    depreciacionAyuda: "Mobil baru turun 15% sampai 25% di tahun pertama. Mobil bekas biasanya lebih sedikit.",
    cuota: "Cicilan kredit per bulan (opsional)",
    cuotaAyuda: "Hanya untuk melihat uang yang keluar dari rekening setiap bulan. Tidak ditambahkan ke biaya sebenarnya.",
    seguro: "Asuransi per bulan",
    distanciaKm: "Kilometer per bulan",
    distanciaMi: "Mil per bulan",
    consumoL100: "Konsumsi BBM (liter per 100 km)",
    consumoMpg: "Efisiensi BBM (mil per galon)",
    precioLitro: "Harga BBM per liter",
    precioGalon: "Harga BBM per galon",
    mantenimiento: "Perawatan per bulan",
    mantenimientoAyuda: "Servis berkala, ban, perbaikan, dan cuci mobil, dirata-rata per bulan.",
    estacionamiento: "Parkir per bulan (opsional)",
    otros: "Pajak kendaraan, tol, dan biaya lain per bulan (opsional)",
    otrosAyuda: "Pajak tahunan, perpanjangan surat kendaraan, tol, dan denda, dirata-rata per bulan.",
    costoMensual: "Biaya sebenarnya per bulan",
    costoAnual: "Biaya sebenarnya per tahun",
    porKm: "Biaya per kilometer",
    porMilla: "Biaya per mil",
    combustible: "BBM per bulan",
    depreciacionMensual: "Penyusutan nilai per bulan",
    gastoBolsillo: "Uang yang keluar dari rekening setiap bulan",
    errorConsumo: "Masukkan konsumsi BBM mobil Anda untuk menghitung biaya bahan bakar.",
    observacionCuota:
      "Cicilan tidak dihitung sebagai biaya sebenarnya karena sebagian cicilan membayar mobil itu sendiri, yang sudah dihitung sebagai penyusutan. Bunga kreditnya menjadi biaya tambahan di luar itu.",
  }),
};
