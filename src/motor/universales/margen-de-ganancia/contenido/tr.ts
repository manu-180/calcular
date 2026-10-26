import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { precioConMargen } from "../definicion";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `%${formatearNumero(ctx, n, 2)}`;
  const costo = montoEjemplo(ctx, 60);
  const precio = montoEjemplo(ctx, 100);
  return {
    h1: "Kâr marjı hesaplama",
    title: tituloQueEntre(`Kâr marjı hesaplama ${ctx.nombrePais}`, `Kâr marjı ${ctx.nombrePais}`, "Kâr marjı hesaplama"),
    description: "Maliyet ve fiyattan kâr marjını ve maliyet üzerinden kâr oranını, ya da istediğiniz marj için gereken satış fiyatını hesaplayın.",
    intro: [
      "Kâr marjı ile maliyet üzerinden kâr oranı sık sık karıştırılır ve bu fark size para kaybettirebilir. İkisi de aynı kârı ölçer, ama farklı bir tabana göre.",
      "Maliyeti ve fiyatı girin, ikisini birden gösterelim. Ya da bir marj seçin, ne kadardan satmanız gerektiğini söyleyelim.",
    ],
    comoSeCalcula: [
      "Kâr = fiyat − maliyet.",
      "Kâr marjı = kâr ÷ fiyat × 100.",
      "Maliyet üzerinden kâr oranı = kâr ÷ maliyet × 100.",
      "Hedef marj için fiyat = maliyet ÷ (1 − marj ÷ 100).",
    ],
    ejemplo: [
      `Maliyeti ${m(costo)} olan ve ${m(precio)} fiyatla satılan bir ürünün kârı ${m(precio - costo)} olur. Kâr marjı ${p(((precio - costo) / precio) * 100)}, maliyet üzerinden kâr oranı ${p(((precio - costo) / costo) * 100)}.`,
      `Bu maliyetle %50 marj elde etmek için satış fiyatı ${m(precioConMargen(costo, 50))} olmalıdır. Maliyete %50 eklemek yalnızca ${p(100 / 3)} marj verir.`,
    ],
    faq: [
      {
        pregunta: "Kâr marjı ile kâr oranı arasındaki fark nedir?",
        respuesta: "Kâr marjı, kârın satış fiyatına oranıdır. Maliyet üzerinden kâr oranı ise kârın maliyete oranıdır. Aynı kâr için maliyet üzerinden oran her zaman daha büyük çıkar.",
      },
      {
        pregunta: "Hedef marja göre fiyat nasıl belirlenir?",
        respuesta: `Maliyeti (1 − marj) değerine bölün. %30 marj için maliyeti ${formatearNumero(ctx, 0.7, 2)} sayısına bölün. Maliyete %30 eklemeyin: düşündüğünüzden az kazanırsınız.`,
      },
      {
        pregunta: "Maliyete vergiler dâhil edilmeli mi?",
        respuesta: "Maliyeti ve fiyatı, müşteriye yansıtılan KDV gibi vergiler hariç kullanın. Aksi hâlde marj olduğundan büyük görünür.",
      },
    ],
    glosario: [
      { termino: "Kâr marjı", definicion: "Kârın satış fiyatına oranı, yüzde olarak." },
      { termino: "Maliyet üzerinden kâr oranı", definicion: "Kârın maliyete oranı, yüzde olarak. Ticarette «kâr payı» ya da «markup» da denir." },
    ],
  };
};
