import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const n = (x: number) => formatearNumero(ctx, x, Number.isInteger(x) ? 0 : 1);
  const notas = [70, 80, 90];
  const pesos = [20, 30, 50];
  const ponderado = notas.reduce((s, v, i) => s + v * pesos[i], 0) / pesos.reduce((s, p) => s + p, 0);
  const simple = notas.reduce((s, v) => s + v, 0) / notas.length;
  return {
    h1: "Kalkulator rata-rata tertimbang",
    title: tituloQueEntre(
      `Kalkulator rata-rata tertimbang untuk ${ctx.nombrePais}`,
      `Rata-rata tertimbang untuk ${ctx.nombrePais}`,
      "Kalkulator rata-rata tertimbang",
    ),
    description: "Hitung rata-rata nilai Anda, biasa atau tertimbang, dengan hingga 10 nilai dan bobot masing-masing: persentase, SKS, atau jumlah.",
    intro: [
      "Isi setiap nilai dan seberapa besar bobotnya. Anda akan melihat rata-rata tertimbang dan rata-rata biasa di sebelahnya.",
      "Cocok untuk nilai rapor, IPK kuliah, dan rata-rata apa pun yang sebagian nilainya lebih berpengaruh daripada yang lain.",
    ],
    comoSeCalcula: [
      "Rata-rata biasa = jumlah semua nilai ÷ banyaknya nilai.",
      "Rata-rata tertimbang = jumlah (nilai × bobot) ÷ jumlah bobot.",
      "Bobot tidak harus berjumlah 100: hasilnya selalu dibagi total bobot.",
    ],
    ejemplo: [
      `Dengan nilai 70 berbobot 20%, 80 berbobot 30%, dan 90 berbobot 50%, rata-rata tertimbangnya ${n(ponderado)}.`,
      `Rata-rata biasa dari ketiga nilai itu ${n(simple)}: nilai 90 berbobot paling besar sehingga menarik rata-rata tertimbang ke atas.`,
    ],
    faq: [
      {
        pregunta: "Bagaimana cara menghitung rata-rata tertimbang?",
        respuesta: "Kalikan setiap nilai dengan bobotnya, jumlahkan hasilnya, lalu bagi dengan jumlah semua bobot.",
      },
      {
        pregunta: "Bagaimana jika bobotnya tidak berjumlah 100%?",
        respuesta: "Tidak masalah. Jika satu mata kuliah 3 SKS dan yang lain 2 SKS, pakai 3 dan 2. Hasilnya dibagi total bobot.",
      },
      {
        pregunta: "Apa beda rata-rata biasa dan rata-rata tertimbang?",
        respuesta: "Pada rata-rata biasa, setiap nilai dihitung sama. Pada rata-rata tertimbang, setiap nilai dihitung sesuai bobotnya.",
      },
      {
        pregunta: "Apakah bisa dipakai untuk menghitung IPK?",
        respuesta: "Bisa. Isi nilai angka setiap mata kuliah sebagai nilai dan jumlah SKS-nya sebagai bobot.",
      },
    ],
    glosario: [
      { termino: "Bobot", definicion: "Seberapa besar suatu nilai memengaruhi rata-rata akhir." },
      { termino: "Rata-rata tertimbang", definicion: "Rata-rata yang setiap nilainya dikalikan dengan bobotnya." },
    ],
  };
};
