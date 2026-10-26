import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
  return {
    h1: "Ağırlıklı ortalama hesaplama",
    title: tituloQueEntre(`${ctx.nombrePais} için ağırlıklı ortalama hesaplama`, "Ağırlıklı not ortalaması hesaplama", "Ağırlıklı ortalama hesaplama"),
    description: "Not ortalamanızı basit ya da ağırlıklı olarak hesaplayın: en fazla 10 değer ve her birinin ağırlığı (yüzde, kredi ya da sayı).",
    intro: [
      "Her notu ve ne kadar etkilediğini girin. Ağırlıklı ortalamayı ve yanında basit ortalamayı görürsünüz.",
      "Okul ya da üniversite notları için ve bazı değerlerin diğerlerinden daha çok sayıldığı her ortalama için kullanılır.",
    ],
    comoSeCalcula: [
      "Basit ortalama = değerlerin toplamı ÷ değer sayısı.",
      "Ağırlıklı ortalama = (değer × ağırlık) toplamı ÷ ağırlıkların toplamı.",
      "Ağırlıkların toplamının 100 olması gerekmez: hesap, ağırlıkların toplamına bölünür.",
    ],
    ejemplo: [
      `Ağırlığı %20 olan 7, ağırlığı %30 olan 8 ve ağırlığı %50 olan 9 için ağırlıklı ortalama ${n(8.3)} olur.`,
      `Aynı üç notun basit ortalaması ${n(8)} olur. Ağırlığı en büyük olan 9 notu, ağırlıklı ortalamayı yukarı çeker.`,
    ],
    faq: [
      {
        pregunta: "Ağırlıklı ortalama nasıl hesaplanır?",
        respuesta: "Her değeri ağırlığıyla çarpın, sonuçları toplayın ve ağırlıkların toplamına bölün.",
      },
      {
        pregunta: "Ağırlıkların toplamı %100 etmiyorsa ne olur?",
        respuesta: "Sorun değil. Bir dersin 6, diğerinin 4 AKTS kredisi varsa 6 ve 4 girin. Hesap, toplam ağırlığa bölünür.",
      },
      {
        pregunta: "Basit ortalama ile ağırlıklı ortalama arasındaki fark nedir?",
        respuesta: "Basit ortalamada her değer eşit sayılır. Ağırlıklı ortalamada ise her değer kendi ağırlığı kadar etkiler.",
      },
    ],
    glosario: [
      { termino: "Ağırlık", definicion: "Bir değerin son ortalamayı ne kadar etkilediği." },
      { termino: "Ağırlıklı ortalama", definicion: "Her değerin kendi ağırlığıyla çarpıldığı ortalama." },
    ],
  };
};
