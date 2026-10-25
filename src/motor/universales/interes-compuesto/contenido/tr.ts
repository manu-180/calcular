import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { proyectar } from "../definicion";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  const aporte = montoEjemplo(ctx, 100);
  const a10 = proyectar(capital, aporte, 7, 10, "mensual")[9].saldo;
  const a20 = proyectar(capital, aporte, 7, 20, "mensual")[19].saldo;
  return {
    h1: "Bileşik faiz hesaplama",
    title: tituloQueEntre(`${ctx.nombrePais} bileşik faiz hesaplama: birikim tablosu`, `${ctx.nombrePais} bileşik faiz hesaplama`, "Bileşik faiz hesaplama"),
    description: "Paranızın bileşik faiz ve aylık ek yatırımla nasıl büyüdüğünü görün. Dönem sonu bakiyeyi, kazanılan faizi ve yıl yıl tabloyu hesaplayın.",
    intro: [
      "Bileşik faizde faiz bakiyenize eklenir ve kendisi de faiz kazanmaya başlar. Birikimin giderek hızlanarak büyümesinin nedeni budur.",
      "Bugün elinizdeki tutarı, her ay ekleyebileceğiniz tutarı, faiz oranını ve süreyi girin. Dönem sonu bakiyeyi ve bunun ne kadarının faiz olduğunu gösterelim.",
    ],
    comoSeCalcula: [
      "Dönem sonu bakiye = başlangıç tutarı × (1 + i) üzeri n + aylık ek yatırım × ((1 + i) üzeri n − 1) ÷ i.",
      "Burada i, seçtiğiniz faiz işleme sıklığına denk gelen aylık oran, n ise ay sayısıdır.",
      "Ek yatırımlar her ayın sonunda eklenir.",
    ],
    ejemplo: [
      `${m(capital)} ile başlayıp yıllık %7 faizle her ay ${m(aporte)} eklerseniz 10 yıl sonunda bakiyeniz ${m(a10)} olur.`,
      `10 yıl daha devam ederseniz bakiye ${m(a20)} seviyesine ulaşır. İkinci on yıl, birincisinden çok daha fazla kazandırır.`,
    ],
    faq: [
      {
        pregunta: "Basit faiz ile bileşik faiz arasındaki fark nedir?",
        respuesta:
          "Basit faiz her zaman ilk tutar üzerinden hesaplanır. Bileşik faiz ise ilk tutar ile o güne kadar kazanılan faizin toplamı üzerinden hesaplanır.",
      },
      {
        pregunta: "72 kuralı nedir?",
        respuesta: "Paranın kaç yılda ikiye katlanacağını kabaca bulmanın kısa yolu: 72'yi yıllık faiz oranına bölün. Yıllık %6 faizle para yaklaşık 12 yılda ikiye katlanır.",
      },
      {
        pregunta: "Hangi faiz oranını kullanmalıyım?",
        respuesta:
          "Paranızla yapacağınız yatırıma uygun, gerçekçi bir oran. Sonucu bugünkü parayla görmek için beklenen enflasyonu faiz oranından düşün.",
      },
    ],
    glosario: [
      { termino: "Faiz işletme", definicion: "Faizin bakiyeye eklendiği an." },
      { termino: "Bileşik faiz", definicion: "Bakiye ile o güne kadar kazanılan faizin toplamı üzerinden hesaplanan faiz." },
    ],
  };
};
