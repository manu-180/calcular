import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { acumular, rentaMensual } from "../definicion";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const actual = montoEjemplo(ctx, 5000);
  const aporte = montoEjemplo(ctx, 200);
  const a30 = acumular(30, 65, actual, aporte, 4);
  const capital30 = a30[a30.length - 1].saldo;
  const a40 = acumular(40, 65, actual, aporte, 4);
  const capital40 = a40[a40.length - 1].saldo;
  return {
    h1: "Emeklilik birikimi hesaplama",
    title: tituloQueEntre(`${ctx.nombrePais} emeklilik birikimi hesaplama`, `${ctx.nombrePais} emeklilik birikimi`, "Emeklilik birikimi hesaplama"),
    description: "Aylık katkılarla emeklilik için ne kadar birikim yapabileceğinizi ve bunun size bugünkü parayla ne kadar aylık gelir sağlayacağını görün.",
    intro: [
      "Devletin ödediği emekli aylığı çoğu zaman yaşam standardınızı korumaya yetmez. Kendi birikiminiz, küçük de olsa, erken başlarsanız büyük fark yaratır.",
      "Yaşınızı, ne zaman emekli olmak istediğinizi, elinizdeki birikimi ve her ay ne kadar ekleyebileceğinizi girin. Emeklilikteki birikiminizi ve bundan her ay ne kadar kullanabileceğinizi gösterelim.",
    ],
    comoSeCalcula: [
      "Birikim her ay reel getiriyle, yani getiriden enflasyonun düşülmesiyle büyür. Böylece sonuç bugünkü parayla kalır.",
      "Emeklilikte birikim, seçtiğiniz yıl sayısı boyunca eşit aylık tutarlarla kullanılır. Bu sırada kalan kısım getiri kazanmaya devam eder.",
      "Devlet emekli aylığı, vergiler ve yatırım masrafları dâhil değildir.",
    ],
    ejemplo: [
      `30 yaşında ${m(actual)} birikimle başlayıp yıllık %4 reel getiriyle her ay ${m(aporte)} eklerseniz 65 yaşında birikiminiz ${m(capital30)} olur. Bu tutar 25 yıl boyunca aylık ${m(rentaMensual(capital30, 4, 25))} gelir sağlar.`,
      `Aynı rakamlarla 40 yaşında başlarsanız birikiminiz ${m(capital40)} olur. On yıl büyük fark yaratır.`,
    ],
    faq: [
      {
        pregunta: "Reel getiri nedir?",
        respuesta: "Bir yatırımın enflasyon düşüldükten sonra kazandırdığıdır. Yatırım %7 kazandırıyor ve enflasyon %3 ise reel getiri yaklaşık %4 olur.",
      },
      {
        pregunta: "Bu birikim devlet emekli aylığımın yerini tutar mı?",
        respuesta: "Hayır. Bu, devletin ya da işyerinizin emeklilik planının üzerine eklenen kendi birikiminizdir. Devlet emekli aylığınızı tahmin etmek için ülkenizdeki ilgili kuruma danışın.",
      },
      {
        pregunta: "Emeklilik için ne kadar biriktirmeliyim?",
        respuesta: "Tek bir doğru rakam yok. Yaygın bir ölçü, kazancınızın %10 ile %15 arasıdır. En önemlisi, olabildiğince erken başlamaktır.",
      },
    ],
    glosario: [
      { termino: "Reel getiri", definicion: "Bir yatırımın enflasyonun üzerinde kazandırdığı." },
      { termino: "Bugünkü para", definicion: "Gelecekteki bir tutarın bugün satın alabileceği şeyle ifade edilmesi." },
    ],
  };
};
