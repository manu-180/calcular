import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "Kalkulator ROI",
    title: tituloQueEntre(`Kalkulator ROI dan CAGR ${ctx.nombrePais}`, `Kalkulator ROI ${ctx.nombrePais}`, "Kalkulator ROI dan CAGR"),
    description: "Hitung imbal hasil total (ROI) dan imbal hasil per tahun (CAGR) sebuah investasi dari modal awal, nilai saat ini, dan lama investasinya.",
    intro: [
      "Untung 50% terdengar besar, tetapi tidak sama jika dicapai dalam 2 tahun atau 10 tahun. Untuk membandingkan investasi, Anda perlu imbal hasil per tahun.",
      "Masukkan modal yang Anda tanam, nilainya sekarang, dan berapa tahun sudah berjalan. Kami tampilkan imbal hasil total dan imbal hasil majemuk per tahun.",
    ],
    comoSeCalcula: [
      "ROI = (nilai akhir + hasil yang diterima − modal awal) ÷ modal awal × 100.",
      "CAGR = ((nilai akhir + hasil yang diterima) ÷ modal awal) pangkat (1 ÷ jumlah tahun), dikurangi 1.",
      "CAGR adalah tingkat pertumbuhan majemuk per tahun: angka yang memberi hasil sama jika terulang setiap tahun.",
    ],
    ejemplo: [
      `Modal ${m(inicial)} yang menjadi ${m(final)} memberi keuntungan ${m(final - inicial)}, atau ROI ${p(roi(inicial, final))}.`,
      `Jika butuh 5 tahun, imbal hasil per tahunnya ${p(cagr(inicial, final, 5))}. Jika hanya 2 tahun, ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "Apa beda ROI dan CAGR?",
        respuesta:
          "ROI adalah keuntungan total dibanding modal, tanpa melihat lamanya. CAGR membaginya per tahun, sehingga investasi dengan jangka waktu berbeda bisa dibandingkan.",
      },
      {
        pregunta: "Mengapa imbal hasil per tahun bukan total dibagi jumlah tahun?",
        respuesta: `Karena keuntungan setiap tahun ikut menambah saldo dan ikut berkembang. Untung 50% dalam 5 tahun setara ${p(cagr(1, 1.5, 5))} per tahun secara majemuk, bukan 10%.`,
      },
      {
        pregunta: "Bagaimana cara menghitung dividen atau bunga yang sudah diterima?",
        respuesta: "Masukkan di kolom hasil yang diterima jika uangnya Anda ambil. Jika diinvestasikan kembali, jumlahnya sudah termasuk dalam nilai akhir.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Return on investment: keuntungan total dalam persen dari modal yang ditanam." },
      { termino: "CAGR", definicion: "Compound annual growth rate: rata-rata imbal hasil per tahun dengan efek majemuk." },
    ],
  };
};
