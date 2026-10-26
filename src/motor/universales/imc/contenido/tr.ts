import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const m = 69 * M_POR_PULGADA;
  const ejemplo = imperial
    ? [
        `Kilosu 160 lb, boyu 5 ft 9 in olan bir kişinin VKİ değeri: ${n((160 * KG_POR_LB) / (m * m))}. Bu, normal kilo sınıfına girer.`,
        `Bu boyda sağlıklı kilo aralığı ${n((18.5 * m * m) / KG_POR_LB)} lb ile ${n((24.9 * m * m) / KG_POR_LB)} lb arasıdır.`,
      ]
    : [
        `Kilosu 70 kg, boyu ${n(1.75, 2)} m olan bir kişinin VKİ değeri: ${n(70 / (1.75 * 1.75))}. Bu, normal kilo sınıfına girer.`,
        `Bu boyda sağlıklı kilo aralığı ${n(18.5 * 1.75 * 1.75)} kg ile ${n(24.9 * 1.75 * 1.75)} kg arasıdır.`,
      ];
  return {
    h1: "Vücut kitle indeksi hesaplama",
    title: tituloQueEntre(`Vücut kitle indeksi hesaplama ${ctx.nombrePais}`, "Vücut kitle indeksi (VKİ) hesaplama", "VKİ hesaplama"),
    description: "Kilonuz ve boyunuzla vücut kitle indeksinizi hesaplayın. DSÖ sınıfınızı ve boyunuza göre sağlıklı kilo aralığını görün.",
    intro: [
      "Kilonuzu ve boyunuzu girin. VKİ değerinizi, Dünya Sağlık Örgütü'ne göre hangi sınıfa girdiğini ve boyunuz için sağlıklı kilo aralığını görürsünüz.",
      "Yetişkinler için genel bir göstergedir. Bir sağlık uzmanına danışmanın yerini tutmaz.",
    ],
    comoSeCalcula: [
      imperial ? "VKİ = pound cinsinden kilo × 703 ÷ (inç cinsinden boy × inç cinsinden boy)." : "VKİ = kilogram cinsinden kilo ÷ (metre cinsinden boy × metre cinsinden boy).",
      `${n(18.5)} altı zayıf, ${n(18.5)} ile ${n(24.9)} arası normal kilo, 25 ile ${n(29.9)} arası fazla kilolu sayılır. 30 ve üzeri obezitedir.`,
      `Sağlıklı kilo aralığı, boyunuzda VKİ değerini ${n(18.5)} ile ${n(24.9)} arasında tutan kilolardır.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Normal VKİ değeri nedir?",
        respuesta: `Dünya Sağlık Örgütü'ne göre yetişkinlerde ${n(18.5)} ile ${n(24.9)} arası. Aralık kadınlar ve erkekler için aynıdır.`,
      },
      {
        pregunta: "VKİ herkes için geçerli mi?",
        respuesta: "Hayır. Kas ile yağı ayırt etmez; bu yüzden çok kaslı kişilerde yüksek çıkabilir. Gebelikte, çocuklarda ve ergenlerde de farklı şekilde değerlendirilir.",
      },
      {
        pregunta: "VKİ yüksek çıkarsa ne yapmalıyım?",
        respuesta: "Sonucu bir doktorla ya da diyetisyenle konuşun. Bel çevresi, beslenme ve hareket düzeyi gibi başka ölçülerle birlikte değerlendirilmelidir.",
      },
    ],
    glosario: [
      { termino: "VKİ", definicion: "Vücut kitle indeksi: kilonuzun boyunuza oranını gösteren değer." },
      { termino: "DSÖ", definicion: "Dünya Sağlık Örgütü. Yetişkinler için VKİ sınıflarını belirler." },
    ],
  };
};
