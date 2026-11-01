import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  return {
    h1: "Kalkulator selisih tanggal",
    title: tituloQueEntre(
      `Kalkulator selisih tanggal untuk ${ctx.nombrePais}`,
      "Hitung jumlah hari antara dua tanggal",
      "Kalkulator selisih tanggal",
    ),
    description: "Hitung jumlah hari antara dua tanggal: hari kalender, minggu, bulan, dan hari kerja dari Senin sampai Jumat.",
    intro: [
      "Pilih tanggal mulai dan tanggal akhir. Anda akan melihat jumlah hari kalender, rentang yang sama dalam minggu dan bulan, serta jumlah hari kerja.",
      "Gunakan untuk tenggat waktu, jatuh tempo, cuti, kehamilan, atau hitung mundur.",
    ],
    comoSeCalcula: [
      "Hari kalender adalah semua hari di antara dua tanggal. Tanggal mulai ikut dihitung dan tanggal akhir tidak, kecuali Anda mencentang opsinya.",
      "Hari kerja adalah hari Senin sampai Jumat dalam rentang yang sama. Hari libur nasional tidak dikurangkan.",
      "Tahun kabisat dihitung dengan tanggal 29 Februari.",
    ],
    ejemplo: [
      `Dari ${f(desde)} sampai ${f(hasta)} ada ${formatearNumero(ctx, dias)} hari kalender.`,
      `Dari jumlah itu, ${formatearNumero(ctx, habiles)} hari jatuh pada Senin sampai Jumat.`,
    ],
    faq: [
      {
        pregunta: "Apakah hari pertama atau hari terakhir ikut dihitung?",
        respuesta: "Secara bawaan, hari pertama dihitung dan hari terakhir tidak, sama seperti saat mengurangkan dua tanggal. Jika keduanya perlu dihitung, centang “Hitung juga tanggal akhir”.",
      },
      {
        pregunta: "Apakah hari kerja sudah dikurangi hari libur nasional?",
        respuesta: "Belum. Hari kerja dihitung dari Senin sampai Jumat. Hari libur berbeda menurut negara, daerah, dan tahun, jadi kurangi secara terpisah.",
      },
      {
        pregunta: "Ada berapa hari dalam setahun?",
        respuesta: "365 hari, atau 366 hari pada tahun kabisat. Karena itu, dua tanggal yang sama di tahun berbeda bisa berselisih jumlah hari yang berbeda.",
      },
    ],
    glosario: [
      { termino: "Hari kalender", definicion: "Semua hari di kalender, termasuk akhir pekan dan hari libur." },
      { termino: "Hari kerja", definicion: "Di kalkulator ini, Senin sampai Jumat." },
    ],
  };
};
