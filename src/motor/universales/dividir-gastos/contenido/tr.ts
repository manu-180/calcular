import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const a = montoEjemplo(ctx, 90);
  const b = montoEjemplo(ctx, 30);
  const cuota = (a + b) / 3;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Hesap bölme hesaplama",
    title: tituloQueEntre(`${ctx.nombrePais} için hesap bölme hesaplama`, "Hesap bölme: kim kime ne kadar öder", "Hesap bölme hesaplama"),
    description: "Ortak bir masrafı 8 kişiye kadar bölüştürün: kişi başı pay ve kimin kime ne kadar ödeyeceği, en az sayıda ödemeyle.",
    intro: [
      "Bir tatil, akşam yemeği, parti ya da ortak kiralama gibi herkesin farklı tutar ödediği durumlar için kullanın.",
      "Her kişinin ne kadar ödediğini girin. Kişi başı payı ve herkesi denkleştiren ödemeleri görürsünüz.",
    ],
    comoSeCalcula: [
      "Kişi başı pay = toplam harcama ÷ kişi sayısı.",
      "Payından az ödeyen, aradaki farkı borçlanır. Payından fazla ödeyen, farkı geri alır.",
      "Ödemeler en büyük borçtan en büyük alacağa doğru yapılır. Böylece kimse gereksiz havale yapmaz.",
    ],
    ejemplo: [
      `Ayşe ${m(a)}, Burak ${m(b)} ödedi, Can ise hiç ödemedi. Toplam ${m(a + b)} olduğu için kişi başı pay ${m(cuota)} olur.`,
      `Can, Ayşe'ye ${m(cuota)} öder. Burak da Ayşe'ye ${m(cuota - b)} öder.`,
    ],
    faq: [
      {
        pregunta: "Herkes farklı tutar ödediyse hesap nasıl bölünür?",
        respuesta: "Tüm harcamaları toplayın, kişi sayısına bölün ve her kişinin ödediğiyle karşılaştırın. Aradaki fark, o kişinin borcu ya da alacağıdır.",
      },
      {
        pregunta: "Hiç ödemeyen biri varsa ne yapmalıyım?",
        respuesta: "Paylaşıma dâhil olması için o kişiye 0 yazın. Kutuyu boş bırakırsanız hesaba katılmaz.",
      },
      {
        pregunta: "Ödeme sayısı neden kişi sayısından az?",
        respuesta: "Borçlar birleştirilir: en çok borcu olan, en çok ödemiş olana öder ve hesap böyle devam eder. Kişi sayısının bir eksiğinden fazla ödeme hiçbir zaman gerekmez.",
      },
    ],
    glosario: [
      { termino: "Pay", definicion: "Toplam masraftan her kişinin ödemesi gereken kısım." },
      { termino: "Bakiye", definicion: "Bir kişinin ödediği tutarla payı arasındaki fark." },
    ],
  };
};
