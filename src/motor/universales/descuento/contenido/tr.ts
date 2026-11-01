import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const precio = montoEjemplo(ctx, 80);
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "İndirim hesaplama",
    title: tituloQueEntre(`${ctx.nombrePais} için indirim hesaplama`, "İndirim hesaplama: indirimli fiyat", "İndirim hesaplama"),
    description: "İndirimli fiyatı ve ne kadar tasarruf ettiğinizi hesaplayın. %30 artı %10 gibi art arda indirimler de dâhil.",
    intro: [
      "Fiyatı ve indirimi girin. Ne ödeyeceğinizi ve ne kadar tasarruf ettiğinizi hemen görürsünüz.",
      "Kampanyada ek bir indirim varsa onu da ekleyin: art arda iki indirim hiçbir zaman doğrudan toplanmaz.",
    ],
    comoSeCalcula: [
      "İndirimli fiyat = etiket fiyatı × (1 − indirim ÷ 100).",
      "Ek indirim, ilk indirimin uygulandığı fiyata uygulanır.",
      "Tasarrufunuz, etiket fiyatı ile indirimli fiyat arasındaki farktır.",
    ],
    ejemplo: [
      `${m(precio)} fiyatlı bir ürün %25 indirimle ${m(precio * 0.75)} olur.`,
      `%30 indirim ve ardından %10 ek indirimle fiyat ${m(precio * 0.7 * 0.9)} olur. Toplam indirim %40 değil, %37 olur.`,
    ],
    faq: [
      {
        pregunta: "İndirim nasıl hesaplanır?",
        respuesta: "Fiyatı indirim oranıyla çarpıp 100'e bölün. Çıkan sonuç tasarrufunuzdur. Bunu fiyattan düşünce ödeyeceğiniz tutarı bulursunuz.",
      },
      {
        pregunta: "%30 artı %10 indirim, %40 indirimle aynı mı?",
        respuesta: "Hayır. İkinci indirim zaten düşmüş fiyata uygulanır. Toplam indirim %37 olur.",
      },
      {
        pregunta: "İndirimli fiyattan etiket fiyatı nasıl bulunur?",
        respuesta: `İndirimli fiyatı (1 − indirim ÷ 100) değerine bölün. %25 indirimde şu sayıya bölün: ${formatearNumero(ctx, 0.75, 2)}.`,
      },
    ],
    glosario: [
      { termino: "İndirim", definicion: "Etiket fiyatından düşülen yüzde." },
      { termino: "Efektif indirim", definicion: "Birden fazla indirim uygulandığında toplamda tasarruf ettiğiniz yüzde." },
    ],
  };
};
