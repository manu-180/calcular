import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  return {
    h1: "Kalkulator bunga efektif",
    title: tituloQueEntre(`Kalkulator Bunga Efektif ${ctx.nombrePais}`, "Kalkulator Bunga Nominal ke Efektif", "Kalkulator Bunga Efektif"),
    description:
      "Ubah bunga nominal tahunan menjadi bunga efektif tahunan dan sebaliknya, dengan periode bunga bulanan, triwulanan, semesteran, atau harian.",
    intro: [
      "Dua penawaran dengan angka bunga yang sama bisa memberi hasil berbeda. Bedanya ada pada seberapa sering bunga dihitung atau dibayarkan.",
      "Bunga efektif tahunan menyamakan semuanya: itulah yang benar-benar Anda bayar atau dapatkan dalam setahun. Pilih bunga yang Anda punya, lalu kami tampilkan yang satunya.",
    ],
    comoSeCalcula: [
      "Bunga efektif = (1 + bunga nominal ÷ m) pangkat m, dikurangi 1. Di sini m adalah jumlah periode dalam setahun: 12 untuk bulanan, 4 untuk triwulanan.",
      "Bunga nominal = m × ((1 + bunga efektif) pangkat 1 ÷ m, dikurangi 1).",
      "Bunga per periode adalah bunga nominal dibagi m.",
    ],
    ejemplo: [
      `Bunga nominal 12% per tahun yang dihitung bulanan sama dengan bunga efektif ${p(aEfectiva(12, 12))} per tahun.`,
      `Bunga efektif 10% per tahun sama dengan bunga nominal ${p(aNominal(10, 12))} jika bunga dihitung setiap bulan.`,
    ],
    faq: [
      {
        pregunta: "Apa beda bunga nominal dan bunga efektif?",
        respuesta:
          "Bunga nominal adalah angka tahunan sebelum efek bunga majemuk. Bunga efektif sudah memperhitungkan bunga yang ikut berbunga. Karena itu bunga efektif selalu sama atau lebih tinggi dari bunga nominal.",
      },
      {
        pregunta: "Mana yang dipakai untuk membandingkan penawaran?",
        respuesta:
          "Untuk tabungan dan deposito, pakai bunga efektif karena menunjukkan hasil yang benar-benar Anda terima. Untuk pinjaman, bandingkan bunga efektif dan juga total biaya, termasuk provisi dan administrasi.",
      },
      {
        pregunta: "Mengapa bunga efektif naik jika bunga dihitung lebih sering?",
        respuesta:
          "Bunga lebih cepat ditambahkan ke saldo dan mulai menghasilkan bunga sendiri. Jika bunga dihitung setahun sekali, bunga nominal dan efektif sama besarnya.",
      },
    ],
    glosario: [
      { termino: "Bunga nominal", definicion: "Bunga tahunan sebelum efek bunga majemuk." },
      { termino: "Bunga efektif", definicion: "Bunga tahunan yang sudah memperhitungkan bunga majemuk." },
      { termino: "Bunga majemuk", definicion: "Bunga yang ditambahkan ke saldo lalu ikut menghasilkan bunga." },
    ],
  };
};
