import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const quien = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "membeli" : "menyewa");
  return {
    h1: "Kalkulator sewa atau beli rumah",
    title: tituloQueEntre(`Sewa atau Beli Rumah di ${ctx.nombrePais}`, "Kalkulator Sewa atau Beli Rumah", "Sewa atau Beli Rumah"),
    description:
      "Bandingkan menyewa dan membeli rumah dalam jangka waktu pilihan Anda. Lihat mana yang lebih menguntungkan, mulai tahun berapa, dan selisihnya.",
    intro: [
      "Membandingkan cicilan KPR dengan biaya sewa saja tidak cukup. Pembeli membayar bunga, perawatan, dan PBB, tetapi pada akhirnya memiliki rumah. Penyewa bisa menginvestasikan uang mukanya.",
      "Kalkulator ini menjumlahkan semuanya tahun demi tahun dan menunjukkan pilihan mana yang memberi kekayaan bersih lebih besar.",
    ],
    comoSeCalcula: [
      "Membeli: setiap bulan Anda membayar cicilan KPR dan biaya pemilik. Kekayaan bersih Anda adalah nilai rumah dikurangi sisa pinjaman.",
      "Menyewa: uang muka dan biaya pembelian tetap diinvestasikan dengan imbal hasil alternatif, dan sewa naik setiap tahun.",
      "Setiap bulan, pihak yang pengeluarannya lebih kecil menginvestasikan selisihnya, jadi kedua pilihan memakai anggaran yang sama.",
      "Pilihan yang lebih baik adalah yang kekayaan bersihnya lebih besar di akhir.",
    ],
    ejemplo: [
      `Rumah seharga ${m(precio)} dengan uang muka 20% dan KPR berbunga 7% selama 25 tahun, dibandingkan dengan sewa ${m(alquiler)} per bulan.`,
      `Dalam 10 tahun, ${quien(a10)} lebih untung sebesar ${m(Math.abs(a10.comprar - a10.alquilar))}. Dalam 3 tahun, ${quien(a3)} lebih untung sebesar ${m(Math.abs(a3.comprar - a3.alquilar))}.`,
    ],
    faq: [
      {
        pregunta: "Apakah menyewa rumah berarti buang uang?",
        respuesta:
          "Tidak sepenuhnya. Pembeli juga membayar biaya yang tidak kembali: bunga, PBB, dan perawatan. Yang penting adalah berapa kekayaan Anda di akhir untuk tiap pilihan.",
      },
      {
        pregunta: "Mengapa hasilnya berubah jika jangka waktunya diganti?",
        respuesta:
          "Membeli rumah punya biaya besar di awal (biaya pembelian dan bunga tahun-tahun pertama) yang butuh waktu untuk tertutup. Jika Anda berencana pindah dalam waktu dekat, menyewa biasanya lebih untung.",
      },
      {
        pregunta: "Angka mana yang paling berpengaruh?",
        respuesta:
          "Perbandingan harga rumah dengan biaya sewa, bunga KPR, dan kenaikan harga rumah. Coba ubah kenaikan harga rumah dan imbal hasil investasi untuk melihat seberapa jauh hasilnya bergeser.",
      },
    ],
    glosario: [
      { termino: "Kekayaan bersih", definicion: "Semua yang Anda miliki dikurangi utang." },
      { termino: "Kenaikan harga rumah", definicion: "Persentase kenaikan nilai rumah setiap tahun." },
      { termino: "Biaya peluang", definicion: "Hasil yang bisa didapat uang muka jika diinvestasikan." },
    ],
  };
};
