import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 0.15);
  const kwhMes = (1000 * 4 * 30) / 1000;
  return {
    h1: "Elektrik tüketimi hesaplama",
    title: tituloQueEntre(`Elektrik tüketimi hesaplama ${ctx.nombrePais}`, "Elektrik tüketimi ve fatura hesaplama", "Elektrik tüketimi hesaplama"),
    description: "Bir cihazın ne kadar elektrik harcadığını ve günlük, aylık ve yıllık maliyetini; gücü, kullanım süresi ve kWh fiyatıyla hesaplayın.",
    intro: [
      "Cihazın gücünü, günde kaç saat kullandığınızı ve faturanızdaki kWh fiyatını girin. Enerji tüketimini ve maliyetini görürsünüz.",
      "Faturanızı en çok hangi cihazın artırdığını bulmak için kullanın: klima, ısıtıcı, buzdolabı ya da bilgisayar.",
    ],
    comoSeCalcula: [
      "Günlük kWh = watt × kullanım saati ÷ 1000.",
      "Aylık kWh = günlük kWh × kullanım günü. Yıllık tüketim için aylık değer 12 ile çarpılır.",
      "Maliyet = kWh × kWh fiyatı.",
    ],
    ejemplo: [
      `Günde 4 saat çalışan 1000 W gücündeki bir cihaz günde 4 kWh, ayda ${formatearNumero(ctx, kwhMes)} kWh harcar.`,
      `kWh fiyatı ${m(precio)} olduğunda aylık maliyet: ${m(kwhMes * precio)}.`,
    ],
    faq: [
      {
        pregunta: "kWh nedir?",
        respuesta: "Kilovatsaat, 1000 W gücündeki bir cihazın bir saat çalışınca harcadığı enerjidir. Elektrik faturanızdaki birim budur.",
      },
      {
        pregunta: "Buzdolabı bütün gün tam güçte mi çalışır?",
        respuesta: "Hayır. Kompresör çalışıp durur. Bu tür cihazlar için günde 24 saat yerine 8 ile 10 saat arası bir süre girin.",
      },
      {
        pregunta: "Faturam neden tam olarak tutmuyor?",
        respuesta: "Faturaya sabit bedeller, vergiler ve bazen kademeli tarifeler eklenir. Bu hesaplama yalnızca cihazın tüketimini gösterir.",
      },
    ],
    glosario: [
      { termino: "Watt (W)", definicion: "Güç birimi: bir cihazın her saniye ne kadar enerji harcadığı." },
      { termino: "Kilovatsaat (kWh)", definicion: "Bir saat boyunca 1000 W. Faturada ödediğiniz birim budur." },
    ],
  };
};
