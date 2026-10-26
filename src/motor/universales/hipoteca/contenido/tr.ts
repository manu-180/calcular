import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const prestado = precio * 0.8;
  const cuota20 = cuotaFrancesa(prestado, 7, 240);
  const cuota10 = cuotaFrancesa(prestado, 7, 120);
  return {
    h1: "Konut kredisi hesaplama",
    title: tituloQueEntre(`${ctx.nombrePais} konut kredisi hesaplama: aylık taksit`, `${ctx.nombrePais} konut kredisi hesaplama`, "Konut kredisi hesaplama"),
    description: "Konutun fiyatı, peşinat, faiz ve vadeyle aylık konut kredisi taksitinizi hesaplayın. Toplam faizi ve kalan borcu yıl yıl görün.",
    intro: [
      "Konut kredisi, çoğu ailenin hayatındaki en büyük borçtur. Bankayla görüşmeden önce rakamların tamamını görmekte fayda var.",
      "Konutun fiyatını, peşinatı, faiz oranını ve vadeyi girin. Emlak vergisi ya da sigortayı taksitle birlikte ödüyorsanız onları da ekleyin; gerçek aylık ödemenizi görün.",
    ],
    comoSeCalcula: [
      "Kredi tutarı = konutun fiyatı − peşinat.",
      "Aylık taksit, yıllık faizin 12'ye bölünmesiyle ve aylara çevrilmiş vadeyle, eşit taksitli ödeme planına göre hesaplanır.",
      "Her yıl için ödenen faiz ve anapara toplanır, ardından kalan borç gösterilir.",
    ],
    ejemplo: [
      `Fiyatı ${m(precio)} olan bir konutta %20 peşinat verirseniz kredi tutarı ${m(prestado)} olur. Yıllık %7 faiz ve 20 yıl vadeyle aylık taksit: ${m(cuota20)}.`,
      `20 yılda ödenen toplam faiz ${m(interesesTotales(prestado, 7, 240))} eder. Vade 10 yıl olursa taksit ${m(cuota10)} seviyesine çıkar, ama toplam faiz ${m(interesesTotales(prestado, 7, 120))} seviyesine iner.`,
    ],
    faq: [
      {
        pregunta: "Konut kredisinde ne kadar peşinat vermek gerekir?",
        respuesta:
          "Bankaya ve konutun türüne göre değişir. Peşinat büyüdükçe kredi tutarı, taksit ve toplam faiz küçülür. Tapu, noter ve ekspertiz masrafları için de ayrıca para ayırın.",
      },
      {
        pregunta: "İlk yıllarda kalan borç neden neredeyse hiç azalmıyor?",
        respuesta:
          "Faiz, kalan borç üzerinden hesaplanır. Vadenin başında borç hâlâ büyük olduğu için taksitin büyük kısmı faize gider. Zamanla bu oran tersine döner.",
      },
      {
        pregunta: "Sabit faiz ile değişken faiz arasındaki fark nedir?",
        respuesta:
          "Sabit faizde oran bütün vade boyunca aynı kalır ve taksit değişmez. Değişken faizde oran piyasaya göre değişir, taksit de artabilir. Bu hesaplama aracı faizin vade boyunca aynı kaldığını varsayar.",
      },
      {
        pregunta: "Kısa vade mi daha iyi, uzun vade mi?",
        respuesta:
          "Daha yüksek taksiti rahatça ödeyebiliyorsanız kısa vade faizde çok daha fazla tasarruf sağlar. Ödeyemiyorsanız uzun vade seçip elinize para geçtikçe ara ödeme yapmak da bir yoldur.",
      },
    ],
    glosario: [
      { termino: "Peşinat", definicion: "Konutun fiyatının kendi paranızla ödediğiniz kısmı." },
      { termino: "Kredi tutarı", definicion: "Bankadan borç aldığınız tutar." },
      { termino: "Kalan borç", definicion: "Henüz geri ödemeniz gereken anapara." },
    ],
  };
};
