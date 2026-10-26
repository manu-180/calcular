import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "Başabaş noktası hesaplama",
    title: tituloQueEntre(`Başabaş noktası hesaplama ${ctx.nombrePais}`, `Başabaş noktası ${ctx.nombrePais}`, "Başabaş noktası hesaplama"),
    description: "Giderlerinizi karşılamak ve hedef kârınıza ulaşmak için her ay kaç adet satmanız ve ne kadar ciro yapmanız gerektiğini hesaplayın.",
    intro: [
      "Başabaş noktası, bir işletmenin ne kâr ne zarar ettiği satış düzeyidir. Altında zarar edersiniz, üstünde kâr etmeye başlarsınız.",
      "Sabit giderlerinizi, fiyatı ve her birimin maliyetini girin. Giderleri karşılamak ve hedefinize ulaşmak için ne kadar satmanız gerektiğini söyleyelim.",
    ],
    comoSeCalcula: [
      "Katkı payı = fiyat − birim değişken maliyet.",
      "Başabaş adedi = sabit giderler ÷ katkı payı, yukarı yuvarlanır.",
      "Başabaş cirosu = sabit giderler ÷ (katkı payı ÷ fiyat).",
      "Hedef kâr için, kârı sabit giderlere ekleyip aynı hesabı yapın.",
    ],
    ejemplo: [
      `Sabit giderler ${m(fijos)}, fiyat ${m(precio)} ve değişken maliyet ${m(variable)} ise her satış ${m(precio - variable)} bırakır.`,
      `Giderleri karşılamak için ${formatearNumero(ctx, base.unidades)} adet (${m(base.facturacion)}) satmanız gerekir. Ayda ${m(objetivo)} kazanmak için gereken adet: ${formatearNumero(ctx, meta.unidades)}.`,
    ],
    faq: [
      {
        pregunta: "Sabit ve değişken gider nedir?",
        respuesta: "Sabit giderler hiç satış yapmasanız da değişmez: kira, sabit maaşlar, faturalar. Değişken giderler her satışla artar: ürün alışı, hammadde, komisyon, kargo.",
      },
      {
        pregunta: "Başabaş noktamı nasıl düşürebilirim?",
        respuesta: "Üç yol vardır: fiyatı artırmak, birim değişken maliyeti düşürmek ya da sabit giderleri azaltmak. Genellikle en çok etkiyi fiyat yapar.",
      },
      {
        pregunta: "Hizmet işletmesi için de geçerli mi?",
        respuesta: "Evet. Birim bir saat, bir seans ya da aylık bir müşteri olabilir. Her birini sunmanın size maliyetini değişken maliyet olarak girin.",
      },
    ],
    glosario: [
      { termino: "Başabaş noktası", definicion: "Gelirin giderlere eşit olduğu satış düzeyi." },
      { termino: "Katkı payı", definicion: "Her satışın sabit giderleri karşılamak için bıraktığı tutar." },
    ],
  };
};
