import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "Kredi kartı borcu hesaplama",
    title: tituloQueEntre(`${ctx.nombrePais} kredi kartı borcu hesaplama`, `${ctx.nombrePais} kredi kartı borcu`, "Kredi kartı borcu hesaplama"),
    description: "Kredi kartı borcunuzun kaç ayda kapanacağını ve ne kadar faiz ödeyeceğinizi hesaplayın; sabit ödemeyle ya da asgari ödemeyle.",
    intro: [
      "Kredi kartı genellikle en pahalı borcunuzdur. Yalnızca asgari ödemeyi yapmak borcu yıllara yayar ve faizi katlar.",
      "Kart borcunu, yıllık faiz oranını ve her ay ne kadar ödeyebileceğinizi girin. Borcun ne zaman biteceğini, ödeyeceğiniz faizi ve ay ay ödeme planını gösterelim.",
    ],
    comoSeCalcula: [
      "Her ay faiz eklenir: kalan borç × yıllık faiz ÷ 12.",
      "Ardından ödeme düşülür. Asgari ödemede tutar, borcun belirli bir yüzdesidir ve bir alt sınırı vardır.",
      "Bu işlem borç sıfırlanana kadar tekrarlanır. Ödeme faizden büyük değilse borç hiç azalmaz.",
    ],
    ejemplo: [
      `Yıllık %22 faizle ${m(saldo)} kart borcunu her ay ${m(fijo)} ödeyerek kapatırsanız süre ${conFijo.meses} ay olur. Toplam faiz: ${m(conFijo.intereses)}.`,
      `Yalnızca %3 asgari ödeme yaparsanız süre ${conMinimo.meses} aya uzar ve toplam faiz ${m(conMinimo.intereses)} seviyesine çıkar.`,
    ],
    faq: [
      {
        pregunta: "Yalnızca asgari ödeme yaparsam ne olur?",
        respuesta:
          "Borç azaldıkça asgari ödeme de azalır. Her ay daha az ödersiniz ve borç yıllarca sürer. Mümkünse daha yüksek sabit bir tutar ödeyin, biraz fazlası bile fark eder.",
      },
      {
        pregunta: "Kart borcunu ihtiyaç kredisiyle kapatmalı mıyım?",
        respuesta: "Kredinin faizi kartın faizinden belirgin şekilde düşükse genellikle kazançlıdır. İki seçeneğin toplam faizini masraflar dâhil karşılaştırın.",
      },
      {
        pregunta: "Önce hangi kartı kapatmalıyım?",
        respuesta: "Hepsinde asgari ödemeyi yapın, kalan parayı faizi en yüksek karta yatırın. Böylece toplamda en az faizi ödersiniz.",
      },
    ],
    glosario: [
      { termino: "Asgari ödeme tutarı", definicion: "Gecikme faizi ödemeden bir ayda ödeyebileceğiniz en düşük tutar. Borcu kapatmaz." },
      { termino: "Kart faizi", definicion: "Kartın, ödenmeden devreden borç üzerinden aldığı faiz." },
    ],
  };
};
