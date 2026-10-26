import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionId } from "../../dias-entre-fechas/textos/id";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Kalkulator umur",
    title: tituloQueEntre(`Kalkulator umur untuk ${ctx.nombrePais}`, "Kalkulator umur dari tanggal lahir", "Kalkulator umur"),
    description: "Hitung umur Anda secara tepat dalam tahun, bulan, dan hari, berapa hari Anda telah hidup, dan berapa lama lagi menuju ulang tahun berikutnya.",
    intro: [
      "Masukkan tanggal lahir Anda dan lihat umur tepat Anda hari ini, juga dalam bulan, minggu, dan hari.",
      "Ubah tanggal kedua untuk mengetahui umur seseorang pada tanggal tertentu, atau berapa umurnya nanti.",
    ],
    comoSeCalcula: [
      "Kalkulator menghitung bulan penuh dari tanggal lahir sampai tanggal yang dipilih. Setiap 12 bulan dihitung satu tahun.",
      "Sisa hari setelah bulan penuh terakhir menjadi hari pada umur tersebut.",
      "Tahun kabisat dihitung dengan 366 harinya.",
    ],
    ejemplo: [
      `Seseorang yang lahir pada ${fechaLarga(ctx.locale, nac)} berumur ${duracionId(Math.floor(meses / 12), meses % 12, dias)} pada ${fechaLarga(ctx.locale, ref)}.`,
      `Itu sama dengan ${formatearNumero(ctx, total)} hari.`,
    ],
    faq: [
      {
        pregunta: "Bagaimana cara menghitung umur secara tepat?",
        respuesta: "Hitung tahun penuhnya dulu, lalu bulan penuh sejak ulang tahun terakhir, lalu sisa harinya.",
      },
      {
        pregunta: "Bagaimana dengan orang yang lahir pada 29 Februari?",
        respuesta: "Di tahun yang bukan tahun kabisat, kalkulator ini memakai 28 Februari sebagai hari ulang tahun. Ada aturan yang memakai 1 Maret.",
      },
      {
        pregunta: "Sudah berapa hari saya hidup?",
        respuesta: "Lihat baris “Dalam hari”. Baris itu menghitung setiap hari sejak tanggal lahir sampai tanggal yang dipilih, tanpa menghitung hari terakhir.",
      },
    ],
    glosario: [
      { termino: "Umur", definicion: "Jumlah tahun penuh sejak lahir." },
      { termino: "Tahun kabisat", definicion: "Tahun dengan 366 hari dan tanggal 29 Februari. Datang setiap empat tahun, kecuali beberapa tahun abad." },
    ],
  };
};
