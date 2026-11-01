import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `Laki-laki berusia 35 tahun dengan berat 180 lb dan tinggi 5 ft 10 in memiliki laju metabolisme basal sekitar ${n(basal)} kkal.`,
          `Dengan aktivitas yang sedikit, berat badannya terjaga dengan sekitar ${n(basal * FACTORES.sedentaria)} kkal per hari.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `Perempuan berusia 30 tahun dengan berat 60 kg dan tinggi 165 cm memiliki laju metabolisme basal sekitar ${n(basal)} kkal.`,
          `Dengan aktivitas sedang, berat badannya terjaga dengan sekitar ${n(basal * FACTORES.moderada)} kkal per hari.`,
        ];
      })();
  return {
    h1: "Kalkulator kalori harian",
    title: tituloQueEntre(`Kalkulator kalori harian ${ctx.nombrePais}`, `Kalkulator kalori ${ctx.nombrePais}`, "Kalkulator kalori"),
    description: "Hitung kebutuhan kalori harian dari usia, berat, tinggi, dan aktivitas Anda, untuk menjaga, menurunkan, atau menaikkan berat badan.",
    intro: [
      "Isi data dan tingkat aktivitas Anda. Anda akan melihat laju metabolisme basal dan kalori yang dibakar pada hari biasa.",
      "Ini perkiraan kasar. Hasilnya tidak menggantikan konsultasi dengan dokter atau ahli gizi.",
    ],
    comoSeCalcula: [
      `Laju metabolisme basal (Mifflin-St Jeor): 10 × berat dalam kg + ${n(6.25, 2)} × tinggi dalam cm − 5 × usia, ditambah 5 untuk laki-laki atau dikurangi 161 untuk perempuan.`,
      `Kalori pemeliharaan = metabolisme basal × faktor aktivitas, mulai dari ${n(1.2, 1)} (sedikit aktivitas) sampai ${n(1.9, 1)} (sangat tinggi).`,
      `Untuk turun berat badan dikurangi ${DEFICIT} kkal per hari, dan untuk naik ditambah ${SUPERAVIT} kkal. Perubahan ini moderat dan bisa dijalani dalam jangka panjang.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Apa itu laju metabolisme basal (BMR)?",
        respuesta: "BMR adalah energi yang dipakai tubuh saat benar-benar beristirahat, untuk bernapas, menjaga suhu tubuh, dan menjalankan fungsi organ.",
      },
      {
        pregunta: "Berapa kalori yang perlu dimakan untuk diet?",
        respuesta: `Titik awal yang umum adalah sekitar ${DEFICIT} kkal per hari di bawah kalori pemeliharaan. Sebaiknya angkanya ditentukan bersama dokter atau ahli gizi.`,
      },
      {
        pregunta: "Seberapa akurat rumus ini?",
        respuesta: "Mifflin-St Jeor termasuk rumus yang paling banyak dipakai, tetapi hasilnya rata-rata. Faktor genetik, massa otot, dan kondisi kesehatan memengaruhi kalori yang benar-benar dibakar.",
      },
    ],
    glosario: [
      { termino: "Kalori (kkal)", definicion: "Satuan energi dalam makanan dan dalam energi yang dibakar tubuh." },
      { termino: "Metabolisme basal", definicion: "Kalori yang dibakar tubuh saat benar-benar beristirahat." },
    ],
  };
};
