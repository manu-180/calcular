import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `${formatearNumero(ctx, n, 2)}%`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  return {
    h1: "Kalkulator margin keuntungan",
    title: tituloQueEntre(`Kalkulator margin keuntungan ${ctx.nombrePais}`, `Margin keuntungan ${ctx.nombrePais}`, "Kalkulator margin keuntungan"),
    description: "Hitung margin dan markup dari harga pokok dan harga jual, atau harga jual yang dibutuhkan untuk mencapai margin yang Anda inginkan.",
    intro: [
      "Margin dan markup sering tertukar, dan selisihnya bisa membuat Anda rugi. Keduanya mengukur laba yang sama, tetapi dengan dasar yang berbeda.",
      "Masukkan harga pokok dan harga jual, lalu kami tampilkan keduanya. Atau pilih target margin, lalu kami hitung harga jual yang perlu Anda pasang.",
    ],
    comoSeCalcula: [
      "Laba = harga jual − harga pokok.",
      "Margin = laba ÷ harga jual × 100.",
      "Markup = laba ÷ harga pokok × 100.",
      "Harga jual untuk target margin = harga pokok ÷ (1 − margin ÷ 100).",
    ],
    ejemplo: [
      `Produk dengan harga pokok ${m(costo)} yang dijual ${m(precio)} memberi laba ${m(precio - costo)}: margin ${p(((precio - costo) / precio) * 100)} dan markup ${p(((precio - costo) / costo) * 100)}.`,
      `Untuk margin 50% dari harga pokok itu, Anda perlu menjual seharga ${m(precioConMargen(costo, 50))}. Menambah 50% ke harga pokok hanya menghasilkan margin ${p(100 / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Apa beda margin dan markup?",
        respuesta: "Margin adalah laba dibanding harga jual. Markup adalah laba dibanding harga pokok. Untuk laba yang sama, markup selalu lebih besar.",
      },
      {
        pregunta: "Bagaimana cara menentukan harga jual dari target margin?",
        respuesta: `Bagi harga pokok dengan (1 − margin). Untuk margin 30%, bagi harga pokok dengan ${formatearNumero(ctx, 0.7, 2)}. Jangan menambah 30% ke harga pokok: laba Anda akan lebih kecil dari perkiraan.`,
      },
      {
        pregunta: "Apakah harga pokok termasuk pajak?",
        respuesta: "Pakai harga pokok dan harga jual tanpa pajak yang dibebankan ke pembeli, seperti PPN. Jika pajaknya ikut dihitung, margin terlihat lebih besar dari aslinya.",
      },
    ],
    glosario: [
      { termino: "Margin", definicion: "Laba dalam persen dari harga jual." },
      { termino: "Markup", definicion: "Laba dalam persen dari harga pokok." },
      { termino: "HPP", definicion: "Harga pokok penjualan: biaya untuk membeli atau membuat barang yang dijual." },
    ],
  };
};
