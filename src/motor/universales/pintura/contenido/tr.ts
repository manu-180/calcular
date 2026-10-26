import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const neta = 48 * 8 - 40;
        const gal = (neta * 2) / 350;
        return [
          `Duvarlarının toplam uzunluğu 48 ft, yüksekliği 8 ft olan ve 40 ft² kapı ile pencere alanı bulunan bir odada boyanacak alan: ${n(neta, 0)} ft².`,
          `Galonu 350 ft² kaplayan bir boyayla 2 kat için gereken miktar ${n(gal, 2)} galon. Pay eklendiğinde alınacak miktar ${n(gal * (1 + MARGEN), 2)} galon olur.`,
        ];
      })()
    : (() => {
        const neta = 14 * 2.6 - 4;
        const litros = (neta * 2) / 10;
        return [
          `Duvarlarının toplam uzunluğu 14 m, yüksekliği ${n(2.6)} m olan ve 4 m² kapı ile pencere alanı bulunan bir odada boyanacak alan: ${n(neta)} m².`,
          `Litresi 10 m² kaplayan bir boyayla 2 kat için gereken miktar ${n(litros, 2)} litre. Pay eklendiğinde alınacak miktar ${n(litros * (1 + MARGEN), 2)} litre olur.`,
        ];
      })();
  return {
    h1: "Boya hesaplama",
    title: tituloQueEntre(`Boya hesaplama ${ctx.nombrePais}: kaç litre boya gerekir`, `Boya hesaplama ${ctx.nombrePais}`, "Duvar boyası hesaplama", "Boya hesaplama"),
    description: "Duvarlarınızın ölçüsü, kapı ve pencereler, kat sayısı ve kutudaki sarfiyat değeriyle ne kadar boya gerektiğini hesaplayın.",
    intro: [
      "Duvarların uzunluğunu ve yüksekliğini (ya da doğrudan alanı), kapı ve pencerelerin kapladığı alanı ve kaç kat boya süreceğinizi girin.",
      "İşin ortasında boyanın bitmemesi için %10 pay eklenir.",
    ],
    comoSeCalcula: [
      "Alan = duvarların toplam uzunluğu × yükseklik, eksi kapı ve pencereler.",
      "Boya = alan × kat sayısı ÷ sarfiyat.",
      `Sonuca %${MARGEN * 100} pay eklenir.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Bir litre boya kaç metrekare boyar?",
        respuesta: "İç cephe duvar boyalarının çoğu bir katta litre başına yaklaşık 8 ile 12 m² kaplar (galon başına 350 ile 400 ft²). Kesin değer kutunun üzerinde yazar.",
      },
      {
        pregunta: "Kaç kat boya gerekir?",
        respuesta: "Standart olan iki kattır. Yeni sıva, çok emici duvarlar ya da büyük bir renk değişikliği üçüncü katı gerektirebilir.",
      },
      {
        pregunta: "Kapı ve pencereleri düşmeli miyim?",
        respuesta: "Büyüklerse evet. Küçükleri düşmemek daha iyidir: fazlası kenarları ve köşe dönüşlerini karşılar.",
      },
    ],
    glosario: [
      { termino: "Sarfiyat", definicion: "Bir litre ya da bir galon boyanın tek katta kapladığı alan." },
      { termino: "Kat", definicion: "Duvara sürülen her boya tabakası." },
    ],
  };
};
