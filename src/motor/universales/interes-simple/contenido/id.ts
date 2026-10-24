import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "Kalkulator bunga tunggal",
    title: tituloQueEntre(`Kalkulator Bunga Tunggal ${ctx.nombrePais}`, "Kalkulator Bunga Tunggal Online", "Kalkulator Bunga Tunggal"),
    description:
      "Hitung bunga tunggal dari modal dengan bunga per tahun untuk jangka waktu hari, bulan, atau tahun. Pilih tahun 365 atau 360 hari dan lihat totalnya.",
    intro: [
      "Bunga tunggal selalu dihitung dari modal awal: bunga tidak ditambahkan ke saldo selama jangka waktunya.",
      "Cara ini dipakai untuk deposito jangka pendek, pinjaman antarpribadi, dan banyak soal matematika di sekolah.",
    ],
    comoSeCalcula: [
      "Bunga = modal × bunga per tahun × waktu dalam tahun.",
      "Untuk bulan, bagi dengan 12. Untuk hari, bagi dengan 365 atau 360, sesuai cara hitung bank.",
      "Total = modal + bunga.",
    ],
    ejemplo: [
      `Modal ${m(capital)} dengan bunga 10% per tahun selama 6 bulan menghasilkan bunga ${m(capital * 0.1 * 0.5)}.`,
      `Modal yang sama selama 90 hari menghasilkan ${m((capital * 0.1 * 90) / 365)} jika setahun dihitung 365 hari dan ${m((capital * 0.1 * 90) / 360)} jika 360 hari.`,
    ],
    faq: [
      {
        pregunta: "Apa rumus bunga tunggal?",
        respuesta: `B = M × i × t. M adalah modal, i adalah bunga per tahun dalam bentuk desimal (10% sama dengan ${formatearNumero(ctx, 0.1, 2)}), dan t adalah waktu dalam tahun.`,
      },
      {
        pregunta: "Apa bedanya dengan bunga majemuk?",
        respuesta: "Bunga tunggal selalu dihitung dari modal yang sama. Pada bunga majemuk, bunga ditambahkan ke saldo lalu ikut berbunga.",
      },
      {
        pregunta: "Mengapa ada bank yang memakai 360 hari setahun?",
        respuesta: "Itu kebiasaan perbankan agar hitungannya lebih mudah. Dengan 360 hari, bunganya sedikit lebih besar. Tanyakan cara hitung yang dipakai bank Anda.",
      },
    ],
    glosario: [
      { termino: "Modal", definicion: "Uang yang dipinjamkan atau diinvestasikan." },
      { termino: "Tahun bank", definicion: "Tahun yang dihitung 360 hari, dengan bulan 30 hari." },
    ],
  };
};
