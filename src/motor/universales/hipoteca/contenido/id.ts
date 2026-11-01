import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota20 = cuotaFrancesa(prestado, 7, 240);
  const cuota10 = cuotaFrancesa(prestado, 7, 120);
  return {
    h1: "Kalkulator KPR",
    title: tituloQueEntre(`Kalkulator KPR ${ctx.nombrePais}: Simulasi Cicilan`, `Kalkulator KPR ${ctx.nombrePais}`, "Kalkulator KPR"),
    description:
      "Simulasi cicilan KPR per bulan dari harga rumah, uang muka, bunga, dan tenor. Lihat total bunga dan sisa pinjaman setiap tahun.",
    intro: [
      "KPR adalah utang terbesar bagi kebanyakan keluarga. Ada baiknya Anda melihat angka lengkapnya sebelum bicara dengan bank.",
      "Masukkan harga rumah, uang muka, bunga, dan tenor. Jika Anda membayar PBB atau asuransi bersama cicilan, tambahkan juga untuk melihat pengeluaran bulanan yang sebenarnya.",
    ],
    comoSeCalcula: [
      "Plafon KPR = harga rumah − uang muka.",
      "Cicilan tetap per bulan dengan bunga per tahun dibagi 12 dan tenor dalam bulan (metode anuitas).",
      "Untuk setiap tahun dijumlahkan bunga dan pokok yang dibayar, lalu ditampilkan sisa pinjamannya.",
    ],
    ejemplo: [
      `Rumah seharga ${m(precio)} dengan uang muka 20% menyisakan plafon KPR ${m(prestado)}. Dengan bunga 7% dan tenor 20 tahun, cicilannya ${m(cuota20)} per bulan.`,
      `Selama 20 tahun total bunganya ${m(interesesTotales(prestado, 7, 240))}. Dengan tenor 10 tahun cicilan naik menjadi ${m(cuota10)}, tetapi total bunga turun menjadi ${m(interesesTotales(prestado, 7, 120))}.`,
    ],
    faq: [
      {
        pregunta: "Berapa uang muka KPR yang ideal?",
        respuesta:
          "Tergantung bank dan jenis rumahnya. Makin besar uang muka, makin kecil pinjaman, cicilan, dan total bunganya. Sisihkan juga dana untuk biaya akad, notaris, dan pajak pembelian.",
      },
      {
        pregunta: "Mengapa sisa pinjaman hampir tidak berkurang di tahun-tahun awal?",
        respuesta:
          "Bunga dihitung dari sisa pinjaman. Di awal tenor sisanya masih besar, jadi sebagian besar cicilan habis untuk bunga. Lama-kelamaan porsinya berbalik.",
      },
      {
        pregunta: "Apa bedanya bunga fixed dan floating?",
        respuesta:
          "Bunga fixed tetap selama masa yang disepakati, biasanya beberapa tahun pertama. Setelah itu bunga menjadi floating dan mengikuti bunga pasar, sehingga cicilan bisa naik. Kalkulator ini menganggap bunga sama sepanjang tenor.",
      },
      {
        pregunta: "Lebih baik tenor KPR pendek atau panjang?",
        respuesta:
          "Jika cicilan yang lebih besar masih terjangkau, tenor pendek jauh lebih hemat bunga. Jika tidak, tenor panjang dengan pelunasan sebagian saat ada dana juga bisa menjadi pilihan.",
      },
    ],
    glosario: [
      { termino: "Uang muka (DP)", definicion: "Bagian harga rumah yang Anda bayar dari dana sendiri." },
      { termino: "Plafon KPR", definicion: "Jumlah yang Anda pinjam dari bank." },
      { termino: "Sisa pinjaman", definicion: "Pokok yang masih harus Anda lunasi." },
    ],
  };
};
