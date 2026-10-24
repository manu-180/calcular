import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulator patungan",
    title: tituloQueEntre(`Kalkulator patungan untuk ${ctx.nombrePais}`, "Kalkulator patungan dan split bill", "Kalkulator patungan"),
    description: "Bagi biaya bersama hingga 8 orang: bagian tiap orang dan siapa membayar ke siapa, dengan jumlah transfer sesedikit mungkin.",
    intro: [
      "Gunakan untuk liburan, makan bersama, acara, atau sewa tempat bersama ketika tiap orang membayar jumlah yang berbeda.",
      "Isi jumlah yang dibayar tiap orang. Anda akan melihat bagian masing-masing dan transfer yang membuat semuanya impas.",
    ],
    comoSeCalcula: [
      "Bagian tiap orang = total pengeluaran ÷ jumlah orang.",
      "Yang membayar kurang dari bagiannya menanggung selisihnya. Yang membayar lebih menerima kembali selisihnya.",
      "Transfer diatur dari utang terbesar ke piutang terbesar, sehingga tidak ada transfer yang tidak perlu.",
    ],
    ejemplo: [
      `Ani membayar ${m(a)}, Budi membayar ${m(b)}, dan Citra belum membayar apa pun. Totalnya ${m(a + b)}, jadi bagian tiap orang ${m(cuota)}.`,
      `Citra mentransfer ${m(cuota)} ke Ani, dan Budi mentransfer ${m(cuota - b)} ke Ani.`,
    ],
    faq: [
      {
        pregunta: "Bagaimana cara membagi tagihan jika tiap orang membayar jumlah berbeda?",
        respuesta: "Jumlahkan semuanya, bagi dengan jumlah orang, lalu bandingkan dengan yang sudah dibayar tiap orang. Selisihnya adalah yang harus dibayar atau diterima.",
      },
      {
        pregunta: "Bagaimana jika ada yang belum membayar sama sekali?",
        respuesta: "Isi 0 untuk orang itu agar tetap dihitung dalam patungan. Jika kolomnya dikosongkan, orang itu tidak ikut dihitung.",
      },
      {
        pregunta: "Mengapa jumlah transfernya lebih sedikit daripada jumlah orang?",
        respuesta: "Utang dikelompokkan: orang dengan utang terbesar membayar ke orang yang membayar paling banyak, dan seterusnya. Jumlah transfer tidak pernah lebih dari jumlah orang dikurangi satu.",
      },
    ],
    glosario: [
      { termino: "Bagian", definicion: "Jumlah yang seharusnya dibayar tiap orang dari total biaya." },
      { termino: "Saldo", definicion: "Selisih antara yang sudah dibayar seseorang dan bagiannya." },
    ],
  };
};
