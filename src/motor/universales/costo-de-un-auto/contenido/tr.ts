import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { costoMensual, type GastosAuto } from "../definicion";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const imperial = ctx.unidades === "imperial";
  const g: GastosAuto = {
    precio: montoEjemplo(ctx, 25000),
    depreciacion: 15,
    seguro: montoEjemplo(ctx, 100),
    distancia: 1000,
    consumo: imperial ? 28 : 8,
    precioCombustible: montoEjemplo(ctx, imperial ? 3.5 : 1.2),
    mantenimiento: montoEjemplo(ctx, 60),
    estacionamiento: 0,
    otros: 0,
  };
  const mensual = costoMensual(g, imperial);
  const unidad = imperial ? "mil" : "kilometre";
  return {
    h1: "Araç masrafı hesaplama",
    title: tituloQueEntre(`Araç masrafı hesaplama ${ctx.nombrePais}`, `Araç masrafı ${ctx.nombrePais}`, "Araç masrafı hesaplama"),
    description: `Aracınızın aylık, yıllık ve ${unidad} başına gerçek maliyetini hesaplayın: yakıt, sigorta, bakım, otopark ve değer kaybı.`,
    intro: [
      "Çoğu kişi yakıta ne harcadığını bilir. Ama sigortayı, bakımı, otoparkı ve en önemlisi aracın her yıl kaybettiği değeri toplayan azdır.",
      "Giderlerinizi girin, aracınızın size gerçekte neye mal olduğunu gösterelim. Satın alma, araç değiştirme ya da başka bir ulaşım yolu seçme kararında işinize yarar.",
    ],
    comoSeCalcula: [
      imperial
        ? "Aylık yakıt = aylık mil ÷ galon başına mil × galon fiyatı."
        : "Aylık yakıt = aylık kilometre × 100 km'deki litre ÷ 100 × litre fiyatı.",
      "Aylık değer kaybı = aracın değeri × yıllık değer kaybı ÷ 12.",
      "Gerçek maliyet = yakıt + sigorta + bakım + otopark + diğer giderler + değer kaybı.",
      `${unidad === "mil" ? "Mil" : "Kilometre"} başına maliyet = aylık gerçek maliyet ÷ ay içinde yapılan yol.`,
    ],
    ejemplo: [
      `Değeri ${m(g.precio)} olan ve ayda ${formatearNumero(ctx, g.distancia)} ${imperial ? "mil" : "km"} yol yapan bir aracın, değer kaybı dâhil aylık maliyeti: ${m(mensual)}.`,
      `Bu, yılda ${m(mensual * 12)} ve ${unidad} başına ${formatearMonto(ctx, mensual / g.distancia)} eder.`,
    ],
    faq: [
      {
        pregunta: "Araçta değer kaybı nedir?",
        respuesta: "Aracın zamanla kaybettiği değerdir. Her ay ödemezsiniz ama satarken hissedersiniz. Sıfır bir araçta çoğu zaman en büyük gider kalemidir.",
      },
      {
        pregunta: "Kredi taksitim neden eklenmiyor?",
        respuesta:
          "Taksitin bir kısmı aracın kendisini öder ve bu zaten değer kaybı olarak sayılır. İkisini birden eklemek aracı iki kez saymak olur. Kredinin faizi bunun üzerine ek bir maliyettir.",
      },
      {
        pregunta: "Aracımın maliyetini nasıl düşürebilirim?",
        respuesta:
          "Kasko ve trafik sigortası tekliflerini her yıl karşılaştırın, lastik basıncını ve bakımı düzenli tutun, aracı sık değiştirmeyin: en çok değer kaybı ilk yıllarda olur.",
      },
    ],
    glosario: [
      { termino: "Değer kaybı", definicion: "Aracın zamanla ve kullanıldıkça kaybettiği değer." },
      { termino: `${unidad === "mil" ? "Mil" : "Kilometre"} başına maliyet`, definicion: `Tüm giderler dâhil, yapılan her ${unidad} yolun ortalama maliyeti.` },
    ],
  };
};
