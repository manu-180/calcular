import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { horarios, minutosTrabajados } from "../definicion";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const m = (x: number) => formatearMonto(ctx, x);
  const n = (x: number, decimales = 0) => formatearNumero(ctx, x, decimales);
  const hora = (v: string) => horarios(ctx.locale).find((o) => o.valor === v)?.etiqueta ?? v;
  const pago = montoEjemplo(ctx, 15);
  const jornada = minutosTrabajados("09:00", "17:30", 30) / 60;
  const larga = minutosTrabajados("08:00", "18:00", 60) / 60;
  const extra = larga * 5 - 40;
  return {
    h1: "Çalışma saati hesaplama",
    title: tituloQueEntre(`Çalışma saati ve mesai hesaplama ${ctx.nombrePais}`, `Çalışma saati hesaplama ${ctx.nombrePais}`, "Çalışma saati hesaplama"),
    description: "Giriş, çıkış ve mola saatlerinden bu hafta çalıştığınız saatleri toplayın, fazla mesai dâhil ücretinizi hesaplayın.",
    intro: [
      "Her gün için giriş ve çıkış saatini, ücretsiz molanızı ve saatlik ücretinizi seçin. Toplam saati, fazla mesaiyi ve haftalık ücretinizi gösterelim.",
      "Bordronuzu kontrol etmek, puantaj doldurmak ya da saatlik işinizi faturalandırmak için kullanın.",
    ],
    comoSeCalcula: [
      "Günlük saat = çıkış − giriş − mola. Çıkış saati girişten önceyse vardiya ertesi gün biter.",
      "Fazla mesai = haftalık toplam − normal saatler, toplam bunları aşıyorsa.",
      "Ücret = normal saatler × saatlik ücret + fazla mesai saatleri × saatlik ücret × (1 + zam).",
    ],
    ejemplo: [
      `Saat ${hora("09:00")} ile ${hora("17:30")} arası, 30 dakika molayla günde ${n(jornada)} saat eder. Pazartesiden cumaya ${n(jornada * 5)} saat; saatlik ${m(pago)} ücretle toplam ${m(jornada * 5 * pago)}.`,
      `Saat ${hora("08:00")} ile ${hora("18:00")} arası, bir saat molayla haftada ${n(larga * 5)} saat eder ve bunun ${n(extra)} saati fazla mesaidir. %50 zamla toplam ücret: ${m(40 * pago + extra * pago * 1.5)}.`,
    ],
    faq: [
      {
        pregunta: "Çalışma saati nasıl hesaplanır?",
        respuesta: "Çıkış saatinden giriş saatini çıkarın ve molanızı düşün. Sonra haftanın bütün günlerini toplayın.",
      },
      {
        pregunta: "Dakikalar ondalık saate nasıl çevrilir?",
        respuesta: `Dakikayı 60'a bölün. Yarım saat ${n(0.5, 1)}; 15 dakika ${n(0.25, 2)}; 45 dakika ${n(0.75, 2)} saat eder. Yani 7 saat 45 dakika, ${n(7.75, 2)} saattir.`,
      },
      {
        pregunta: "Ne kadar fazla mesai yapabilirim ve nasıl ödenir?",
        respuesta: "Bu, çalıştığınız yerin yasasına ve iş sözleşmenize bağlıdır. Bu hesaplama aracı, belirli bir kural uygulamadan girdiğiniz zam oranını ve normal saatleri kullanır.",
      },
    ],
    glosario: [
      { termino: "Fazla mesai", definicion: "Normal çalışma saatlerinin üzerinde, daha yüksek ücretle ödenen çalışma." },
      { termino: "Puantaj", definicion: "Her gün kaç saat çalışıldığını gösteren çalışma çizelgesi." },
    ],
  };
};
