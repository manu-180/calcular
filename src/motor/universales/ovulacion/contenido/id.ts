import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "Kalkulator masa subur",
    title: tituloQueEntre(`Kalkulator masa subur dan ovulasi ${ctx.nombrePais}`, `Kalkulator masa subur ${ctx.nombrePais}`, "Kalkulator masa subur"),
    description: "Hitung perkiraan hari ovulasi, masa subur, dan tanggal haid berikutnya, lengkap dengan jadwal untuk tiga siklus ke depan.",
    intro: [
      "Masukkan hari pertama haid terakhir dan panjang siklus Anda. Anda akan melihat perkiraan ovulasi, hari-hari subur, dan haid berikutnya.",
      "Ini perkiraan untuk siklus yang teratur. Kalkulator ini bukan metode kontrasepsi dan tidak menggantikan konsultasi dengan dokter atau bidan.",
    ],
    comoSeCalcula: [
      `Ovulasi biasanya terjadi ${FASE_LUTEA} hari sebelum haid berikutnya: HPHT + panjang siklus − ${FASE_LUTEA}.`,
      "Masa subur berlangsung dari 5 hari sebelum ovulasi sampai sehari sesudahnya, karena sperma bisa bertahan hingga 5 hari.",
      "Haid berikutnya diperkirakan datang satu siklus setelah haid terakhir.",
    ],
    ejemplo: [
      `Dengan HPHT ${f(fum)} dan siklus 28 hari, perkiraan ovulasi jatuh pada ${f(aFecha(v.ovulacion))}.`,
      `Masa subur berlangsung dari ${f(aFecha(v.desde))} sampai ${f(aFecha(v.hasta))}, dan haid berikutnya diperkirakan pada ${f(aFecha(v.proxima))}.`,
    ],
    faq: [
      {
        pregunta: "Kapan hari paling subur?",
        respuesta: "Dua atau tiga hari sebelum ovulasi dan hari ovulasi itu sendiri. Seluruh masa subur berlangsung sekitar 6 hari.",
      },
      {
        pregunta: "Apakah tetap bisa dipakai jika siklus haid tidak teratur?",
        respuesta: "Bisa sebagai gambaran, tetapi kurang tepat. Pada siklus yang tidak teratur, ovulasi bisa bergeser beberapa hari dari bulan ke bulan.",
      },
      {
        pregunta: "Apakah kalkulator ini bisa dipakai untuk menunda kehamilan?",
        respuesta: "Tidak. Perkiraannya kasar dan ovulasi bisa maju atau mundur. Untuk mencegah kehamilan, gunakan metode kontrasepsi dan konsultasikan dengan dokter atau bidan.",
      },
    ],
    glosario: [
      { termino: "Ovulasi", definicion: "Saat indung telur melepaskan sel telur." },
      { termino: "Masa subur", definicion: "Hari-hari dalam siklus ketika kehamilan bisa terjadi." },
    ],
  };
};
