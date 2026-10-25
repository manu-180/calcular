import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "Kalkulator bunga majemuk",
    title: tituloQueEntre(`Kalkulator Bunga Majemuk ${ctx.nombrePais}`, "Kalkulator Bunga Majemuk Online", "Kalkulator Bunga Majemuk"),
    description:
      "Lihat bagaimana uang Anda tumbuh dengan bunga majemuk dan setoran bulanan. Dapatkan saldo akhir, total bunga, dan tabel per tahun.",
    intro: [
      "Dengan bunga majemuk, bunga ditambahkan ke saldo lalu ikut menghasilkan bunga. Karena itu tabungan dan investasi tumbuh makin cepat dari tahun ke tahun.",
      "Masukkan dana yang Anda miliki sekarang, setoran per bulan, bunga, dan jangka waktunya. Kami tampilkan saldo akhir dan berapa bagian yang berasal dari bunga.",
    ],
    comoSeCalcula: [
      "Saldo akhir = dana awal × (1 + i) pangkat n + setoran × ((1 + i) pangkat n − 1) ÷ i.",
      "Di sini i adalah bunga per bulan yang setara dengan periode bunga majemuk yang Anda pilih, dan n adalah jumlah bulan.",
      "Setoran dihitung masuk di akhir setiap bulan.",
    ],
    ejemplo: [
      `Mulai dengan ${m(capital)} dan menabung ${m(aporte)} per bulan dengan bunga 7% per tahun, saldo Anda menjadi ${m(a10)} dalam 10 tahun.`,
      `Jika dilanjutkan 10 tahun lagi, saldonya mencapai ${m(a20)}. Dekade kedua menghasilkan jauh lebih banyak daripada dekade pertama.`,
    ],
    faq: [
      {
        pregunta: "Apa beda bunga tunggal dan bunga majemuk?",
        respuesta:
          "Bunga tunggal selalu dihitung dari dana awal. Bunga majemuk dihitung dari dana awal ditambah bunga yang sudah diperoleh.",
      },
      {
        pregunta: "Apa itu aturan 72?",
        respuesta: "Cara cepat memperkirakan berapa lama uang menjadi dua kali lipat: bagi 72 dengan bunga per tahun. Dengan bunga 6%, uang berlipat dua dalam sekitar 12 tahun.",
      },
      {
        pregunta: "Bunga berapa yang sebaiknya dipakai?",
        respuesta:
          "Pakai angka yang realistis untuk produk yang Anda pilih, misalnya deposito, reksa dana, atau obligasi. Untuk melihat hasil dalam nilai uang hari ini, kurangi bunga dengan perkiraan inflasi.",
      },
    ],
    glosario: [
      { termino: "Bunga majemuk", definicion: "Bunga yang dihitung dari saldo ditambah bunga yang sudah diperoleh." },
      { termino: "Periode bunga", definicion: "Seberapa sering bunga ditambahkan ke saldo." },
    ],
  };
};
