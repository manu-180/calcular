import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoId: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 5, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "Kalkulator pelunasan kartu kredit",
    title: tituloQueEntre(`Kalkulator Kartu Kredit ${ctx.nombrePais}`, "Kalkulator Pelunasan Kartu Kredit", "Kalkulator Kartu Kredit"),
    description:
      "Cari tahu berapa bulan yang dibutuhkan untuk melunasi tagihan kartu kredit dan berapa bunganya, dengan pembayaran tetap atau pembayaran minimum.",
    intro: [
      "Kartu kredit biasanya adalah utang dengan bunga paling mahal. Jika hanya membayar minimum, pelunasannya bisa bertahun-tahun dan bunganya terus menumpuk.",
      "Masukkan sisa tagihan, bunga per tahun, dan jumlah yang sanggup Anda bayar setiap bulan. Kami tampilkan kapan tagihan lunas, total bunga, dan rencana per bulan.",
    ],
    comoSeCalcula: [
      "Setiap bulan bunga ditambahkan: sisa tagihan × bunga per tahun ÷ 12.",
      "Lalu pembayaran dikurangkan. Untuk pembayaran minimum, jumlahnya adalah persentase dari tagihan, dengan batas paling sedikit.",
      "Hal ini diulang sampai tagihan menjadi nol. Jika pembayaran tidak lebih besar dari bunga, utangnya tidak pernah berkurang.",
    ],
    ejemplo: [
      `Tagihan ${m(saldo)} dengan bunga 22% per tahun, dibayar ${m(fijo)} per bulan, lunas dalam ${conFijo.meses} bulan dengan total bunga ${m(conFijo.intereses)}.`,
      `Jika hanya membayar minimum 5%, pelunasan butuh ${conMinimo.meses} bulan dan bunganya naik menjadi ${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "Apa yang terjadi jika hanya membayar minimum kartu kredit?",
        respuesta:
          "Pembayaran minimum ikut mengecil saat tagihan berkurang, jadi setiap bulan Anda membayar lebih sedikit dan utangnya berlarut-larut. Jika bisa, bayar jumlah tetap yang lebih besar, walau hanya sedikit di atas minimum.",
      },
      {
        pregunta: "Apakah sebaiknya tagihan dipindahkan ke pinjaman tunai?",
        respuesta: "Jika bunga pinjamannya jauh lebih rendah dari bunga kartu, biasanya lebih hemat. Bandingkan total bunga kedua pilihan, termasuk biaya provisi dan administrasi.",
      },
      {
        pregunta: "Kartu mana yang dilunasi lebih dulu?",
        respuesta: "Bayar minimum di semua kartu, lalu sisanya ke kartu dengan bunga tertinggi. Dengan begitu total bunga yang Anda bayar paling kecil.",
      },
    ],
    glosario: [
      { termino: "Pembayaran minimum", definicion: "Jumlah paling sedikit yang harus dibayar setiap bulan agar tidak kena denda keterlambatan. Tidak melunasi utang." },
      { termino: "Tagihan", definicion: "Total yang masih Anda utang pada penerbit kartu." },
    ],
  };
};
