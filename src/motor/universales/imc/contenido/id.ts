import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `Orang dengan berat badan 160 lb dan tinggi 5 ft 9 in memiliki BMI ${n((160 * KG_POR_LB) / (m * m))}, yang termasuk berat badan normal.`,
        `Pada tinggi itu, berat badan ideal adalah ${n((18.5 * m * m) / KG_POR_LB)} sampai ${n((24.9 * m * m) / KG_POR_LB)} lb.`,
      ]
    : [
        `Orang dengan berat badan 70 kg dan tinggi ${n(1.75, 2)} m memiliki BMI ${n(70 / (1.75 * 1.75))}, yang termasuk berat badan normal.`,
        `Pada tinggi itu, berat badan ideal adalah ${n(18.5 * 1.75 * 1.75)} sampai ${n(24.9 * 1.75 * 1.75)} kg.`,
      ];
  return {
    h1: "Kalkulator BMI",
    title: tituloQueEntre(`Kalkulator BMI dan berat badan ideal ${ctx.nombrePais}`, `Kalkulator BMI ${ctx.nombrePais}`, "Kalkulator BMI"),
    description: "Hitung indeks massa tubuh (BMI) dari berat dan tinggi badan Anda, lihat kategorinya menurut WHO dan rentang berat badan ideal.",
    intro: [
      "Masukkan berat dan tinggi badan Anda. Anda akan melihat BMI, kategorinya menurut Organisasi Kesehatan Dunia (WHO), dan rentang berat badan ideal untuk tinggi Anda.",
      "Ini panduan umum untuk orang dewasa. Hasilnya tidak menggantikan konsultasi dengan dokter atau tenaga kesehatan.",
    ],
    comoSeCalcula: [
      imperial ? "BMI = berat badan dalam pon × 703 ÷ (tinggi dalam inci × tinggi dalam inci)." : "BMI = berat badan dalam kg ÷ (tinggi dalam meter × tinggi dalam meter).",
      `Di bawah ${n(18.5)} berarti berat badan kurang. ${n(18.5)} sampai ${n(24.9)} berarti normal. 25 sampai ${n(29.9)} berarti berat badan berlebih. 30 ke atas berarti obesitas.`,
      `Rentang berat badan ideal adalah berat yang menghasilkan BMI antara ${n(18.5)} dan ${n(24.9)} pada tinggi badan Anda.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Berapa BMI yang normal?",
        respuesta: `Menurut WHO, BMI normal untuk orang dewasa adalah ${n(18.5)} sampai ${n(24.9)}. Rentangnya sama untuk perempuan dan laki-laki.`,
      },
      {
        pregunta: "Apakah BMI berlaku untuk semua orang?",
        respuesta: "Tidak. BMI tidak membedakan otot dan lemak, sehingga orang yang berotot bisa mendapat angka tinggi. Untuk ibu hamil, anak, dan remaja dipakai cara penilaian lain.",
      },
      {
        pregunta: "Bagaimana cara menghitung BMI secara manual?",
        respuesta: imperial
          ? "Kalikan berat badan dalam pon dengan 703, lalu bagi dengan kuadrat tinggi dalam inci. Untuk 5 ft 9 in, kuadratnya 69 × 69."
          : `Bagi berat badan dalam kg dengan kuadrat tinggi dalam meter. Untuk tinggi ${n(1.7, 2)} m, kuadratnya ${n(1.7, 2)} × ${n(1.7, 2)} = ${n(1.7 * 1.7, 2)}.`,
      },
    ],
    glosario: [
      { termino: "BMI", definicion: "Body mass index atau indeks massa tubuh (IMT): perbandingan berat badan dengan tinggi badan." },
      { termino: "WHO", definicion: "Organisasi Kesehatan Dunia, yang menetapkan kategori BMI untuk orang dewasa." },
    ],
  };
};
