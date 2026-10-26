import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "Tambah hari ke tanggal",
    title: tituloQueEntre(
      `Kalkulator tambah hari ke tanggal untuk ${ctx.nombrePais}`,
      `Tambah hari ke tanggal untuk ${ctx.nombrePais}`,
      "Kalkulator tambah hari ke tanggal",
    ),
    description: "Tambah atau kurangi hari kalender atau hari kerja dari suatu tanggal dan lihat hasilnya jatuh pada hari apa. Praktis untuk tenggat dan jatuh tempo.",
    intro: [
      "Pilih tanggal, jumlah hari, dan apakah ingin ditambah atau dikurangi. Anda akan melihat tanggal hasil dan harinya.",
      "Dengan hari kerja, Sabtu dan Minggu dilewati.",
    ],
    comoSeCalcula: [
      "Dengan hari kalender, tanggal maju satu hari di kalender untuk setiap hari yang Anda masukkan.",
      "Dengan hari kerja, hanya Senin sampai Jumat yang dihitung. Tanggal mulai tidak ikut dihitung.",
      "Hari libur nasional tidak dikurangkan karena berbeda di tiap negara dan daerah.",
    ],
    ejemplo: [`${f(inicio)} ditambah 90 hari kalender adalah ${f(mas90)}.`, `${f(inicio)} ditambah 15 hari kerja adalah ${f(aFecha(habil))}.`],
    faq: [
      {
        pregunta: "Apakah tanggal mulai dihitung sebagai hari pertama?",
        respuesta: "Tidak. Senin ditambah 1 hari menjadi Selasa. Begitulah cara kebanyakan tenggat waktu dihitung.",
      },
      {
        pregunta: "Bagaimana jika saya menambah hari kerja mulai dari hari Sabtu?",
        respuesta: "Hari kerja pertama adalah Senin berikutnya. Sabtu ditambah 1 hari kerja menjadi Senin.",
      },
      {
        pregunta: "Apakah tahun kabisat ikut diperhitungkan?",
        respuesta: "Ya. Jika rentangnya melewati 29 Februari, tanggal itu dihitung sebagai satu hari tambahan.",
      },
    ],
    glosario: [
      { termino: "Hari kalender", definicion: "Semua hari di kalender, tanpa ada yang dilewati." },
      { termino: "Hari kerja", definicion: "Di kalkulator ini, Senin sampai Jumat." },
    ],
  };
};
