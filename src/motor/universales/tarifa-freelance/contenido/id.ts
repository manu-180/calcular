import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  return {
    h1: "Kalkulator tarif freelance per jam",
    title: tituloQueEntre(`Kalkulator tarif freelance per jam ${ctx.nombrePais}`, `Tarif freelance ${ctx.nombrePais}`, "Kalkulator tarif freelance"),
    description: "Hitung tarif per jam dan per hari sebagai freelancer dari penghasilan yang Anda inginkan, biaya usaha, pajak, hari libur, dan jam yang bisa ditagih.",
    intro: [
      "Kesalahan paling umum freelancer adalah mengambil gaji yang diinginkan sebagai karyawan lalu membaginya dengan 160 jam. Cara itu melupakan pajak, biaya usaha, cuti, dan semua jam yang tidak bisa ditagih.",
      "Kalkulator ini mulai dari penghasilan bersih yang Anda inginkan, lalu menghitung tarif yang perlu Anda pasang untuk mencapainya.",
    ],
    comoSeCalcula: [
      "Tagihan yang dibutuhkan = penghasilan bersih ÷ (1 − tarif pajak) + biaya usaha.",
      "Hari kerja = 52 minggu × hari kerja per minggu − hari libur.",
      "Jam tertagih per tahun = hari kerja × jam tertagih per hari.",
      "Tarif per jam = tagihan yang dibutuhkan ÷ jam tertagih per tahun.",
    ],
    ejemplo: [
      `Untuk penghasilan bersih ${m(ingreso)} per tahun, dengan biaya usaha ${m(gastos)} dan pajak 25%, Anda perlu menagih ${m(r.facturado)}.`,
      `Dengan 30 hari libur dan 25 jam tertagih per minggu, itu berarti ${Math.round(r.horas)} jam per tahun: tarif ${m(r.hora)} per jam atau ${m(r.dia)} per hari.`,
    ],
    faq: [
      {
        pregunta: "Berapa jam per minggu yang bisa ditagih?",
        respuesta:
          "Lebih sedikit dari jam kerja Anda. Mencari klien, membalas email, membuat invoice, dan belajar memakan waktu yang tidak dibayar. Biasanya 20 sampai 30 jam tertagih dari 40 jam kerja.",
      },
      {
        pregunta: "Lebih baik tarif per jam atau per proyek?",
        respuesta: "Keduanya bisa. Walaupun Anda memasang harga per proyek, perkirakan jumlah jamnya lalu kalikan dengan tarif ini agar tidak kurang.",
      },
      {
        pregunta: "Tarif pajak berapa yang sebaiknya dipakai?",
        respuesta:
          "Tergantung negara dan status usaha Anda. Jumlahkan pajak penghasilan dan iuran jaminan sosial. Jika ragu, tanyakan ke konsultan pajak.",
      },
    ],
    glosario: [
      { termino: "Jam tertagih", definicion: "Jam kerja yang Anda tagihkan ke klien." },
      { termino: "Penghasilan bersih", definicion: "Uang yang tersisa setelah pajak dan biaya usaha." },
    ],
  };
};
