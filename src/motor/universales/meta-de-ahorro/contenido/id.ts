import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  return {
    h1: "Kalkulator tabungan",
    title: tituloQueEntre(`Kalkulator Target Tabungan ${ctx.nombrePais}`, "Kalkulator Target Tabungan", "Kalkulator Tabungan"),
    description:
      "Cari tahu berapa yang perlu ditabung setiap bulan agar target Anda tercapai tepat waktu, dengan menghitung tabungan yang ada dan bunganya.",
    intro: [
      "Liburan, kendaraan, DP rumah, atau dana cadangan. Target dengan jumlah dan tanggal yang jelas jauh lebih mudah dicapai.",
      "Masukkan jumlah yang ingin Anda kumpulkan dan dalam berapa bulan. Kami hitung berapa yang perlu disisihkan per bulan dan per minggu.",
    ],
    comoSeCalcula: [
      "Pertama dihitung pertumbuhan tabungan Anda yang sekarang sampai akhir jangka waktu.",
      "Kekurangannya dibagi menjadi setoran bulanan yang sama besar.",
      "Jika tabungan Anda berbunga, setiap setoran ikut berbunga, jadi setorannya bisa sedikit lebih kecil.",
    ],
    ejemplo: [
      `Untuk mengumpulkan ${m(meta)} dalam 24 bulan tanpa bunga, Anda perlu menabung ${m(meta / 24)} per bulan.`,
      `Jika sudah punya ${m(actual)} dan imbal hasilnya 5% per tahun, cukup ${m(aporteNecesario(meta, actual, 24, 5))} per bulan.`,
    ],
    faq: [
      {
        pregunta: "Bagaimana agar konsisten menabung?",
        respuesta: "Pindahkan uangnya begitu gaji masuk, sebelum dipakai untuk hal lain. Jika bisa, atur autodebet ke rekening tabungan terpisah.",
      },
      {
        pregunta: "Bagaimana jika setoran bulanannya terlalu besar?",
        respuesta: "Perpanjang waktunya atau kecilkan targetnya. Anda juga bisa mulai dari jumlah yang sanggup, lalu menaikkannya saat penghasilan bertambah.",
      },
      {
        pregunta: "Apakah inflasi perlu diperhitungkan?",
        respuesta: "Jika targetnya beberapa tahun lagi, tambahkan perkiraan inflasi ke jumlah target. Barang yang hari ini seharga 100 bisa jauh lebih mahal nanti.",
      },
    ],
    glosario: [
      { termino: "Setoran", definicion: "Uang yang Anda sisihkan setiap bulan untuk target." },
      { termino: "Imbal hasil", definicion: "Hasil yang diberikan tabungan atau investasi Anda." },
    ],
  };
};
