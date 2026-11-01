import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 50);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulator persen",
    title: tituloQueEntre(`Kalkulator persen untuk ${ctx.nombrePais}`, "Kalkulator persen online", "Kalkulator persen"),
    description: "Hitung persen dari suatu angka, berapa persen satu angka terhadap angka lain, dan hasil kenaikan atau potongan persentase.",
    intro: [
      "Pilih yang ingin Anda ketahui, masukkan dua angkanya, dan hasilnya langsung muncul.",
      "Kalkulator ini mencakup empat hitungan persen sehari-hari: bagian, proporsi, kenaikan, dan penurunan.",
    ],
    comoSeCalcula: [
      "X% dari Y = X × Y ÷ 100.",
      "X sebagai persen dari Y = X ÷ Y × 100.",
      "Y ditambah X% = Y × (1 + X ÷ 100). Y dikurangi X% = Y × (1 − X ÷ 100).",
    ],
    ejemplo: ["15% dari 200 adalah 30.", "30 adalah 25% dari 120.", `Harga ${m(precio)} yang naik 10% menjadi ${m(precio * 1.1)}.`],
    faq: [
      {
        pregunta: "Bagaimana cara menghitung persen dari suatu angka?",
        respuesta: "Kalikan angkanya dengan persentase, lalu bagi 100. 20% dari 350 adalah 350 × 20 ÷ 100 = 70.",
      },
      {
        pregunta: "Bagaimana cara mengetahui berapa persen satu angka dari angka lain?",
        respuesta: "Bagi bagiannya dengan jumlah keseluruhan, lalu kalikan 100. Jika 45 dari 60 soal benar, hasilnya 45 ÷ 60 × 100 = 75%.",
      },
      {
        pregunta: "Bagaimana cara menambahkan persen ke sebuah harga?",
        respuesta: `Kalikan harganya dengan 1 ditambah persentase dalam bentuk desimal. Untuk menambah 10%, kalikan dengan ${formatearNumero(ctx, 1.1, 2)}.`,
      },
      {
        pregunta: "Jika naik 10% lalu turun 10%, apakah kembali ke angka awal?",
        respuesta: "Tidak. 100 ditambah 10% menjadi 110, dan 110 dikurangi 10% menjadi 99. Penurunannya dihitung dari angka yang lebih besar.",
      },
    ],
    glosario: [
      { termino: "Persen", definicion: "Jumlah yang ditulis sebagai bagian dari 100." },
      { termino: "Angka dasar", definicion: "Angka yang menjadi acuan persentase (Y di kalkulator ini)." },
    ],
  };
};
