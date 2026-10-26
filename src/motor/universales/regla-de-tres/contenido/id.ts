import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const precio3 = montoEjemplo(ctx, 6);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulator perbandingan senilai dan berbalik nilai",
    title: tituloQueEntre(
      `Kalkulator perbandingan senilai untuk ${ctx.nombrePais}`,
      `Perbandingan senilai untuk ${ctx.nombrePais}`,
      "Kalkulator perbandingan senilai",
    ),
    description: "Selesaikan perbandingan senilai atau berbalik nilai dalam hitungan detik. Masukkan tiga nilai dan dapatkan nilai keempat beserta cara hitungnya.",
    intro: [
      "Perbandingan ini dipakai jika dua besaran berubah bersamaan dan Anda sudah tahu tiga dari empat nilainya.",
      "Pilih senilai atau berbalik nilai, isi A, B, dan C, lalu kalkulator akan menghitung X.",
    ],
    comoSeCalcula: [
      "Senilai: X = B × C ÷ A. Dipakai jika kedua besaran naik bersamaan (makin banyak kilogram, makin mahal harganya).",
      "Berbalik nilai: X = A × B ÷ C. Dipakai jika satu besaran naik dan yang lain turun (makin banyak pekerja, makin sedikit harinya).",
    ],
    ejemplo: [
      `Jika 3 kilogram harganya ${m(precio3)}, maka 5 kilogram harganya ${m((precio3 * 5) / 3)}.`,
      "Jika 4 orang mengecat rumah dalam 12 hari, maka 6 orang menyelesaikannya dalam 8 hari.",
    ],
    faq: [
      {
        pregunta: "Bagaimana cara membedakan perbandingan senilai dan berbalik nilai?",
        respuesta: "Jika satu besaran naik saat besaran lain naik, itu senilai. Jika satu besaran turun saat besaran lain naik, itu berbalik nilai.",
      },
      {
        pregunta: "Bagaimana cara menghitung perbandingan senilai secara manual?",
        respuesta: `Kalikan silang dua nilai yang diketahui, lalu bagi dengan nilai yang tersisa. Jika 3 sebanding dengan 600, maka 5 sebanding dengan 600 × 5 ÷ 3 = ${formatearNumero(ctx, 1000)}.`,
      },
      {
        pregunta: "Apakah bisa dipakai untuk menghitung persen?",
        respuesta: "Bisa. Jika 200 adalah 100%, maka 50 adalah 25%. Itu perbandingan senilai dengan A = 200, B = 100, dan C = 50.",
      },
    ],
    glosario: [
      { termino: "Perbandingan senilai", definicion: "Dua besaran yang naik atau turun bersamaan." },
      { termino: "Perbandingan berbalik nilai", definicion: "Satu besaran naik saat besaran lainnya turun." },
    ],
  };
};
