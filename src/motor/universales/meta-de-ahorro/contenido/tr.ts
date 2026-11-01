import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aporteNecesario } from "../definicion";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const meta = montoEjemplo(ctx, 10000);
  const actual = montoEjemplo(ctx, 1000);
  return {
    h1: "Birikim hesaplama",
    title: tituloQueEntre(`${ctx.nombrePais} birikim hesaplama: aylık ne kadar?`, `${ctx.nombrePais} birikim hesaplama`, "Birikim hesaplama"),
    description: "Hedeflediğiniz tutara zamanında ulaşmak için her ay ne kadar biriktirmeniz gerektiğini hesaplayın; elinizdeki birikim ve getirisiyle birlikte.",
    intro: [
      "Bir tatil, bir araba, ev için peşinat ya da sürprizlere karşı bir yastık. Tutarı ve tarihi belli bir hedefe ulaşmak çok daha kolaydır.",
      "Ne kadar biriktirmek istediğinizi ve kaç ayda ulaşmak istediğinizi girin. Her ay ve her hafta ne kadar ayırmanız gerektiğini söyleyelim.",
    ],
    comoSeCalcula: [
      "Önce elinizdeki birikimin dönem sonunda ne kadar büyüyeceği hesaplanır.",
      "Hedefe kalan tutar eşit aylık birikimlere bölünür.",
      "Birikiminiz faiz kazanıyorsa her aylık birikim de faiz kazanır. Bu yüzden biraz daha az yatırmanız yeterli olur.",
    ],
    ejemplo: [
      `Faiz olmadan 24 ayda ${m(meta)} biriktirmek için her ay ${m(meta / 24)} ayırmanız gerekir.`,
      `Elinizde ${m(actual)} birikim varsa ve yıllık getiri %5 ise her ay ${m(aporteNecesario(meta, actual, 24, 5))} ayırmanız yeterli olur.`,
    ],
    faq: [
      {
        pregunta: "Hedefe nasıl sadık kalırım?",
        respuesta: "Maaşınız yatar yatmaz, başka bir harcama yapmadan parayı ayırın. Mümkünse ayrı bir hesaba otomatik bir aktarım talimatı verin.",
      },
      {
        pregunta: "Aylık tutar çok yüksek çıkarsa ne yapmalıyım?",
        respuesta: "Kendinize daha fazla süre tanıyın ya da hedefi küçültün. Ayırabildiğiniz tutarla başlayıp geliriniz arttıkça yükseltebilirsiniz.",
      },
      {
        pregunta: "Enflasyonu hesaba katmalı mıyım?",
        respuesta: "Hedef birkaç yıl sonraysa beklenen enflasyonu tutara ekleyin. Bugün 100 olan bir şey, hedefe ulaştığınızda epey daha pahalı olabilir.",
      },
    ],
    glosario: [
      { termino: "Aylık birikim", definicion: "Hedef için her ay ayırdığınız para." },
      { termino: "Getiri", definicion: "Birikiminizin bir hesapta ya da yatırımda kazandığı." },
    ],
  };
};
