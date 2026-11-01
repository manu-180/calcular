import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulator diskon",
    title: tituloQueEntre(`Kalkulator diskon untuk ${ctx.nombrePais}`, "Kalkulator diskon dan harga akhir", "Kalkulator diskon"),
    description: "Hitung harga setelah diskon dan berapa yang Anda hemat, termasuk diskon bertingkat seperti 30% ditambah diskon lagi 10%.",
    intro: [
      "Masukkan harga dan diskonnya, lalu Anda langsung melihat harga yang dibayar dan jumlah yang dihemat.",
      "Jika promonya memberi diskon tambahan, masukkan juga: dua diskon berturut-turut tidak pernah dijumlahkan begitu saja.",
    ],
    comoSeCalcula: [
      "Harga akhir = harga awal × (1 − diskon ÷ 100).",
      "Diskon tambahan dihitung dari harga yang sudah dipotong diskon pertama.",
      "Penghematan Anda adalah harga awal dikurangi harga akhir.",
    ],
    ejemplo: [
      `Barang seharga ${m(precio)} dengan diskon 25% menjadi ${m(precio * 0.75)}.`,
      `Dengan diskon 30% lalu tambahan 10%, harganya menjadi ${m(precio * 0.7 * 0.9)}: total potongannya 37%, bukan 40%.`,
    ],
    faq: [
      {
        pregunta: "Bagaimana cara menghitung diskon?",
        respuesta: "Kalikan harga dengan persentase diskon, lalu bagi 100. Itulah potongan harganya. Kurangi harga awal dengan potongan itu untuk mendapat harga yang dibayar.",
      },
      {
        pregunta: "Apakah diskon 30% + 10% sama dengan diskon 40%?",
        respuesta: "Tidak. Diskon kedua dihitung dari harga yang sudah turun, jadi total potongannya 37%.",
      },
      {
        pregunta: "Bagaimana cara mencari harga asli dari harga diskon?",
        respuesta: `Bagi harga diskon dengan (1 − diskon ÷ 100). Untuk diskon 25%, bagi dengan ${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "Diskon", definicion: "Persentase potongan dari harga awal." },
      { termino: "Diskon efektif", definicion: "Total persentase yang Anda hemat jika ada lebih dari satu diskon." },
    ],
  };
};
