import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhMes = (1000 * 4 * 30) / 1000;
  return {
    h1: "Kalkulator listrik",
    title: tituloQueEntre(`Kalkulator biaya listrik per bulan ${ctx.nombrePais}`, `Kalkulator listrik ${ctx.nombrePais}`, "Kalkulator listrik"),
    description: "Hitung pemakaian dan biaya listrik sebuah alat per hari, bulan, dan tahun dari dayanya (watt), lama pemakaian, dan tarif per kWh.",
    intro: [
      "Masukkan daya alat listrik, berapa jam Anda memakainya, dan tarif per kWh dari tagihan Anda. Anda akan melihat pemakaian energi dan biayanya.",
      "Gunakan untuk mengetahui alat mana yang paling membebani tagihan: AC, pemanas air, kulkas, atau komputer.",
    ],
    comoSeCalcula: [
      "kWh per hari = watt × jam pemakaian ÷ 1000.",
      "kWh per bulan = kWh per hari × hari pemakaian. Untuk setahun, angka bulanan dikali 12.",
      "Biaya = kWh × tarif per kWh.",
    ],
    ejemplo: [
      `Alat 1000 watt yang dipakai 4 jam sehari menghabiskan 4 kWh per hari dan ${formatearNumero(ctx, kwhMes)} kWh per bulan.`,
      `Dengan tarif ${m(precio)} per kWh, biayanya ${m(kwhMes * precio)} per bulan.`,
    ],
    faq: [
      {
        pregunta: "Apa itu kWh?",
        respuesta: "Kilowatt jam (kWh) adalah energi yang dipakai alat 1000 watt yang menyala selama satu jam. Satuan inilah yang tertera di tagihan listrik dan token.",
      },
      {
        pregunta: "Apakah kulkas menyala dengan daya penuh sepanjang hari?",
        respuesta: "Tidak. Kompresornya menyala dan mati bergantian. Untuk alat seperti itu, isi sekitar 8 sampai 10 jam per hari, bukan 24.",
      },
      {
        pregunta: "Mengapa hasilnya tidak sama persis dengan tagihan saya?",
        respuesta: "Tagihan bisa ditambah biaya tetap, pajak, atau tarif yang berbeda per golongan. Kalkulator ini hanya menunjukkan pemakaian alat tersebut.",
      },
    ],
    glosario: [
      { termino: "Watt (W)", definicion: "Satuan daya: berapa banyak energi yang dipakai alat setiap detik." },
      { termino: "Kilowatt jam (kWh)", definicion: "1000 watt selama satu jam. Inilah yang Anda bayar di tagihan listrik." },
    ],
  };
};
