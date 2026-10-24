import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cagr, roi } from "../definicion";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `%${formatearNumero(ctx, n, 2)}`;
  const inicial = montoEjemplo(ctx, 10000);
  const final = montoEjemplo(ctx, 15000);
  return {
    h1: "Yatırım getirisi hesaplama",
    title: tituloQueEntre(`Yatırım getirisi (ROI ve CAGR) hesaplama ${ctx.nombrePais}`, `Yatırım getirisi hesaplama ${ctx.nombrePais}`, "Yatırım getirisi hesaplama"),
    description: "Yatırdığınız tutar, bugünkü değer ve geçen yıllarla bir yatırımın toplam getirisini (ROI) ve yıllık getirisini (CAGR) hesaplayın.",
    intro: [
      "Yüzde 50 kazanç kulağa iyi gelir, ama 2 yılda olmasıyla 10 yılda olması aynı şey değildir. Yatırımları karşılaştırmak için yıllık getiriye bakmak gerekir.",
      "Ne kadar yatırdığınızı, bugün ne kadar ettiğini ve kaç yıl geçtiğini girin. Toplam getiriyi ve bileşik yıllık getiriyi gösterelim.",
    ],
    comoSeCalcula: [
      "ROI = (son değer + elde edilen gelir − yatırılan tutar) ÷ yatırılan tutar × 100.",
      "CAGR = ((son değer + elde edilen gelir) ÷ yatırılan tutar) üssü (1 ÷ yıl), eksi 1.",
      "CAGR bileşik yıllık orandır: her yıl tekrarlandığında aynı sonucu veren oran.",
    ],
    ejemplo: [
      `${m(inicial)} yatırıp sonunda ${m(final)} elde ederseniz kazancınız ${m(final - inicial)} olur. ROI: ${p(roi(inicial, final))}.`,
      `Bu 5 yılda olduysa yıllık getiri ${p(cagr(inicial, final, 5))} olur. 2 yılda olduysa ${p(cagr(inicial, final, 2))}.`,
    ],
    faq: [
      {
        pregunta: "ROI ile CAGR arasındaki fark nedir?",
        respuesta: "ROI, süreye bakmadan yatırdığınız tutar üzerindeki toplam kazançtır. CAGR bunu yıllara yayar; böylece farklı sürelerdeki yatırımları karşılaştırabilirsiniz.",
      },
      {
        pregunta: "Yıllık getiri neden toplamın yıl sayısına bölünmesi değil?",
        respuesta: `Çünkü her yılın kazancı bakiyeye eklenir ve o da kazandırır. 5 yılda yüzde 50 kazanç, yıllık bileşik olarak ${p(cagr(1, 1.5, 5))} eder, %10 değil.`,
      },
      {
        pregunta: "Aldığım temettü ya da faizi nasıl hesaba katarım?",
        respuesta: "Çektiyseniz elde edilen gelir alanına ekleyin. Yeniden yatırdıysanız zaten son değerin içindedir.",
      },
    ],
    glosario: [
      { termino: "ROI", definicion: "Yatırım getirisi: toplam kazancın yatırılan tutara oranı, yüzde olarak." },
      { termino: "CAGR", definicion: "Bileşik yıllık büyüme oranı: bileşik etkiyle ortalama yıllık getiri." },
    ],
  };
};
