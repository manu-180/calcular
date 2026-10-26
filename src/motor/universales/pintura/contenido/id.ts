import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        return [
          `Ruangan dengan dinding sepanjang 48 ft, tinggi 8 ft, dan pintu serta jendela seluas 40 ft² memiliki ${n(neta, 0)} ft² yang perlu dicat.`,
          `Dengan 2 lapis dan cat yang daya sebarnya 350 ft² per galon, Anda butuh ${n(gal, 2)} galon. Dengan cadangan, ${n(gal * (1 + MARGEN), 2)} galon.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        return [
          `Ruangan dengan dinding sepanjang 14 m, tinggi ${n(2.6)} m, dan pintu serta jendela seluas 4 m² memiliki ${n(neta)} m² yang perlu dicat.`,
          `Dengan 2 lapis dan cat yang daya sebarnya 10 m² per liter, Anda butuh ${n(litros, 2)} liter. Dengan cadangan, ${n(litros * (1 + MARGEN), 2)} liter.`,
        ];
      })();
  return {
    h1: "Kalkulator cat tembok",
    title: tituloQueEntre(`Kalkulator kebutuhan cat tembok ${ctx.nombrePais}`, `Kalkulator cat tembok ${ctx.nombrePais}`, "Kalkulator cat tembok"),
    description: "Hitung kebutuhan cat tembok dari ukuran dinding, pintu dan jendela, jumlah lapisan, dan daya sebar cat yang tertera di kaleng.",
    intro: [
      "Masukkan panjang dan tinggi dinding (atau langsung luasnya), luas pintu dan jendela, serta berapa lapis cat yang akan Anda pakai.",
      "Hasilnya sudah ditambah cadangan 10% supaya cat tidak habis di tengah pekerjaan.",
    ],
    comoSeCalcula: [
      "Luas = panjang total dinding × tinggi, dikurangi pintu dan jendela.",
      "Kebutuhan cat = luas × jumlah lapis ÷ daya sebar.",
      `Setelah itu ditambah cadangan ${MARGEN * 100}%.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Satu liter cat tembok bisa untuk berapa meter persegi?",
        respuesta: "Cat tembok interior umumnya menutup sekitar 8 sampai 12 m² per liter untuk satu lapis. Angka pastinya tertera di kaleng.",
      },
      {
        pregunta: "Berapa lapis cat yang dibutuhkan?",
        respuesta: "Dua lapis adalah standar. Dinding plesteran baru, dinding yang sangat menyerap, atau perubahan warna yang jauh bisa butuh lapis ketiga.",
      },
      {
        pregunta: "Apakah pintu dan jendela perlu dikurangi?",
        respuesta: "Ya, jika ukurannya besar. Yang kecil sebaiknya tidak dikurangi, karena sisanya terpakai untuk tepi dan sudut.",
      },
    ],
    glosario: [
      { termino: "Daya sebar", definicion: "Luas yang bisa ditutup satu liter atau satu galon cat dalam satu lapis." },
      { termino: "Lapis", definicion: "Setiap lapisan cat yang dioleskan ke dinding." },
    ],
  };
};
