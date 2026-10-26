import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const cuenta = montoEjemplo(ctx, 60);
  const propina = cuenta * 0.15;
  const m = (n: number) => formatearMonto(ctx, n);
  return {
    h1: "Bahşiş hesaplama",
    title: tituloQueEntre(`${ctx.nombrePais} için bahşiş hesaplama`, "Bahşiş ve hesap bölme hesaplama", "Bahşiş hesaplama"),
    description: "Bahşişi, toplam hesabı ve hesabı bölüştüğünüzde kişi başı ödemeyi hesaplayın. Payları küsuratsız tutara yuvarlayabilirsiniz.",
    intro: [
      "Hesap tutarını, bahşiş yüzdesini ve kaç kişinin ödeyeceğini girin. Bahşişi, toplamı ve kişi başı payı görürsünüz.",
      "Yuvarlak rakamları tercih ederseniz her pay yukarı yuvarlanır ve aradaki fark bahşişe eklenir.",
    ],
    comoSeCalcula: ["Bahşiş = hesap tutarı × bahşiş yüzdesi ÷ 100.", "Toplam = hesap tutarı + bahşiş.", "Kişi başı pay, toplamın kişi sayısına bölünmesiyle bulunur."],
    ejemplo: [
      `${m(cuenta)} tutarındaki bir hesaba %15 bahşiş eklenince bahşiş ${m(propina)}, toplam ${m(cuenta + propina)} olur.`,
      `Hesap 3 kişi arasında bölünürse kişi başı ödeme ${m((cuenta + propina) / 3)} olur.`,
    ],
    faq: [
      {
        pregunta: "Ne kadar bahşiş bırakmalıyım?",
        respuesta: `Bu, yerel alışkanlığa bağlıdır. ${ctx.nombrePais} için olağan oranı ve hesaba servis ücretinin zaten eklenip eklenmediğini kontrol edin.`,
      },
      {
        pregunta: "Bahşiş vergiler dâhil tutar üzerinden mi hesaplanır?",
        respuesta: "Çoğu kişi bahşişi hesapta yazan toplam üzerinden verir. Vergisiz tutar üzerinden vermek isterseniz o tutarı girin.",
      },
      {
        pregunta: "Yüzde 15 bahşiş en kolay nasıl hesaplanır?",
        respuesta: "Hesabı 10'a bölüp yüzde 10'u bulun, sonra bunun yarısını ekleyin. 40 tutarında bir hesap için 4 artı 2, yani 6.",
      },
    ],
    glosario: [
      { termino: "Bahşiş", definicion: "Hizmet için fiyatın üzerine bıraktığınız ek tutar." },
      { termino: "Servis ücreti", definicion: "Mekânın hizmet için hesaba önceden eklediği ücret." },
    ],
  };
};
