import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const capital = montoEjemplo(ctx, 1000);
  return {
    h1: "Basit faiz hesaplama",
    title: tituloQueEntre(`${ctx.nombrePais} basit faiz hesaplama: gün, ay ve yıl`, `${ctx.nombrePais} basit faiz hesaplama`, "Basit faiz hesaplama"),
    description: "Bir anaparanın yıllık faiz oranıyla gün, ay ya da yıl olarak basit faizini hesaplayın. Yılı 365 ya da 360 gün seçin, toplamı görün.",
    intro: [
      "Basit faiz her zaman ilk anapara üzerinden hesaplanır: vade boyunca faiz bakiyeye eklenmez.",
      "Kısa vadeli mevduatlarda, kişiler arası borçlarda ve pek çok ders sorusunda kullanılır.",
    ],
    comoSeCalcula: [
      "Faiz = anapara × yıllık faiz oranı × yıl olarak süre.",
      "Süre ay olarak verilmişse 12'ye, gün olarak verilmişse bankanın kullandığı yıla göre 365'e ya da 360'a bölünür.",
      "Toplam = anapara + faiz.",
    ],
    ejemplo: [
      `${m(capital)} anapara, yıllık %10 faizle 6 ayda ${m(capital * 0.1 * 0.5)} faiz getirir.`,
      `Aynı anapara 90 günde, yıl 365 gün sayılırsa ${m((capital * 0.1 * 90) / 365)}, 360 gün sayılırsa ${m((capital * 0.1 * 90) / 360)} faiz getirir.`,
    ],
    faq: [
      {
        pregunta: "Basit faiz formülü nedir?",
        respuesta: `F = A × n × t. A anapara, n ondalık olarak yıllık faiz oranı (%10 için ${formatearNumero(ctx, 0.1, 2)}) ve t yıl olarak süredir.`,
      },
      {
        pregunta: "Bileşik faizden farkı nedir?",
        respuesta: "Basit faiz her zaman aynı anapara üzerinden hesaplanır. Bileşik faizde ise faiz bakiyeye eklenir ve o da faiz kazanır.",
      },
      {
        pregunta: "Bazı bankalar neden yılı 360 gün sayar?",
        respuesta: "Hesabı kolaylaştıran bir bankacılık geleneğidir. Yıl 360 gün sayılınca faiz biraz daha yüksek çıkar. Bankanızın hangisini kullandığını sorun.",
      },
    ],
    glosario: [
      { termino: "Anapara", definicion: "Borç verilen ya da yatırılan para." },
      { termino: "Banka yılı", definicion: "Ayların 30 gün sayıldığı, 360 günlük yıl." },
    ],
  };
};
