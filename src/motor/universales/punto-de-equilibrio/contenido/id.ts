import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "Kalkulator BEP (titik impas)",
    title: tituloQueEntre(`Kalkulator BEP (titik impas) ${ctx.nombrePais}`, `Kalkulator BEP ${ctx.nombrePais}`, "Kalkulator BEP (titik impas)"),
    description: "Hitung berapa unit yang harus terjual dan berapa omzet per bulan untuk menutup semua biaya usaha, serta untuk mencapai target laba Anda.",
    intro: [
      "Break even point (BEP) atau titik impas adalah tingkat penjualan saat usaha tidak untung dan tidak rugi. Di bawahnya Anda rugi, di atasnya mulai untung.",
      "Masukkan biaya tetap, harga jual, dan biaya per unit. Kami hitung berapa yang harus dijual untuk menutup biaya dan untuk mencapai target Anda.",
    ],
    comoSeCalcula: [
      "Margin kontribusi = harga jual − biaya variabel per unit.",
      "BEP unit = biaya tetap ÷ margin kontribusi, dibulatkan ke atas.",
      "BEP rupiah = biaya tetap ÷ (margin kontribusi ÷ harga jual).",
      "Untuk target laba, tambahkan target itu ke biaya tetap, lalu hitung dengan cara yang sama.",
    ],
    ejemplo: [
      `Dengan biaya tetap ${m(fijos)}, harga jual ${m(precio)}, dan biaya variabel ${m(variable)}, setiap penjualan menyisakan ${m(precio - variable)}.`,
      `Anda perlu menjual ${formatearNumero(ctx, base.unidades)} unit (${m(base.facturacion)}) untuk menutup biaya, dan ${formatearNumero(ctx, meta.unidades)} unit untuk laba ${m(objetivo)} per bulan.`,
    ],
    faq: [
      {
        pregunta: "Apa itu biaya tetap dan biaya variabel?",
        respuesta:
          "Biaya tetap tidak berubah walaupun tidak ada penjualan: sewa, gaji tetap, listrik. Biaya variabel naik seiring penjualan: stok, bahan baku, komisi, ongkos kirim.",
      },
      {
        pregunta: "Bagaimana cara menurunkan BEP?",
        respuesta: "Ada tiga cara: menaikkan harga jual, menekan biaya variabel per unit, atau mengurangi biaya tetap. Harga jual biasanya paling berpengaruh.",
      },
      {
        pregunta: "Apakah bisa dipakai untuk usaha jasa?",
        respuesta: "Bisa. Satu unit dapat berupa satu jam, satu sesi, atau satu klien per bulan. Masukkan biaya untuk memberikan setiap layanan sebagai biaya variabel.",
      },
    ],
    glosario: [
      { termino: "BEP (titik impas)", definicion: "Tingkat penjualan saat pendapatan sama dengan seluruh biaya." },
      { termino: "Margin kontribusi", definicion: "Sisa dari setiap penjualan untuk menutup biaya tetap." },
    ],
  };
};
