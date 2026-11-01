import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "Kalkulator pinjaman",
    title: tituloQueEntre(`Kalkulator Pinjaman ${ctx.nombrePais}`, "Kalkulator Pinjaman dan Cicilan", "Kalkulator Pinjaman"),
    description:
      "Hitung cicilan pinjaman per bulan, total bunga, dan tabel angsuran lengkap. Lihat juga berapa yang Anda hemat jika membayar lebih setiap bulan.",
    intro: [
      "Sebelum mengajukan pinjaman, ada dua angka yang penting: cicilan setiap bulan dan total bunga yang harus Anda bayar.",
      "Masukkan jumlah pinjaman, bunga per tahun, dan tenor. Jika Anda berencana membayar lebih setiap bulan, isi juga untuk melihat seberapa cepat pinjaman lunas.",
    ],
    comoSeCalcula: [
      "Perhitungan memakai cicilan tetap dengan bunga efektif (metode anuitas), yang umum dipakai untuk KTA, kredit kendaraan, dan KPR.",
      "Bunga per bulan = bunga per tahun ÷ 12.",
      "Cicilan = pinjaman × bunga per bulan ÷ (1 − (1 + bunga per bulan) pangkat minus jumlah bulan).",
      "Setiap bulan bunga dihitung dari sisa pinjaman. Sisa cicilan mengurangi pokok.",
    ],
    ejemplo: [
      `Pinjaman ${m(monto)} dengan bunga 12% per tahun dan tenor 36 bulan memiliki cicilan ${m(cuota36)} per bulan. Total bunganya ${m(interesesTotales(monto, 12, 36))}.`,
      `Jika tenor diperpanjang menjadi 60 bulan, cicilan turun menjadi ${m(cuota60)}, tetapi total bunga naik menjadi ${m(interesesTotales(monto, 12, 60))}.`,
    ],
    faq: [
      {
        pregunta: "Bagaimana cara menghitung cicilan pinjaman per bulan?",
        respuesta:
          "Dengan rumus anuitas. Besar cicilan sama setiap bulan, tetapi di awal tenor sebagian besar cicilan adalah bunga, dan menjelang akhir sebagian besar adalah pokok. Karena itu sisa pinjaman turun pelan di awal.",
      },
      {
        pregunta: "Apa bedanya bunga flat dan bunga efektif?",
        respuesta:
          "Bunga flat dihitung dari jumlah pinjaman awal selama tenor, sedangkan bunga efektif dihitung dari sisa pinjaman. Dengan angka yang sama, bunga flat jauh lebih mahal. Kalkulator ini memakai bunga efektif.",
      },
      {
        pregunta: "Apakah pelunasan lebih awal menguntungkan?",
        respuesta:
          "Biasanya ya, selama penalti pelunasan tidak besar. Uang tambahan langsung mengurangi pokok sehingga bunganya berhenti berjalan. Makin cepat dibayar, makin besar yang Anda hemat.",
      },
      {
        pregunta: "Lebih baik tenor panjang atau pendek?",
        respuesta: "Tenor panjang membuat cicilan lebih ringan, tetapi total bunganya jauh lebih besar. Bandingkan kedua angka itu sebelum memutuskan.",
      },
    ],
    glosario: [
      { termino: "Pokok pinjaman", definicion: "Bagian utang yang belum Anda kembalikan." },
      { termino: "Tenor", definicion: "Jangka waktu pinjaman, biasanya dalam bulan." },
      { termino: "Bunga efektif", definicion: "Bunga yang dihitung dari sisa pinjaman setiap bulan." },
    ],
  };
};
