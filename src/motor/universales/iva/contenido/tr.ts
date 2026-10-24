import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { GRAMATICA } from "../../../i18n/gramatica";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const tasa = `{{${ctx.datos.tasa}}}`;
  const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
  return {
    h1: `KDV hesaplama ${ctx.nombrePais}`,
    title: tituloQueEntre(`KDV hesaplama (${tasa}) ${ctx.nombrePais}`, `KDV ${tasa} ${ctx.nombrePais}`, `KDV hesaplama (${tasa})`),
    description: `Herhangi bir fiyata ${tasa} KDV'yi tek adımda ekleyin ya da dahil fiyattan ayırın: KDV hariç fiyat, KDV tutarı ve toplam, kuruşu kuruşuna.`,
    intro: [
      `Burada ${GRAMATICA.tr.para(ctx.nombrePais)} kullanılan genel KDV oranı: ${tasa}.`,
      "KDV hariç bir fiyata KDV mi eklemek, yoksa KDV dahil bir fiyattan KDV'yi mi ayırmak istediğinizi seçin, sonra tutarı girin.",
    ],
    comoSeCalcula: [
      "KDV eklemek: KDV = KDV hariç fiyat × oran ÷ 100. Toplam = KDV hariç fiyat + KDV.",
      "KDV ayırmak: KDV hariç fiyat = KDV dahil fiyat ÷ (1 + oran ÷ 100). Aradaki fark KDV tutarıdır.",
      "Ürün ya da hizmet indirimli bir orana tabiyse oranı “Farklı KDV oranı” alanına girebilirsiniz.",
    ],
    ejemplo: [
      `KDV hariç ${precio} tutarındaki bir fiyata KDV eklemek için fiyatı ${tasa} oranıyla çarpın ve sonucu fiyata ekleyin.`,
      `KDV dahil ${precio} tutarındaki bir toplamın içindeki KDV'yi bulmak için toplamı 1 artı orana bölün ve farkı alın.`,
    ],
    faq: [
      {
        pregunta: "KDV dahil fiyattan KDV nasıl ayrılır?",
        respuesta: "Fiyatı 1 artı ondalık oranla bölün. Kalan tutar KDV hariç fiyattır, aradaki fark da KDV tutarıdır.",
      },
      {
        pregunta: "Toplamdan yüzdeyi düşmek neden yanlış sonuç verir?",
        respuesta: "Çünkü KDV, toplamdan daha küçük olan KDV hariç fiyat üzerinden hesaplanmıştır. Yüzdeyi toplamdan düşerseniz fazla indirim yapmış olursunuz.",
      },
      {
        pregunta: `Her şeye ${tasa} KDV mi uygulanır?`,
        respuesta: "Her zaman değil. Bazı gıdalar, ilaçlar ya da hizmetler indirimli orana tabidir veya KDV'den istisnadır. Bu durumda “Farklı KDV oranı” alanını kullanın.",
      },
    ],
    glosario: [
      { termino: "KDV", definicion: "Katma değer vergisi. Mal ve hizmetlerin fiyatına eklenen vergidir." },
      { termino: "Matrah", definicion: "Verginin hesaplandığı tutar; burada KDV hariç fiyat." },
    ],
  };
};
