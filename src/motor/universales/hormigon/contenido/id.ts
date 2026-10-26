import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

export const contenidoId: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const ft3 = 10 * 10 * (4 / 12);
        return [
          `Lantai 10 × 10 ft dengan tebal 4 in membutuhkan ${n(ft3)} ft³ beton, atau ${n(ft3 / 27)} yard kubik.`,
          `Dengan campuran acuan, semennya sekitar ${n((MEZCLA.cementoKg * ft3 * 0.0283168466) / 0.45359237, 0)} lb.`,
        ];
      })()
    : (() => {
        const volumen = 4 * 3 * 0.1;
        return [
          `Pelat lantai 4 × 3 m dengan tebal 10 cm membutuhkan ${n(volumen, 1)} m³ beton.`,
          `Dengan campuran acuan, kebutuhannya sekitar ${n(MEZCLA.cementoKg * volumen, 0)} kg semen, ${n(MEZCLA.arenaM3 * volumen)} m³ pasir, dan ${n(MEZCLA.piedraM3 * volumen)} m³ kerikil.`,
        ];
      })();
  return {
    h1: "Kalkulator beton",
    title: tituloQueEntre(`Kalkulator beton dan kebutuhan semen ${ctx.nombrePais}`, `Kalkulator beton ${ctx.nombrePais}`, "Kalkulator beton"),
    description: `Hitung volume beton untuk cor lantai atau dak dalam ${imperial ? "yard kubik" : "meter kubik"}, beserta perkiraan semen, pasir, dan kerikil yang perlu dibeli.`,
    intro: [
      "Masukkan panjang, lebar, dan tebal. Anda akan melihat volume beton dan perkiraan material untuk adukannya.",
      "Kebutuhan material bergantung pada campuran. Kalkulator ini memakai campuran umum 1:2:3 sebagai acuan.",
    ],
    comoSeCalcula: [
      imperial ? "Volume = panjang × lebar × tebal, dengan tebal dalam kaki. Bagi kaki kubik dengan 27 untuk mendapat yard kubik." : "Volume = panjang × lebar × tebal, dengan tebal dalam meter.",
      "Lalu ditambah cadangan untuk permukaan yang tidak rata dan adukan yang tumpah.",
      `Per m³: sekitar ${MEZCLA.cementoKg} kg semen, ${n(MEZCLA.arenaM3)} m³ pasir, ${n(MEZCLA.piedraM3, 1)} m³ kerikil, dan ${MEZCLA.aguaL} liter air.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Berapa sak semen untuk 1 kubik beton?",
        respuesta: `Dengan campuran 1:2:3, sekitar ${MEZCLA.cementoKg} kg semen per m³, atau ${n(MEZCLA.cementoKg / 50, 0)} sak isi 50 kg. Beton dengan mutu lebih tinggi butuh semen lebih banyak.`,
      },
      {
        pregunta: "Bagaimana cara menghitung kubikasi beton?",
        respuesta: `Kalikan panjang, lebar, dan tebal dalam meter. Pelat 5 × 4 m dengan tebal 12 cm berarti 5 × 4 × ${n(0.12)} = ${n(5 * 4 * 0.12, 1)} m³.`,
      },
      {
        pregunta: "Lebih baik pakai beton ready mix atau aduk sendiri?",
        respuesta: "Untuk pengecoran besar, ready mix biasanya lebih seragam dan lebih cepat. Untuk pekerjaan kecil, mengaduk sendiri dengan takaran ini masih umum dilakukan.",
      },
    ],
    glosario: [
      { termino: "Campuran beton", definicion: "Perbandingan semen, pasir, kerikil, dan air dalam satu adukan." },
      { termino: "Kubik (m³)", definicion: "Volume kubus dengan sisi 1 meter. Beton ready mix biasanya dijual per kubik." },
    ],
  };
};
