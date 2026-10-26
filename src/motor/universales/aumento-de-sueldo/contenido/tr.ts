import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aumentoReal } from "../definicion";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const p = (n: number) => `%${formatearNumero(ctx, n, 2)}`;
  const sueldo = montoEjemplo(ctx, 4000);
  return {
    h1: "Maaş zammı hesaplama",
    title: tituloQueEntre(`Maaş zammı hesaplama ${ctx.nombrePais}`, `Maaş zammı ${ctx.nombrePais}`, "Maaş zammı hesaplama"),
    description: "Zam sonrası yeni maaşınızı, aylık ve yıllık farkı ve reel zamla enflasyonun üzerine çıkıp çıkmadığınızı hesaplayın.",
    intro: [
      "Size bir zam teklif edildi ya da zam istemek üzeresiniz. Maaşınızı ve zammı, oran ya da tutar olarak girin; her ay ve her yıl ne kadar değiştiğini görün.",
      "Dönemin enflasyonunu da ekleyin, gerçekten alım gücü mü kazandığınızı yoksa yalnızca kaybı mı kapattığınızı söyleyelim.",
    ],
    comoSeCalcula: [
      "Yeni maaş = şu anki maaş × (1 + zam oranı ÷ 100).",
      "Yıllık fark = aylık fark × yılda alınan maaş sayısı.",
      "Reel zam = (1 + zam) ÷ (1 + enflasyon) − 1.",
    ],
    ejemplo: [
      `Aylık ${m(sueldo)} olan bir maaş %5 zamla ${m(sueldo * 1.05)} olur. Bu, ayda ${m(sueldo * 0.05)}, yılda ${m(sueldo * 0.05 * 12)} fazla demektir.`,
      `Dönemin enflasyonu %3 ise reel zam ${p(aumentoReal(5, 3))} olur. Enflasyon %6 ise ${p(aumentoReal(5, 6))}.`,
    ],
    faq: [
      {
        pregunta: "Reel zam nedir?",
        respuesta: "Enflasyondan arındırılmış zamdır. Yeni maaşınızın eskisinden daha fazla mı yoksa daha az mı şey satın aldığını gösterir.",
      },
      {
        pregunta: "Enflasyonu zamdan çıkarmak neden yetmiyor?",
        respuesta: `Çünkü iki oran toplanmaz, çarpılır. %5 zam ve %3 enflasyonla reel zam %2 değil, ${p(aumentoReal(5, 3))} olur. Enflasyon yüksekken fark çok daha büyür.`,
      },
      {
        pregunta: "Ne kadar zam istemeliyim?",
        respuesta: "Geride kalmamak için en az son zammınızdan bu yana geçen enflasyon kadar. Bunun ötesinde, sizinki gibi bir görev için diğer işverenlerin ne ödediğine ve işinizin nasıl büyüdüğüne bakın.",
      },
    ],
    glosario: [
      { termino: "Nominal zam", definicion: "Bordronuzda görünen, enflasyon hesaba katılmamış zam." },
      { termino: "Alım gücü", definicion: "Maaşınızla satın alabileceğiniz şeylerin miktarı." },
    ],
  };
};
