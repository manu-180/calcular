import type { TextosUi } from "../../tipos";
import type { UiAumentoDeSueldo } from "../definicion";

export const textosId: TextosUi<UiAumentoDeSueldo> = {
  slug: "kalkulator-kenaikan-gaji",
  ui: () => ({
    sueldo: "Gaji per bulan saat ini",
    sueldoAyuda: "Gaji kotor atau gaji bersih, pilih salah satu. Hasilnya memakai dasar yang sama.",
    aumentoPorcentaje: "Kenaikan gaji (%)",
    aumentoMonto: "Kenaikan dalam rupiah (opsional)",
    aumentoMontoAyuda: "Jika kenaikan Anda berupa jumlah tetap, masukkan di sini. Jumlah ini dipakai sebagai ganti persentase.",
    inflacion: "Inflasi selama periode itu (%, opsional)",
    inflacionAyuda: "Inflasi sejak kenaikan gaji terakhir, untuk melihat apakah gaji Anda bisa membeli lebih banyak atau lebih sedikit dari sebelumnya.",
    sueldosAnio: "Jumlah gaji per tahun",
    sueldosAnioAyuda: "12 untuk gaji bulanan. 13 atau lebih jika Anda juga menerima THR atau gaji tambahan setiap tahun.",
    nuevo: "Gaji baru per bulan",
    diferenciaMensual: "Selisih per bulan",
    diferenciaAnual: "Selisih per tahun",
    porcentaje: "Kenaikan dalam persen",
    real: "Kenaikan riil (setelah inflasi)",
    realAyuda: "Seberapa banyak tambahan daya beli gaji baru dibanding gaji lama.",
    errorSueldo: "Masukkan gaji Anda saat ini.",
    errorSinAumento: "Masukkan kenaikan dalam persen atau dalam jumlah.",
    observacionGana: (puntos) => `Kenaikan Anda di atas inflasi: daya beli gaji Anda naik ${puntos}% dari sebelumnya.`,
    observacionPierde: (puntos) => `Kenaikan Anda di bawah inflasi: daya beli gaji Anda turun ${puntos}% dari sebelumnya.`,
    observacionIgual: "Kenaikan Anda sama dengan inflasi: daya beli gaji Anda tetap seperti sebelumnya.",
  }),
};
