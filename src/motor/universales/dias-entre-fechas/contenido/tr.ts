import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { aDia, fechaLarga, habilesEntre } from "../../comun/fechas";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const desde = "2026-03-02";
  const hasta = "2026-06-30";
  const dias = aDia(hasta) - aDia(desde);
  const habiles = habilesEntre(aDia(desde), aDia(hasta));
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  return {
    h1: "İki tarih arası gün hesaplama",
    title: tituloQueEntre(`${ctx.nombrePais} için iki tarih arası gün hesaplama`, "İki tarih arası gün hesaplama", "Gün farkı hesaplama"),
    description: "İki tarih arasındaki gün sayısını hesaplayın: takvim günü, hafta, ay ve pazartesiden cumaya iş günü.",
    intro: [
      "Bir başlangıç ve bir bitiş tarihi seçin. Takvim gününü, aynı süreyi hafta ve ay olarak ve iş gününü görürsünüz.",
      "Son başvuru tarihleri, vadeler, tatiller, gebelik ya da geri sayım için kullanın.",
    ],
    comoSeCalcula: [
      "Takvim günü, iki tarih arasındaki tüm günlerdir. Seçeneği işaretlemediğiniz sürece başlangıç günü sayılır, bitiş günü sayılmaz.",
      "İş günü, aynı aralıktaki pazartesi ile cuma arasındaki günlerdir. Resmî tatiller düşülmez.",
      "Artık yıllar 29 Şubat'la birlikte sayılır.",
    ],
    ejemplo: [`${f(desde)} ile ${f(hasta)} arasında ${dias} takvim günü var.`, `Bu günlerin ${habiles} tanesi pazartesi ile cuma arasına denk geliyor.`],
    faq: [
      {
        pregunta: "İlk gün mü sayılıyor, son gün mü?",
        respuesta: "Varsayılan olarak, iki tarihi birbirinden çıkardığınızdaki gibi ilk gün sayılır, son gün sayılmaz. İkisine de ihtiyacınız varsa “Bitiş gününü de say” seçeneğini işaretleyin.",
      },
      {
        pregunta: "İş günlerinden resmî tatiller düşülüyor mu?",
        respuesta: "Hayır. Pazartesiden cumaya kadar sayılır. Tatiller ülkeye, bölgeye ve yıla göre değiştiği için onları ayrıca düşün.",
      },
      {
        pregunta: "Bir yılda kaç gün var?",
        respuesta: "365 gün, artık yıllarda 366 gün. Bu yüzden farklı yıllarda aynı iki tarih arasındaki gün sayısı değişebilir.",
      },
    ],
    glosario: [
      { termino: "Takvim günü", definicion: "Hafta sonları ve tatiller dâhil, takvimdeki her gün." },
      { termino: "İş günü", definicion: "Bu araçta pazartesiden cumaya kadar olan günler." },
    ],
  };
};
