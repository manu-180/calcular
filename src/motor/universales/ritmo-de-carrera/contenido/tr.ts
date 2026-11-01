import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DISTANCIAS_KM, KM_POR_MILLA, reloj, ritmoTexto } from "../definicion";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const imperial = ctx.unidades === "imperial";
  const u = imperial ? "mil" : "kilometre";
  const corto = imperial ? "mi" : "km";
  const media = imperial ? DISTANCIAS_KM.media / KM_POR_MILLA : DISTANCIAS_KM.media;
  const ritmoMedia = imperial ? 9 * 60 : 5 * 60 + 30;
  return {
    h1: "Koşu temposu hesaplama",
    title: tituloQueEntre(`Koşu temposu hesaplama ${ctx.nombrePais}`, "Koşu temposu (pace) hesaplama", "Koşu temposu hesaplama"),
    description: `5K, 10K, yarı maraton ya da maraton için ${u} başına temponuzu, bitiş sürenizi veya koşacağınız mesafeyi hesaplayın.`,
    intro: [
      "Mesafe, süre ve tempodan ikisini girin, üçüncüsünü görün. Bir yarışı planlamak ya da bir antrenmanı kontrol etmek için kullanın.",
      "5K, 10K, yarı maraton ve maraton mesafeleri hazır gelir.",
    ],
    comoSeCalcula: [
      `Tempo = süre ÷ mesafe; ${u} başına dakika ve saniye olarak.`,
      "Süre = tempo × mesafe.",
      "Mesafe = süre ÷ tempo. Ortalama hız, mesafenin saate bölünmesiyle bulunur.",
    ],
    ejemplo: imperial
      ? [
          `27 dakikada 3 mil koşan birinin temposu mil başına 9:00, ortalama hızı ${formatearNumero(ctx, 20 / 3, 2)} mph olur.`,
          `Yarı maratonu (${formatearNumero(ctx, media, 2)} mi) mil başına ${ritmoTexto(ritmoMedia)} tempoyla koşan biri şu sürede bitirir: ${reloj(ritmoMedia * media)}.`,
        ]
      : [
          "50 dakikada 10 km koşan birinin temposu km başına 5:00, ortalama hızı 12 km/h olur.",
          `Yarı maratonu (${formatearNumero(ctx, media, 1)} ${corto}) km başına ${ritmoTexto(ritmoMedia)} tempoyla koşan biri şu sürede bitirir: ${reloj(ritmoMedia * media)}.`,
        ],
    faq: [
      {
        pregunta: `${imperial ? "Mil" : "Kilometre"} başına temponuzu nasıl hesaplarsınız?`,
        respuesta: imperial
          ? `Süreyi dakikaya çevirin ve mil sayısına bölün. 28 dakika 30 saniyede 3 mil, mil başına ${formatearNumero(ctx, 9.5, 1)} dakika, yani 9:30 eder.`
          : `Süreyi dakikaya çevirin ve kilometre sayısına bölün. 55 dakikada 10 km, km başına ${formatearNumero(ctx, 5.5, 1)} dakika, yani 5:30 eder.`,
      },
      {
        pregunta: "Yeni başlayan biri için iyi tempo nedir?",
        respuesta: "Koşarken hâlâ konuşabildiğiniz tempo. Kondisyonunuz arttıkça bu tempo da hızlanır.",
      },
      {
        pregunta: "Maraton kaç kilometredir?",
        respuesta: `${formatearNumero(ctx, DISTANCIAS_KM.maraton, 3)} km (${formatearNumero(ctx, DISTANCIAS_KM.maraton / KM_POR_MILLA, 1)} mil). Yarı maraton bunun yarısıdır.`,
      },
    ],
    glosario: [
      { termino: "Tempo (pace)", definicion: "Bir kilometreyi ya da bir mili koşmak için geçen süre." },
      { termino: "Ortalama hız", definicion: "Bir saatte kat edilen mesafe." },
    ],
  };
};
