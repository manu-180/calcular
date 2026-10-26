import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const gastos = montoEjemplo(ctx, 1500);
  const aporte = montoEjemplo(ctx, 300);
  return {
    h1: "Acil durum fonu hesaplama",
    title: tituloQueEntre(`Acil durum fonu hesaplama ${ctx.nombrePais}`, `Acil durum fonu ${ctx.nombrePais}`, "Acil durum fonu hesaplama"),
    description: "Zorunlu giderlerinize göre acil durum fonunuzun ne kadar olması gerektiğini ve her ay biriktirerek kaç ayda tamamlanacağını hesaplayın.",
    intro: [
      "Acil durum fonu, önceden planlanamayan durumlar için ayrılan paradır: işsiz kalmak, bir sağlık sorunu ya da evde acil bir onarım.",
      "Böyle bir fon, işlerin en zor olduğu anda kredi kartına ya da krediye yüklenmenizi önler. Zorunlu giderlerinizi ve kaç ayı karşılamak istediğinizi girin.",
    ],
    comoSeCalcula: [
      "Önerilen fon = aylık zorunlu giderler × karşılanacak ay sayısı.",
      "Kalan tutar = önerilen fon − şu an ayırdığınız birikim.",
      "Tamamlama süresi = kalan tutar ÷ her ay biriktirebileceğiniz tutar, yukarı yuvarlanır.",
    ],
    ejemplo: [
      `Aylık zorunlu giderleriniz ${m(gastos)} ise 6 aylık bir fon için gereken tutar: ${m(gastos * 6)}.`,
      `Her ay ${m(aporte)} biriktirirseniz fonu ${Math.ceil((gastos * 6) / aporte)} ayda tamamlarsınız.`,
    ],
    faq: [
      {
        pregunta: "Acil durum fonu kaç aylık gideri karşılamalı?",
        respuesta:
          "Yaygın ölçü, 3 ile 6 aylık zorunlu giderdir. Geliriniz değişkense, serbest çalışıyorsanız ya da hanede tek gelir varsa 6 ile 12 ayı hedefleyin.",
      },
      {
        pregunta: "Acil durum fonu nerede tutulmalı?",
        respuesta: "Güvenli ve aynı gün ulaşabileceğiniz bir yerde, harcama hesabınızdan ayrı. Bu para riskli yatırım için değildir: görevi, ihtiyaç duyduğunuzda hazır olmaktır.",
      },
      {
        pregunta: "Önce fonu mu biriktirmeli, borcu mu kapatmalı?",
        respuesta: "Sık kullanılan yol şudur: önce bir aylık gideri biriktirin, sonra kredi kartı gibi faizi yüksek borçları kapatın, ardından fonu tamamlayın.",
      },
    ],
    glosario: [
      { termino: "Zorunlu giderler", definicion: "Geliriniz kesilse bile ödemeniz gereken giderler: konut, mutfak, faturalar, sağlık." },
      { termino: "Likidite", definicion: "Paranın değer kaybetmeden ne kadar hızlı kullanılabildiği." },
    ],
  };
};
