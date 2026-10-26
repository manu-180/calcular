import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const antes = montoEjemplo(ctx, 40);
  const despues = antes * 1.25;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Yüzde değişim hesaplama",
    title: tituloQueEntre(`${ctx.nombrePais} için yüzde değişim hesaplama`, "Yüzde artış ve azalış hesaplama", "Yüzde değişim hesaplama"),
    description: "Bir değerin yüzde kaç arttığını ya da azaldığını hesaplayın: fiyat, maaş, satış ya da zamanla değişen her sayı için.",
    intro: [
      "Eski ve yeni değeri girin. Yüzde artışı ya da azalışı ve aradaki farkı görürsünüz.",
      "Başa dönmek için gereken değişimi de gösterir. Bu oran neredeyse hiçbir zaman aynı değildir.",
    ],
    comoSeCalcula: [
      "Yüzde değişim = (yeni değer − eski değer) ÷ eski değer × 100.",
      "Sonuç artıysa değer artmış, eksiyse azalmıştır.",
      "Eski değer negatifse mutlak değerine bölünür. Böylece işaret yine iyileşme olup olmadığını gösterir.",
    ],
    ejemplo: [
      `${m(antes)} olan bir ürün şimdi ${m(despues)} ise fiyatı %25 artmıştır.`,
      "Eski fiyata dönmesi için %25 değil, %20 düşmesi gerekir.",
    ],
    faq: [
      {
        pregunta: "Yüzde artış nasıl hesaplanır?",
        respuesta: "Yeni değerden eski değeri çıkarın, sonucu eski değere bölüp 100 ile çarpın. 80'den 100'e: 20 ÷ 80 × 100 = %25.",
      },
      {
        pregunta: "Yüzde azalış nasıl hesaplanır?",
        respuesta: "Hesap aynıdır. 100'den 80'e: −20 ÷ 100 × 100 = −%20, yani değer %20 azalmıştır.",
      },
      {
        pregunta: "%25 artış ile %25 azalış neden birbirini götürmez?",
        respuesta: "Her yüzde farklı bir tabandan alınır. 80 artı %25 = 100, ama 100 eksi %25 = 75.",
      },
      {
        pregunta: "Yüzde ile yüzde puan arasındaki fark nedir?",
        respuesta: "Bir oran %10'dan %12'ye çıkarsa 2 yüzde puan artmış olur. Yüzde değişim olarak ise %20 artmıştır.",
      },
    ],
    glosario: [
      { termino: "Yüzde değişim", definicion: "Bir değerin, başlangıç değerine göre yüzde olarak ne kadar değiştiği." },
      { termino: "Yüzde puan", definicion: "İki yüzde arasındaki düz fark." },
    ],
  };
};
