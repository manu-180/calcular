import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulator persentase perubahan",
    title: tituloQueEntre(
      `Kalkulator persentase perubahan untuk ${ctx.nombrePais}`,
      `Persentase kenaikan dan penurunan untuk ${ctx.nombrePais}`,
      "Kalkulator persentase perubahan",
    ),
    description: "Hitung berapa persen suatu nilai naik atau turun: harga, gaji, penjualan, atau angka apa pun yang berubah dari waktu ke waktu.",
    intro: [
      "Masukkan nilai lama dan nilai baru. Anda akan melihat persentase kenaikan atau penurunan beserta selisihnya.",
      "Kalkulator ini juga menunjukkan perubahan yang dibutuhkan untuk kembali ke nilai awal, yang hampir tidak pernah sama persentasenya.",
    ],
    comoSeCalcula: [
      "Persentase perubahan = (nilai baru − nilai lama) ÷ nilai lama × 100.",
      "Hasil positif berarti naik. Hasil negatif berarti turun.",
      "Jika nilai lama negatif, pembaginya adalah nilai mutlaknya, sehingga tandanya tetap menunjukkan apakah nilainya membaik.",
    ],
    ejemplo: [
      `Barang yang dulu seharga ${m(antes)} dan sekarang ${m(despues)} naik 25%.`,
      "Untuk kembali ke harga lama, harganya harus turun 20%, bukan 25%.",
    ],
    faq: [
      {
        pregunta: "Bagaimana cara menghitung persentase kenaikan?",
        respuesta: "Kurangi nilai baru dengan nilai lama, bagi dengan nilai lama, lalu kalikan 100. Dari 80 ke 100: 20 ÷ 80 × 100 = 25%.",
      },
      {
        pregunta: "Bagaimana cara menghitung persentase penurunan?",
        respuesta: "Rumusnya sama. Dari 100 ke 80: −20 ÷ 100 × 100 = −20%, jadi turun 20%.",
      },
      {
        pregunta: "Mengapa naik 25% lalu turun 25% tidak kembali ke awal?",
        respuesta: "Setiap persentase dihitung dari angka dasar yang berbeda. 80 ditambah 25% menjadi 100, tetapi 100 dikurangi 25% menjadi 75.",
      },
      {
        pregunta: "Apa bedanya persen dan poin persentase?",
        respuesta: "Jika suku bunga naik dari 10% ke 12%, kenaikannya 2 poin persentase. Sebagai persentase perubahan, kenaikannya 20%.",
      },
    ],
    glosario: [
      { termino: "Persentase perubahan", definicion: "Besarnya perubahan suatu nilai, dinyatakan sebagai persen dari nilai awalnya." },
      { termino: "Poin persentase", definicion: "Selisih langsung antara dua persentase." },
    ],
  };
};
