import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { FASE_LUTEA, ventana } from "../definicion";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-03-05";
  const v = ventana(aDia(fum), 28);
  return {
    h1: "Yumurtlama dönemi hesaplama",
    title: tituloQueEntre(`Yumurtlama dönemi hesaplama ${ctx.nombrePais}`, "Yumurtlama dönemi hesaplama", "Yumurtlama hesaplama"),
    description: "Yumurtlama gününüzü, doğurgan günlerinizi ve sonraki adetinizin ne zaman geleceğini, sonraki üç döngüyle birlikte hesaplayın.",
    intro: [
      "Son adet tarihinizin ilk gününü ve döngünüzün kaç gün sürdüğünü girin. Tahmini yumurtlama gününüzü, doğurgan günlerinizi ve sonraki adetinizi görürsünüz.",
      "Bu, düzenli döngüler için bir tahmindir. Doğum kontrol yöntemi değildir ve bir sağlık uzmanına danışmanın yerini tutmaz.",
    ],
    comoSeCalcula: [
      `Yumurtlama genellikle sonraki adetten ${FASE_LUTEA} gün önce olur: son adet tarihinin ilk günü + döngü süresi − ${FASE_LUTEA}.`,
      "Doğurgan dönem, yumurtlamadan 5 gün önce başlar ve ertesi gün biter; çünkü sperm 5 güne kadar canlı kalabilir.",
      "Sonraki adet, son adetten bir döngü sonra beklenir.",
    ],
    ejemplo: [
      `Son adet tarihi ${f(fum)} ve döngü 28 gün olduğunda tahmini yumurtlama günü: ${f(aFecha(v.ovulacion))}.`,
      `Doğurgan dönem ${f(aFecha(v.desde))} ile ${f(aFecha(v.hasta))} arasındadır. Sonraki adetin beklendiği gün: ${f(aFecha(v.proxima))}.`,
    ],
    faq: [
      {
        pregunta: "En doğurgan günler hangileridir?",
        respuesta: "Yumurtlamadan önceki iki üç gün ve yumurtlama günü. Doğurgan dönemin tamamı yaklaşık 6 gün sürer.",
      },
      {
        pregunta: "Döngüm düzensizse işe yarar mı?",
        respuesta: "Fikir verir, ancak daha az kesindir. Düzensiz döngülerde yumurtlama aydan aya birkaç gün kayabilir.",
      },
      {
        pregunta: "Gebelikten korunmak için kullanabilir miyim?",
        respuesta: "Hayır. Tahmin yaklaşıktır ve yumurtlama erken ya da geç olabilir. Gebelikten korunmak için bir doğum kontrol yöntemi kullanın ve doktorunuza danışın.",
      },
    ],
    glosario: [
      { termino: "Yumurtlama", definicion: "Yumurtalığın bir yumurta hücresi bıraktığı an." },
      { termino: "Doğurgan dönem", definicion: "Döngüde gebeliğin mümkün olduğu günler." },
    ],
  };
};
