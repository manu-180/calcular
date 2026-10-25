import { aDia, aFecha, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DURACION } from "../definicion";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const fum = "2026-01-10";
  const fpp = aFecha(aDia(fum) + DURACION);
  const fpp32 = aFecha(aDia(fum) + DURACION + 4);
  return {
    h1: "Tahmini doğum tarihi hesaplama",
    title: tituloQueEntre(`Tahmini doğum tarihi hesaplama ${ctx.nombrePais}`, "Tahmini doğum tarihi hesaplama", "Doğum tarihi hesaplama"),
    description: "Son adet tarihinizden ya da döllenme tarihinden tahmini doğum tarihinizi ve bugün kaçıncı gebelik haftasında olduğunuzu hesaplayın.",
    intro: [
      "Son adet tarihinizin ilk gününü (biliyorsanız döllenme tarihini) girin. Tahmini doğum tarihinizi, gebelik haftanızı ve hangi trimesterde olduğunuzu görürsünüz.",
      "Bu bir tahmindir. En doğru tarihi doktorunuzla ya da ebenizle yapacağınız kontroller ve ultrason verir; bu hesaplama onların yerini tutmaz.",
    ],
    comoSeCalcula: [
      "Naegele kuralı kullanılır: tahmini doğum tarihi, son adet tarihine 280 gün (40 hafta) eklenerek bulunur.",
      "Döngünüz 28 günden uzun ya da kısaysa tarih bu fark kadar kayar.",
      "Döllenme tarihinden hesaplanırken 266 gün (38 hafta) eklenir.",
      "Gebelik haftaları döllenmeden değil, son adet tarihinden itibaren sayılır.",
    ],
    ejemplo: [
      `Son adet tarihi ${f(fum)} ve döngü 28 gün olduğunda tahmini doğum tarihi: ${f(fpp)}.`,
      `Döngü 32 gün olduğunda tarih 4 gün kayar ve şu güne denk gelir: ${f(fpp32)}.`,
    ],
    faq: [
      {
        pregunta: "Tahmini doğum tarihi nasıl hesaplanır?",
        respuesta: "Son adet tarihinin ilk gününe 280 gün eklenir. Neredeyse aynı tarihi veren pratik bir yol: güne 7 ekleyin, aydan 3 çıkarın ve yıla 1 ekleyin.",
      },
      {
        pregunta: "Haftalar neden son adet tarihinden sayılıyor?",
        respuesta: "Çünkü bu, neredeyse herkesin bildiği bir tarihtir. Bu yüzden 2. haftada döllenme henüz gerçekleşmemiştir.",
      },
      {
        pregunta: "Bebeklerin kaçı tahmini doğum tarihinde doğar?",
        respuesta: "Çok azı. Çoğu 37. ile 42. haftalar arasında doğar; bu yüzden tarih kesin bir gün değil, bir yol göstericidir.",
      },
    ],
    glosario: [
      { termino: "Son adet tarihi (SAT)", definicion: "Son adet kanamanızın başladığı ilk gün." },
      { termino: "Naegele kuralı", definicion: "Son adet tarihine 280 gün ekleyerek tahmini doğum tarihini bulma yöntemi." },
    ],
  };
};
