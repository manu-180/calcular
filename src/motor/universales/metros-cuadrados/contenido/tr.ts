import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "ft" : "m";
  const us = imperial ? "ft²" : "m²";
  const enL = imperial ? area("rectangulo", 16, 12) + area("rectangulo", 10, 6) : area("rectangulo", 5, 4) + area("rectangulo", 3, 2);
  return {
    h1: imperial ? "Fit kare hesaplama" : "Metrekare hesaplama",
    title: imperial
      ? tituloQueEntre(`Fit kare hesaplama ${ctx.nombrePais}`, "Fit kare (ft²) hesaplama", "Fit kare hesaplama")
      : tituloQueEntre(`Metrekare hesaplama ${ctx.nombrePais}: oda ve arsa`, `Metrekare hesaplama ${ctx.nombrePais}`, "Metrekare (m²) hesaplama", "Metrekare hesaplama"),
    description: "Bir odanın, zeminin ya da arsanın alanını hesaplayın: dikdörtgen, üçgen ve daire; en fazla beş şekli birlikte toplayarak.",
    intro: [
      "Bir şekil seçin ve ölçülerini girin. Alan basit bir dikdörtgen değilse parçalara ayırın, hesaplama hepsini toplar.",
      imperial ? "Sonucu metrekare olarak da gösterir." : "Sonucu fit kare olarak da gösterir.",
    ],
    comoSeCalcula: [
      "Dikdörtgen: uzunluk × genişlik.",
      "Üçgen: taban × yükseklik ÷ 2.",
      `Daire: π × yarıçap × yarıçap; yarıçap, çapın yarısıdır. 1 m² = ${n(FT2_POR_M2)} ft².`,
    ],
    ejemplo: [
      imperial
        ? `L biçimindeki bir salon 16 × 12 ft ve 10 × 6 ft ölçülerinde iki dikdörtgene ayrılabilir. Toplam alan: ${n(enL, 0)} ft².`
        : `L biçimindeki bir salon 5 × 4 m ve 3 × 2 m ölçülerinde iki dikdörtgene ayrılabilir. Toplam alan: ${n(enL, 0)} m².`,
      `Çapı 2 ${u} olan yuvarlak bir masanın kapladığı alan: ${n(area("circulo", 2, 0))} ${us}.`,
    ],
    faq: [
      {
        pregunta: imperial ? "Bir odanın fit kare alanı nasıl hesaplanır?" : "Bir odanın metrekaresi nasıl hesaplanır?",
        respuesta: imperial
          ? "Uzunluğu ve genişliği fit olarak ölçüp çarpın. 12 × 10 ft ölçüsündeki bir oda 120 ft² eder."
          : "Uzunluğu ve genişliği metre olarak ölçüp çarpın. 4 × 3 m ölçüsündeki bir oda 12 m² eder.",
      },
      {
        pregunta: "Ölçülerim santimetre ya da inç cinsindense ne yapmalıyım?",
        respuesta: `Önce çevirin: santimetreyi 100'e bölerek metreyi, inçi 12'ye bölerek fiti bulun. 350 cm, ${n(3.5, 1)} m eder.`,
      },
      {
        pregunta: "Metrekare fit kareye nasıl çevrilir?",
        respuesta: `${n(FT2_POR_M2)} ile çarpın. 20 m², ${n(20 * FT2_POR_M2)} ft² eder.`,
      },
    ],
    glosario: [
      { termino: "Metrekare (m²)", definicion: "Her kenarı 1 metre olan bir karenin alanı." },
      { termino: "Fit kare (ft²)", definicion: "Her kenarı 1 fit olan bir karenin alanı." },
    ],
  };
};
