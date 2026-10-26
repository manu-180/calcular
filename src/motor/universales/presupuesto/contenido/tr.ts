import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 2000);
  return {
    h1: "Bütçe hesaplama: 50/30/20 kuralı",
    title: tituloQueEntre(`${ctx.nombrePais} bütçe hesaplama: 50/30/20 kuralı`, `${ctx.nombrePais} bütçe hesaplama`, "Bütçe hesaplama: 50/30/20 kuralı"),
    description: "Aylık net gelirinizi 50/30/20 kuralıyla bölün: ihtiyaçlara, isteklere ve birikime ne kadar ayrılacağını görün. Gerekirse yüzdeleri değiştirin.",
    intro: [
      "50/30/20 kuralı, ayınızı planlamanın basit bir yoludur. Gelirin yarısı zorunlu giderlere, %30 kadarı keyif aldığınız şeylere, %20 kadarı birikime gider.",
      "Net gelirinizi girin, her kısma ne kadar düştüğünü gösterelim. Durumunuz farklıysa (örneğin kiranız yüksekse) yüzdeleri değiştirin.",
    ],
    comoSeCalcula: ["İhtiyaçlar = gelir × %50.", "İstekler = gelir × %30.", "Birikim = gelir × %20. Üç yüzdenin toplamı %100 olmalıdır."],
    ejemplo: [
      `Aylık ${m(ingreso)} gelirle dağılım şöyle olur: ihtiyaçlar için ${m(ingreso * 0.5)}, istekler için ${m(ingreso * 0.3)}, birikim için ${m(ingreso * 0.2)}.`,
      `Bir yılda bu %20 birikim ${m(ingreso * 0.2 * 12)} eder.`,
    ],
    faq: [
      {
        pregunta: "Neler ihtiyaç, neler istek sayılır?",
        respuesta:
          "İhtiyaçlar ödemek zorunda olduğunuz giderlerdir: konut, temel market alışverişi, faturalar, ulaşım, sağlık ve borçların asgari ödemeleri. İstekler ise gerekirse vazgeçebileceğiniz şeylerdir.",
      },
      {
        pregunta: "İhtiyaçlarım %50 kadarını aşarsa ne yapmalıyım?",
        respuesta: "Bu, özellikle kira yüksekse sık rastlanan bir durumdur. 60/20/20 ya da 70/20/10 dağılımını deneyin ve birikimi sıfıra indirmemeye çalışın.",
      },
      {
        pregunta: "Borç ödemeleri birikim sayılır mı?",
        respuesta: "Asgari ödemeler ihtiyaçlara girer. Borcu daha erken kapatmak için yaptığınız ek ödemeler ise birikim sayılır, çünkü tıpkı biriktirmek gibi net varlığınızı artırır.",
      },
    ],
    glosario: [
      { termino: "Net gelir", definicion: "Vergiler ve kesintilerden sonra elinize geçen tutar." },
      { termino: "50/30/20 kuralı", definicion: "Geliri ihtiyaçlar, istekler ve birikim arasında bölmenin bir yolu." },
    ],
  };
};
