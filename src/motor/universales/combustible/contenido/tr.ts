import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const ejemplo = imperial
    ? (() => {
        const precio = montoEjemplo(ctx, 3.5);
        const galones = 300 / 30;
        return [
          `Galon başına 30 mil giden bir araçla 150 millik gidiş dönüş yolculuk için gereken yakıt: ${formatearNumero(ctx, galones)} galon.`,
          `Galon fiyatı ${m(precio)} olduğunda maliyet ${m(galones * precio)} tutar. 2 kişi paylaşırsa kişi başı ${m((galones * precio) / 2)} düşer.`,
        ];
      })()
    : (() => {
        const precio = montoEjemplo(ctx, 1.2);
        const litros = (600 * 8) / 100;
        return [
          `100 km'de 8 litre yakan bir araçla 300 km'lik gidiş dönüş yolculuk için gereken yakıt: ${formatearNumero(ctx, litros)} litre.`,
          `Litre fiyatı ${m(precio)} olduğunda maliyet ${m(litros * precio)} tutar. 2 kişi paylaşırsa kişi başı ${m((litros * precio) / 2)} düşer.`,
        ];
      })();
  return {
    h1: "Yakıt hesaplama",
    title: tituloQueEntre(`Yakıt hesaplama ${ctx.nombrePais}: yol masrafı`, `Yakıt hesaplama ${ctx.nombrePais}`, "Yakıt ve yol masrafı hesaplama", "Yakıt hesaplama"),
    description: "Mesafe, aracınızın yakıt tüketimi ve akaryakıt fiyatıyla yolculuğun yakıt maliyetini ve kişi başına düşen payı hesaplayın.",
    intro: [
      `Mesafeyi, aracınızın yakıt tüketimini ve ${imperial ? "galon" : "litre"} fiyatını girin. Ne kadar yakıt gerektiğini ve yolculuğun maliyetini görürsünüz.`,
      imperial ? "Yakıt tüketimi galon başına mil olarak girilir." : "Yakıt tüketimini 100 km'de litre ya da litre başına kilometre olarak girebilirsiniz.",
    ],
    comoSeCalcula: imperial
      ? ["Galon = mesafe ÷ galon başına mil.", "Maliyet = galon × galon fiyatı. Gidiş dönüş seçilirse mesafe iki katına çıkar."]
      : [
          "100 km'de litre ile: litre = mesafe × tüketim ÷ 100.",
          "Litre başına kilometre ile: litre = mesafe ÷ tüketim.",
          "Maliyet = litre × litre fiyatı. Gidiş dönüş seçilirse mesafe iki katına çıkar.",
        ],
    ejemplo,
    faq: [
      {
        pregunta: "Galon başına mil, 100 km'de litreye nasıl çevrilir?",
        respuesta: `${formatearNumero(ctx, 235.215, 1)} sayısını mpg değerine (ABD galonu) bölün. Galon başına 30 mil giden bir araç 100 km'de yaklaşık ${formatearNumero(ctx, 235.215 / 30, 1)} litre yakar.`,
      },
      {
        pregunta: "Otoyol ve köprü geçiş ücretleri dâhil mi?",
        respuesta: "Hayır. Yalnızca yakıt hesaplanır. Geçiş ücretlerini ve otoparkı ayrıca ekleyin.",
      },
      {
        pregunta: "Aracım şehir içinde neden daha çok yakıyor?",
        respuesta: "Dur kalk trafik, otoyolda sabit hızla gitmekten daha fazla enerji ister. Bu yüzden şehir içi tüketim genellikle daha yüksektir.",
      },
    ],
    glosario: [
      { termino: "Yakıt tüketimi", definicion: "Bir aracın belirli miktarda yakıtla ne kadar yol gittiği ya da belirli bir yolda ne kadar yakıt harcadığı." },
      { termino: "mpg", definicion: "Galon başına mil. Ne kadar yüksekse o kadar iyi." },
    ],
  };
};
