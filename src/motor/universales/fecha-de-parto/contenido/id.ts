import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "Kalkulator HPL (hari perkiraan lahir)",
    title: tituloQueEntre(`Kalkulator HPL dan usia kehamilan ${ctx.nombrePais}`, `Kalkulator HPL ${ctx.nombrePais}`, "Kalkulator HPL"),
    description: "Hitung hari perkiraan lahir (HPL) dari HPHT atau tanggal pembuahan, dan lihat usia kehamilan Anda hari ini dalam minggu.",
    intro: [
      "Masukkan hari pertama haid terakhir (HPHT), atau tanggal pembuahan jika Anda mengetahuinya. Anda akan melihat HPL, usia kehamilan, dan trimesternya.",
      "Ini hanya perkiraan. Pemeriksaan dengan dokter atau bidan dan USG memberi tanggal yang paling akurat.",
    ],
    comoSeCalcula: [
      "Perhitungannya memakai rumus Naegele: HPL adalah HPHT ditambah 280 hari (40 minggu).",
      "Jika siklus haid Anda lebih panjang atau lebih pendek dari 28 hari, HPL bergeser sebanyak selisihnya.",
      "Dari tanggal pembuahan, ditambahkan 266 hari (38 minggu).",
      "Usia kehamilan dihitung dari HPHT, bukan dari tanggal pembuahan.",
    ],
    ejemplo: [
      `Dengan HPHT ${f(fum)} dan siklus 28 hari, HPL jatuh pada ${f(fpp)}.`,
      `Dengan siklus 32 hari, HPL bergeser 4 hari menjadi ${f(fpp32)}.`,
    ],
    faq: [
      {
        pregunta: "Bagaimana cara menghitung HPL?",
        respuesta: "Tambahkan 280 hari ke HPHT. Cara cepat yang hasilnya hampir sama: tanggal ditambah 7, bulan dikurangi 3, dan tahun ditambah 1.",
      },
      {
        pregunta: "Mengapa usia kehamilan dihitung dari HPHT?",
        respuesta: "Karena tanggal ini diketahui hampir semua orang. Itu sebabnya pada minggu ke-2 pembuahan sebenarnya belum terjadi.",
      },
      {
        pregunta: "Berapa banyak bayi yang lahir tepat pada HPL?",
        respuesta: "Sedikit. Sebagian besar bayi lahir antara minggu ke-37 dan ke-42, jadi HPL adalah patokan, bukan tanggal pasti.",
      },
    ],
    glosario: [
      { termino: "HPHT", definicion: "Hari pertama haid terakhir: hari pertama keluarnya darah pada haid terakhir." },
      { termino: "Rumus Naegele", definicion: "Cara memperkirakan HPL dengan menambahkan 280 hari ke HPHT." },
    ],
  };
};
