import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../definicion";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const monto = montoEjemplo(ctx, 10000);
  const cuota36 = cuotaFrancesa(monto, 12, 36);
  const cuota60 = cuotaFrancesa(monto, 12, 60);
  return {
    h1: "Kredi hesaplama",
    title: tituloQueEntre(`${ctx.nombrePais} kredi hesaplama: taksit ve faiz`, `${ctx.nombrePais} kredi hesaplama`, "Kredi hesaplama: taksit ve faiz"),
    description: "Kredinizin aylık taksitini, toplam faizini ve ödeme planını hesaplayın. Ek ödemeyle ne kadar faiz tasarruf edeceğinizi görün.",
    intro: [
      "Bir krediyi imzalamadan önce iki rakam önemlidir: her ay ödeyeceğiniz taksit ve kredinin size faiz olarak maliyeti.",
      "Kredi tutarını, yıllık faiz oranını ve vadeyi girin. Her ay biraz fazla ödemeyi düşünüyorsanız ek ödemeyi de girin ve krediyi ne kadar erken kapatacağınızı görün.",
    ],
    comoSeCalcula: [
      "Hesaplama eşit taksitli ödeme planını kullanır. İhtiyaç, taşıt ve konut kredilerinde yaygın yöntem budur.",
      "Aylık faiz = yıllık faiz ÷ 12.",
      "Taksit = kredi tutarı × aylık faiz ÷ (1 − (1 + aylık faiz) üzeri eksi taksit sayısı).",
      "Her ay faiz, kalan borç üzerinden hesaplanır. Taksitin geri kalanı anaparayı düşürür.",
    ],
    ejemplo: [
      `${m(monto)} tutarında, yıllık %12 faizli ve 36 ay vadeli bir kredinin aylık taksiti ${m(cuota36)} olur. Toplam faiz: ${m(interesesTotales(monto, 12, 36))}.`,
      `Vadeyi 60 aya uzatırsanız taksit ${m(cuota60)} seviyesine iner, ancak toplam faiz ${m(interesesTotales(monto, 12, 60))} seviyesine çıkar.`,
    ],
    faq: [
      {
        pregunta: "Kredi taksiti nasıl hesaplanır?",
        respuesta:
          "Eşit taksitli ödeme planı formülüyle. Bütün taksitler aynıdır, ama ilk taksitlerin büyük kısmı faiz, son taksitlerin büyük kısmı anaparadır. Bu yüzden borç başta yavaş azalır.",
      },
      {
        pregunta: "Krediyi erken kapatmak mantıklı mı?",
        respuesta:
          "Erken kapama ücreti yüksek değilse genellikle evet. Ek ödeme doğrudan anaparaya gider ve o tutara artık faiz işlemez. Ne kadar erken öderseniz o kadar çok tasarruf edersiniz.",
      },
      {
        pregunta: "Uzun vade daha mı iyi?",
        respuesta: "Taksit düşer, ama toplamda çok daha fazla faiz ödersiniz. Karar vermeden önce iki rakamı da karşılaştırın.",
      },
      {
        pregunta: "Bankanın verdiği taksit neden farklı?",
        respuesta:
          "Bankalar çoğu zaman sigorta, dosya masrafı ya da vergi ekler veya ilan edilenden farklı bir oran kullanır. Teklifleri yalnızca faize göre değil, toplam maliyete göre karşılaştırın.",
      },
    ],
    glosario: [
      { termino: "Anapara", definicion: "Borcun henüz geri ödemediğiniz kısmı." },
      { termino: "Yıllık nominal faiz", definicion: "Her ayın faizini bulmak için 12'ye bölünen yıllık oran." },
      { termino: "Vade", definicion: "Kredinin geri ödeneceği süre, ay olarak." },
    ],
  };
};
