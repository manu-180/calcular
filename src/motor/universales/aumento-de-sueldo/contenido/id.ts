import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const sueldo = montoEjemplo(ctx, 4000);
  return {
    h1: "Kalkulator kenaikan gaji",
    title: tituloQueEntre(`Kalkulator kenaikan gaji ${ctx.nombrePais}`, `Kenaikan gaji ${ctx.nombrePais}`, "Kalkulator kenaikan gaji"),
    description: "Hitung gaji baru setelah kenaikan, selisihnya per bulan dan per tahun, dan kenaikan riil Anda setelah dibandingkan dengan inflasi.",
    intro: [
      "Anda mendapat tawaran kenaikan gaji, atau akan memintanya. Masukkan gaji dan kenaikannya, dalam persen atau rupiah, lalu lihat perubahannya per bulan dan per tahun.",
      "Tambahkan inflasi selama periode itu, lalu kami tunjukkan apakah daya beli Anda benar-benar bertambah atau hanya mengejar kenaikan harga.",
    ],
    comoSeCalcula: [
      "Gaji baru = gaji saat ini × (1 + kenaikan ÷ 100).",
      "Selisih per tahun = selisih per bulan × jumlah gaji per tahun.",
      "Kenaikan riil = (1 + kenaikan) ÷ (1 + inflasi) − 1.",
    ],
    ejemplo: [
      `Gaji ${m(sueldo)} per bulan dengan kenaikan 5% menjadi ${m(sueldo * 1.05)}: bertambah ${m(sueldo * 0.05)} per bulan dan ${m(sueldo * 0.05 * 12)} per tahun.`,
      `Jika inflasi selama periode itu 3%, kenaikan riilnya ${p(aumentoReal(5, 3))}. Jika inflasinya 6%, kenaikan riilnya ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "Apa itu kenaikan gaji riil?",
        respuesta: "Kenaikan gaji setelah memperhitungkan inflasi. Angka ini menunjukkan apakah gaji baru Anda bisa membeli lebih banyak atau lebih sedikit dari sebelumnya.",
      },
      {
        pregunta: "Mengapa tidak cukup mengurangi kenaikan gaji dengan inflasi?",
        respuesta: `Karena kedua persentase itu dikalikan, bukan dijumlahkan. Dengan kenaikan 5% dan inflasi 3%, kenaikan riilnya ${p(aumentoReal(5, 3))}, bukan 2%. Saat inflasi tinggi, selisihnya makin besar.`,
      },
      {
        pregunta: "Berapa kenaikan gaji yang wajar untuk diminta?",
        respuesta:
          "Minimal sebesar inflasi sejak kenaikan terakhir, agar daya beli Anda tidak turun. Selebihnya, lihat gaji pasar untuk posisi yang sama dan seberapa besar tanggung jawab Anda bertambah.",
      },
    ],
    glosario: [
      { termino: "Kenaikan nominal", definicion: "Kenaikan seperti yang tertulis di slip gaji, sebelum memperhitungkan inflasi." },
      { termino: "Daya beli", definicion: "Barang dan jasa yang bisa dibeli dengan gaji Anda." },
    ],
  };
};
