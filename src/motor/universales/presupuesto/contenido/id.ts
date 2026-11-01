import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  return {
    h1: "Kalkulator anggaran 50/30/20",
    title: tituloQueEntre(`Kalkulator Anggaran 50/30/20 ${ctx.nombrePais}`, "Kalkulator Anggaran 50/30/20", "Anggaran 50/30/20"),
    description:
      "Bagi gaji bersih bulanan Anda dengan aturan 50/30/20: berapa untuk kebutuhan, keinginan, dan tabungan. Ubah persentasenya jika perlu.",
    intro: [
      "Aturan 50/30/20 adalah cara sederhana untuk mengatur keuangan bulanan. Setengah untuk kebutuhan pokok, 30% untuk hal yang Anda nikmati, dan 20% untuk tabungan.",
      "Masukkan gaji bersih Anda dan kami tampilkan porsi masing-masing. Jika kondisi Anda berbeda, misalnya biaya kos atau sewa tinggi, sesuaikan persentasenya.",
    ],
    comoSeCalcula: ["Kebutuhan = penghasilan × 50%.", "Keinginan = penghasilan × 30%.", "Tabungan = penghasilan × 20%. Ketiga persentase harus berjumlah 100%."],
    ejemplo: [
      `Dengan penghasilan ${m(ingreso)} per bulan: ${m(ingreso * 0.5)} untuk kebutuhan, ${m(ingreso * 0.3)} untuk keinginan, dan ${m(ingreso * 0.2)} untuk tabungan.`,
      `Dalam setahun, porsi 20% itu menjadi tabungan sebesar ${m(ingreso * 0.2 * 12)}.`,
    ],
    faq: [
      {
        pregunta: "Apa yang termasuk kebutuhan dan apa yang termasuk keinginan?",
        respuesta:
          "Kebutuhan adalah tagihan yang wajib dibayar: tempat tinggal, bahan makanan pokok, listrik dan air, transportasi, kesehatan, dan cicilan minimum. Keinginan adalah pengeluaran yang bisa dihentikan jika terpaksa.",
      },
      {
        pregunta: "Bagaimana jika kebutuhan saya lebih dari 50%?",
        respuesta: "Itu wajar, terutama jika biaya sewa tinggi. Coba 60/20/20 atau 70/20/10, dan usahakan tabungan tidak sampai nol.",
      },
      {
        pregunta: "Apakah cicilan utang termasuk tabungan?",
        respuesta: "Cicilan minimum masuk ke kebutuhan. Pembayaran tambahan untuk melunasi utang lebih cepat termasuk tabungan, karena sama-sama menambah kekayaan bersih Anda.",
      },
    ],
    glosario: [
      { termino: "Gaji bersih", definicion: "Penghasilan yang Anda terima setelah pajak dan potongan." },
      { termino: "Aturan 50/30/20", definicion: "Cara membagi penghasilan untuk kebutuhan, keinginan, dan tabungan." },
    ],
  };
};
