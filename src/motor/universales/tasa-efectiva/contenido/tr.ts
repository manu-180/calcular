import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aEfectiva, aNominal } from "../definicion";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const p = (n: number) => `%${formatearNumero(ctx, n, 2)}`;
  return {
    h1: "Efektif faiz hesaplama",
    title: tituloQueEntre(`${ctx.nombrePais} efektif faiz hesaplama: nominal ve efektif`, `${ctx.nombrePais} efektif faiz hesaplama`, "Efektif faiz hesaplama"),
    description: "Yıllık nominal faizi yıllık efektif faize, efektif faizi de nominal faize çevirin. Aylık, üç aylık, altı aylık ya da günlük faiz işletmeyle.",
    intro: [
      "Aynı faiz oranına sahip iki teklif farklı maliyet çıkarabilir. Fark, faizin ne sıklıkla işletildiğindedir.",
      "Yıllık efektif faiz her şeyi aynı ölçüye getirir: bir yılda gerçekte ödediğiniz ya da kazandığınız orandır. Elinizdeki oranı seçin, diğerini biz gösterelim.",
    ],
    comoSeCalcula: [
      "Efektif faiz = (1 + nominal faiz ÷ m) üzeri m, eksi 1. Burada m, yıldaki faiz dönemi sayısıdır: aylıkta 12, üç aylıkta 4.",
      "Nominal faiz = m × ((1 + efektif faiz) üzeri 1 ÷ m, eksi 1).",
      "Dönemlik faiz, nominal faizin m'ye bölünmesiyle bulunur.",
    ],
    ejemplo: [
      `Aylık işleyen yıllık %12 nominal faiz, yıllık efektif olarak ${p(aEfectiva(12, 12))} eder.`,
      `Faiz her ay işliyorsa yıllık %10 efektif faizin nominal karşılığı ${p(aNominal(10, 12))} olur.`,
    ],
    faq: [
      {
        pregunta: "Nominal faiz ile efektif faiz arasındaki fark nedir?",
        respuesta:
          "Nominal faiz, faizin faize eklenmesinden önceki yıllık orandır. Efektif faiz ise faizin de faiz kazanmasının etkisini içerir. Bu yüzden efektif faiz her zaman nominal faize eşit ya da ondan yüksektir.",
      },
      {
        pregunta: "Teklifleri karşılaştırırken hangisini kullanmalıyım?",
        respuesta:
          "Birikimde efektif faizi kullanın, çünkü gerçekte ne kazandığınızı gösterir. Kredide efektif faize ek olarak masraflar dâhil toplam maliyeti de karşılaştırın.",
      },
      {
        pregunta: "Faiz daha sık işlerse efektif oran neden artar?",
        respuesta:
          "Faiz anaparaya daha erken eklenir ve kendisi de faiz kazanmaya başlar. Faiz yılda bir kez işliyorsa nominal ve efektif oran aynıdır.",
      },
    ],
    glosario: [
      { termino: "Nominal faiz", definicion: "Faizin faize eklenmesi hesaba katılmadan önceki yıllık oran." },
      { termino: "Efektif faiz", definicion: "Faizin faize eklenmesi dâhil edilmiş yıllık oran." },
      { termino: "Faiz işletme", definicion: "Faizin anaparaya eklendiği an." },
    ],
  };
};
