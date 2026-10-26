import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "Kalkulator jam kerja",
    title: tituloQueEntre(`Kalkulator jam kerja dan lembur ${ctx.nombrePais}`, `Kalkulator jam kerja ${ctx.nombrePais}`, "Kalkulator jam kerja"),
    description: "Jumlahkan jam kerja Anda minggu ini dari jam masuk, jam pulang, dan istirahat, lalu hitung upahnya termasuk lembur.",
    intro: [
      "Pilih jam masuk dan jam pulang setiap hari, waktu istirahat yang tidak dibayar, dan upah per jam. Kami tampilkan total jam, jam lembur, dan upah Anda minggu ini.",
      "Gunakan untuk memeriksa slip gaji, mengisi timesheet, atau menagih pekerjaan yang dibayar per jam.",
    ],
    comoSeCalcula: [
      "Jam per hari = jam pulang − jam masuk − istirahat. Jika jam pulang lebih awal dari jam masuk, shift berakhir keesokan harinya.",
      "Jam lembur = total seminggu − jam normal, jika totalnya melebihi jam normal.",
      "Upah = jam normal × upah per jam + jam lembur × upah per jam × (1 + tambahan lembur).",
    ],
    ejemplo: [
      `Dari ${hora("09:00")} sampai ${hora("17:30")} dengan istirahat 30 menit berarti ${n(jornada)} jam per hari. Senin sampai Jumat, ${n(jornada * 5)} jam: dengan upah ${m(pago)} per jam, totalnya ${m(jornada * 5 * pago)}.`,
      `Dari ${hora("08:00")} sampai ${hora("18:00")} dengan istirahat satu jam berarti ${n(larga * 5)} jam seminggu: ${n(extra)} jam di antaranya lembur. Dengan tarif 1,5 kali, upahnya ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "Bagaimana cara menghitung jam kerja?",
        respuesta: "Kurangi jam pulang dengan jam masuk, lalu kurangi waktu istirahat. Setelah itu jumlahkan semua hari dalam seminggu.",
      },
      {
        pregunta: "Bagaimana mengubah menit menjadi jam desimal?",
        respuesta: `Bagi menitnya dengan 60. Setengah jam sama dengan ${n(0.5, 1)}; 15 menit, ${n(0.25, 2)}; 45 menit, ${n(0.75, 2)}. Jadi 7 jam 45 menit sama dengan ${n(7.75, 2)} jam.`,
      },
      {
        pregunta: "Berapa batas jam lembur dan bagaimana upahnya dihitung?",
        respuesta:
          "Itu bergantung pada peraturan ketenagakerjaan tempat Anda bekerja dan kontrak kerja Anda. Kalkulator ini memakai tambahan lembur dan jam normal yang Anda masukkan, tanpa menerapkan aturan tertentu.",
      },
    ],
    glosario: [
      { termino: "Lembur", definicion: "Jam kerja di luar jam kerja normal, dibayar dengan tarif lebih tinggi." },
      { termino: "Upah per jam", definicion: "Upah untuk setiap jam kerja normal." },
    ],
  };
};
