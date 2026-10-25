import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  return {
    h1: "Kalkulator dana darurat",
    title: tituloQueEntre(`Kalkulator dana darurat ${ctx.nombrePais}`, `Dana darurat ${ctx.nombrePais}`, "Kalkulator dana darurat"),
    description: "Hitung berapa dana darurat yang ideal dari pengeluaran pokok Anda, dan berapa bulan waktu untuk mengumpulkannya dari tabungan bulanan.",
    intro: [
      "Dana darurat adalah uang cadangan untuk kejadian yang tidak bisa direncanakan: kehilangan pekerjaan, masalah kesehatan, atau perbaikan rumah yang mendesak.",
      "Dengan dana darurat, Anda tidak perlu mengandalkan kartu kredit atau pinjaman saat kondisi sedang sulit. Masukkan pengeluaran pokok dan jumlah bulan yang ingin ditanggung.",
    ],
    comoSeCalcula: [
      "Dana darurat yang disarankan = pengeluaran pokok per bulan × jumlah bulan yang ditanggung.",
      "Kekurangan = dana darurat yang disarankan − dana yang sudah ada.",
      "Bulan sampai terkumpul = kekurangan ÷ tabungan per bulan, dibulatkan ke atas.",
    ],
    ejemplo: [
      `Dengan pengeluaran pokok ${m(gastos)} per bulan, dana darurat untuk 6 bulan adalah ${m(gastos * 6)}.`,
      `Jika Anda menabung ${m(aporte)} per bulan, dana itu terkumpul dalam ${Math.ceil((gastos * 6) / aporte)} bulan.`,
    ],
    faq: [
      {
        pregunta: "Berapa idealnya dana darurat?",
        respuesta:
          "Patokan yang umum adalah 3 sampai 6 kali pengeluaran pokok bulanan. Jika penghasilan Anda tidak tetap, Anda pekerja lepas, atau hanya ada satu sumber penghasilan di rumah, targetkan 6 sampai 12 bulan.",
      },
      {
        pregunta: "Di mana sebaiknya dana darurat disimpan?",
        respuesta:
          "Di tempat yang aman dan bisa dicairkan di hari yang sama, terpisah dari rekening untuk belanja sehari-hari. Dana ini bukan untuk investasi berisiko: tugasnya ada saat Anda membutuhkannya.",
      },
      {
        pregunta: "Lebih dulu mengumpulkan dana darurat atau melunasi utang?",
        respuesta:
          "Cara yang sering dipakai: kumpulkan dulu dana sebesar satu bulan pengeluaran, lalu lunasi utang berbunga tinggi seperti kartu kredit, kemudian lengkapi dana daruratnya.",
      },
    ],
    glosario: [
      { termino: "Pengeluaran pokok", definicion: "Tagihan yang tetap harus dibayar walaupun penghasilan berhenti: tempat tinggal, makan, listrik, kesehatan." },
      { termino: "Likuiditas", definicion: "Seberapa cepat uang bisa dipakai tanpa kehilangan nilainya." },
    ],
  };
};
