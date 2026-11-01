import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.15;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Kalkulator tip",
    title: tituloQueEntre(`Kalkulator tip untuk ${ctx.nombrePais}`, "Kalkulator tip dan bagi tagihan", "Kalkulator tip"),
    description: "Hitung tip, total tagihan, dan bagian tiap orang jika tagihannya dibagi. Bagian tiap orang bisa dibulatkan ke atas.",
    intro: [
      "Masukkan tagihan, persentase tip, dan jumlah orang yang membayar. Anda akan melihat tip, total, dan bagian tiap orang.",
      "Jika Anda lebih suka angka bulat, bagian tiap orang dibulatkan ke atas dan kelebihannya masuk ke tip.",
    ],
    comoSeCalcula: ["Tip = tagihan × persentase tip ÷ 100.", "Total = tagihan + tip.", "Bagian tiap orang = total dibagi jumlah orang."],
    ejemplo: [
      `Tagihan ${m(cuenta)} dengan tip 15% bertambah ${m(propina)}, sehingga totalnya ${m(cuenta + propina)}.`,
      `Jika dibagi 3 orang, masing-masing membayar ${m((cuenta + propina) / 3)}.`,
    ],
    faq: [
      {
        pregunta: "Berapa tip yang sebaiknya diberikan?",
        respuesta: `Tergantung kebiasaan setempat. Periksa apa yang lazim di ${ctx.nombrePais}, dan apakah tagihannya sudah memuat biaya layanan (service charge).`,
      },
      {
        pregunta: "Tip dihitung dari harga sebelum atau sesudah pajak?",
        respuesta: "Kebanyakan orang menghitung tip dari total yang tertera di tagihan. Jika Anda ingin menghitungnya dari harga sebelum pajak, masukkan angka itu.",
      },
      {
        pregunta: "Bagaimana cara cepat menghitung tip 15%?",
        respuesta: "Bagi tagihan dengan 10 untuk mendapat 10%, lalu tambahkan setengahnya. Dari 40, hasilnya 4 ditambah 2, yaitu 6.",
      },
    ],
    glosario: [
      { termino: "Tip", definicion: "Uang tambahan di luar harga yang Anda berikan untuk pelayanan." },
      { termino: "Biaya layanan", definicion: "Biaya yang sudah ditambahkan oleh tempat usaha ke dalam tagihan untuk pelayanan." },
    ],
  };
};
