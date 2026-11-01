import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: imperial ? "Kalkulator kaki persegi" : "Kalkulator meter persegi",
    title: imperial
      ? tituloQueEntre(`Kalkulator luas kaki persegi ${ctx.nombrePais}`, "Kalkulator kaki persegi")
      : tituloQueEntre(`Kalkulator meter persegi dan luas tanah ${ctx.nombrePais}`, `Kalkulator meter persegi ${ctx.nombrePais}`, "Kalkulator meter persegi"),
    description: "Hitung luas ruangan, lantai, atau tanah: persegi panjang, segitiga, dan lingkaran, hingga lima bidang sekaligus dijumlahkan.",
    intro: [
      "Pilih bentuk dan masukkan ukurannya. Jika ruangannya bukan persegi panjang sederhana, bagi menjadi beberapa bagian dan kalkulator akan menjumlahkannya.",
      imperial ? "Hasilnya juga ditampilkan dalam meter persegi." : "Hasilnya juga ditampilkan dalam kaki persegi (ft²).",
    ],
    comoSeCalcula: [
      "Persegi panjang: panjang × lebar.",
      "Segitiga: alas × tinggi ÷ 2.",
      `Lingkaran: π × jari-jari × jari-jari, dengan jari-jari setengah dari diameter. 1 m² sama dengan ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperial
        ? `Ruang tamu berbentuk L bisa dibagi menjadi persegi panjang 16 × 12 ft dan 10 × 6 ft. Luas totalnya ${n(enL, 0)} ft².`
        : `Ruang tamu berbentuk L bisa dibagi menjadi persegi panjang 5 × 4 m dan 3 × 2 m. Luas totalnya ${n(enL, 0)} m².`,
      `Meja bundar berdiameter 2 ${u} memakan tempat ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: imperial ? "Bagaimana cara menghitung luas ruangan dalam kaki persegi?" : "Bagaimana cara menghitung meter persegi sebuah ruangan?",
        respuesta: imperial
          ? "Ukur panjang dan lebar dalam kaki, lalu kalikan. Ruangan 12 × 10 ft luasnya 120 ft²."
          : "Ukur panjang dan lebar dalam meter, lalu kalikan. Ruangan 4 × 3 m luasnya 12 m².",
      },
      {
        pregunta: "Bagaimana jika ukurannya dalam sentimeter?",
        respuesta: `Ubah dulu ke meter dengan membagi 100. 350 cm sama dengan ${n(3.5, 1)} m. Untuk inci, bagi 12 agar menjadi kaki.`,
      },
      {
        pregunta: "Bagaimana cara mengubah meter persegi ke kaki persegi?",
        respuesta: `Kalikan dengan ${n(FT2_POR_M2)}. 20 m² sama dengan ${n(20 * FT2_POR_M2)} ft².`,
      },
    ],
    glosario: [
      { termino: "Meter persegi (m²)", definicion: "Luas sebuah persegi dengan sisi 1 meter." },
      { termino: "Kaki persegi (ft²)", definicion: "Luas sebuah persegi dengan sisi 1 kaki." },
    ],
  };
};
