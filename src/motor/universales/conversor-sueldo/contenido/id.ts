import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const anual = montoEjemplo(ctx, 50000);
  const hora = montoEjemplo(ctx, 20);
  return {
    h1: "Kalkulator gaji per jam",
    title: tituloQueEntre(`Kalkulator gaji per jam ${ctx.nombrePais}`, `Gaji per jam ${ctx.nombrePais}`, "Kalkulator gaji per jam"),
    description: "Ubah gaji Anda antara per jam, per hari, per minggu, per setengah bulan, per bulan, dan per tahun, sesuai jam kerja dan minggu yang dibayar.",
    intro: [
      "Berapa gaji Anda per jam? Berapa setahun jika tawaran kerja dibayar per jam? Masukkan jumlahnya, pilih periodenya, lalu kami tampilkan semua periode lain.",
      "Gunakan untuk membandingkan tawaran kerja, menghitung upah lembur, atau melihat nilai waktu Anda.",
    ],
    comoSeCalcula: [
      "Semua jumlah diubah dulu menjadi jumlah per tahun.",
      "Per jam = per tahun ÷ (jam kerja per minggu × minggu yang dibayar).",
      "Per hari = per tahun ÷ (hari kerja per minggu × minggu yang dibayar). Per minggu = per tahun ÷ minggu yang dibayar.",
      "Per bulan = per tahun ÷ 12. Per setengah bulan = per tahun ÷ 24.",
    ],
    ejemplo: [
      `Gaji ${m(anual)} per tahun dengan 40 jam kerja per minggu sama dengan ${m(anual / 2080)} per jam dan ${m(anual / 12)} per bulan.`,
      `Tawaran ${m(hora)} per jam untuk kerja penuh waktu setara ${m(hora * 2080)} per tahun.`,
    ],
    faq: [
      {
        pregunta: "Berapa jam kerja dalam setahun?",
        respuesta: `Dengan 40 jam per minggu dan 52 minggu yang dibayar, ${formatearNumero(ctx, 2080)} jam. Karena itu, cara cepatnya adalah mengalikan upah per jam dengan sekitar ${formatearNumero(ctx, 2000)}.`,
      },
      {
        pregunta: "Mengapa gaji mingguan dikali 4 tidak sama dengan gaji bulanan?",
        respuesta: `Karena rata-rata satu bulan berisi ${formatearNumero(ctx, 52 / 12, 2)} minggu, bukan 4. Untuk mengubah gaji mingguan menjadi bulanan, kalikan dengan 52 lalu bagi 12.`,
      },
      {
        pregunta: "Apakah sudah termasuk bonus, THR, atau pajak?",
        respuesta: "Belum. Kalkulator ini hanya mengubah angka yang sama antarperiode. Jika Anda menerima bonus atau THR, tambahkan terpisah saat membandingkan tawaran.",
      },
    ],
    glosario: [
      { termino: "Gaji kotor", definicion: "Gaji sebelum dipotong pajak dan iuran." },
      { termino: "Upah per jam", definicion: "Gaji dibagi jumlah jam kerja yang dibayar." },
    ],
  };
};
