import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "mil" : "km";
  const corto = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "Kalkulator pace lari",
    title: tituloQueEntre(`Kalkulator pace lari 5K, 10K, dan maraton ${ctx.nombrePais}`, `Kalkulator pace lari ${ctx.nombrePais}`, "Kalkulator pace lari"),
    description: `Hitung pace lari per ${u}, waktu tempuh, atau jarak untuk lomba 5K, 10K, half marathon, dan maraton.`,
    intro: [
      "Dengan dua dari tiga angka (jarak, waktu, dan pace), Anda mendapatkan angka ketiga. Gunakan untuk merencanakan lomba atau mengecek latihan.",
      "Jarak 5K, 10K, half marathon, dan maraton sudah tersedia.",
    ],
    comoSeCalcula: [
      `Pace = waktu ÷ jarak, dalam menit dan detik per ${u}.`,
      "Waktu = pace × jarak.",
      "Jarak = waktu ÷ pace. Kecepatan rata-rata adalah jarak dibagi jumlah jam.",
    ],
    ejemplo: imperial
      ? [
          `3 mil dalam 27 menit berarti pace 9:00 per mil, dengan kecepatan ${formatearNumero(ctx, 20 / 3, 2)} mph.`,
          `Half marathon (${formatearNumero(ctx, media, 2)} mi) dengan pace ${ritmoTexto(ritmoMedia)} per mil selesai dalam ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          `10 km dalam 50 menit berarti pace 5:00 per km, dengan kecepatan ${formatearNumero(ctx, 12, 0)} km/jam.`,
          `Half marathon (${formatearNumero(ctx, media, 1)} ${corto}) dengan pace ${ritmoTexto(ritmoMedia)} per km selesai dalam ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `Bagaimana cara menghitung pace lari per ${u}?`,
        respuesta: imperial
          ? `Ubah waktu ke menit, lalu bagi dengan jumlah mil. 3 mil dalam 28 menit 30 detik berarti ${formatearNumero(ctx, 9.5, 1)} menit per mil, atau 9:30.`
          : `Ubah waktu ke menit, lalu bagi dengan jumlah kilometer. 10 km dalam 55 menit berarti ${formatearNumero(ctx, 5.5, 1)} menit per km, atau 5:30.`,
      },
      {
        pregunta: "Berapa pace lari yang baik untuk pemula?",
        respuesta: "Pace yang masih memungkinkan Anda berbicara sambil berlari. Pace itu akan makin cepat seiring kebugaran Anda meningkat.",
      },
      {
        pregunta: "Berapa jarak maraton?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} km (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} mil). Half marathon setengahnya.`,
      },
    ],
    glosario: [
      { termino: "Pace", definicion: "Waktu yang dibutuhkan untuk menempuh satu kilometer atau satu mil." },
      { termino: "Kecepatan rata-rata", definicion: "Jarak yang ditempuh dalam satu jam." },
    ],
  };
};
