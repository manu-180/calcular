import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const basal = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
        return [
          `Kilosu 180 lb, boyu 5 ft 10 in olan 35 yaşında bir erkeğin bazal metabolizma hızı yaklaşık ${n(basal)} kcal.`,
          `Az hareket eden bu kişi kilosunu günde yaklaşık ${n(basal * FACTORES.sedentaria)} kcal ile korur.`,
        ];
      })()
    : (() => {
        const basal = mifflin("mujer", 30, 60, 165);
        return [
          `Kilosu 60 kg, boyu 165 cm olan 30 yaşında bir kadının bazal metabolizma hızı yaklaşık ${n(basal)} kcal.`,
          `Orta düzeyde hareket eden bu kişi kilosunu günde yaklaşık ${n(basal * FACTORES.moderada)} kcal ile korur.`,
        ];
      })();
  return {
    h1: "Günlük kalori ihtiyacı hesaplama",
    title: tituloQueEntre(`Günlük kalori ihtiyacı hesaplama ${ctx.nombrePais}`, "Günlük kalori ihtiyacı hesaplama", "Kalori ihtiyacı hesaplama"),
    description: "Yaşınız, kilonuz, boyunuz ve hareket düzeyinizle günde kaç kalori harcadığınızı ve kilo korumak, vermek ya da almak için ne kadar yemeniz gerektiğini görün.",
    intro: [
      "Bilgilerinizi ve hareket düzeyinizi girin. Bazal metabolizma hızınızı ve sıradan bir günde harcadığınız kaloriyi görürsünüz.",
      "Bu kaba bir tahmindir. Bir sağlık ya da beslenme uzmanına danışmanın yerini tutmaz.",
    ],
    comoSeCalcula: [
      `Bazal metabolizma hızı (Mifflin-St Jeor): 10 × kg cinsinden kilo + ${n(6.25, 2)} × cm cinsinden boy − 5 × yaş; erkeklerde 5 eklenir, kadınlarda 161 çıkarılır.`,
      `Koruma kalorisi = bazal metabolizma hızı × hareket katsayısı. Katsayı ${n(1.2, 1)} (az hareket) ile ${n(1.9, 1)} (çok yüksek) arasındadır.`,
      `Kilo vermek için günde ${DEFICIT} kcal düşülür, almak için ${SUPERAVIT} kcal eklenir: ölçülü ve sürdürülebilir bir değişiklik.`,
    ],
    ejemplo,
    faq: [
      {
        pregunta: "Bazal metabolizma hızı nedir?",
        respuesta: "Vücudunuzun tam dinlenme hâlinde nefes almak, ısısını korumak ve organlarını çalıştırmak için harcadığı enerjidir.",
      },
      {
        pregunta: "Kilo vermek için kaç kalori almalıyım?",
        respuesta: `Yaygın bir başlangıç noktası, koruma kalorisinin günde yaklaşık ${DEFICIT} kcal altıdır. Bunu bir uzmanla birlikte belirlemeniz en iyisidir.`,
      },
      {
        pregunta: "Formül ne kadar doğru?",
        respuesta: "Mifflin-St Jeor en yaygın kullanılan formüllerden biridir, ancak ortalama bir değer verir. Genetik yapı, kas kütlesi ve sağlık durumu gerçekte harcadığınızı değiştirir.",
      },
    ],
    glosario: [
      { termino: "Kalori (kcal)", definicion: "Besinlerdeki ve vücudunuzun harcadığı enerjinin birimi." },
      { termino: "Bazal metabolizma hızı", definicion: "Vücudunuzun tam dinlenme hâlinde harcadığı kalori." },
    ],
  };
};
