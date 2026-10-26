import { aDia, aFecha, esHabil, fechaLarga } from "../../comun/fechas";
import { tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const f = (iso: string) => fechaLarga(ctx.locale, iso);
  const inicio = "2026-03-02";
  const mas90 = aFecha(aDia(inicio) + 90);
  let habil = aDia(inicio);
  for (let n = 0; n < 15; ) if (esHabil(++habil)) n++;
  return {
    h1: "Tarihe gün ekleme",
    title: tituloQueEntre(`${ctx.nombrePais} için tarihe gün ekleme hesaplama`, "Tarihe gün ekleme ve çıkarma", "Tarihe gün ekleme"),
    description: "Bir tarihe takvim günü ya da iş günü ekleyin veya çıkarın ve hangi güne denk geldiğini görün. Süre ve vade hesabı için pratik.",
    intro: [
      "Bir tarih, bir gün sayısı ve ekleme ya da çıkarma işlemini seçin. Sonuç tarihini ve haftanın hangi günü olduğunu görürsünüz.",
      "İş günü seçildiğinde cumartesi ve pazar atlanır.",
    ],
    comoSeCalcula: [
      "Takvim gününde, girdiğiniz her gün için takvimde bir gün ilerlenir.",
      "İş gününde yalnızca pazartesiden cumaya kadar olan günler sayılır. Başlangıç günü sayılmaz.",
      "Resmî tatiller ülkeye ve bölgeye göre değiştiği için düşülmez.",
    ],
    ejemplo: [
      `${f(inicio)} tarihine 90 takvim günü eklenince sonuç: ${f(mas90)}.`,
      `${f(inicio)} tarihine 15 iş günü eklenince sonuç: ${f(aFecha(habil))}.`,
    ],
    faq: [
      {
        pregunta: "Başlangıç tarihi birinci gün sayılır mı?",
        respuesta: "Hayır. Bir pazartesiye 1 gün eklenince salı olur. Sürelerin çoğu böyle hesaplanır.",
      },
      {
        pregunta: "Cumartesiden itibaren iş günü eklersem ne olur?",
        respuesta: "İlk iş günü sonraki pazartesidir. Bir cumartesiye 1 iş günü eklenince pazartesi olur.",
      },
      {
        pregunta: "Artık yıllar hesaba katılıyor mu?",
        respuesta: "Evet. Aralık 29 Şubat'ı içeriyorsa bu gün de sayılır.",
      },
    ],
    glosario: [
      { termino: "Takvim günü", definicion: "Hiçbiri atlanmadan takvimdeki her gün." },
      { termino: "İş günü", definicion: "Bu araçta pazartesiden cumaya kadar olan günler." },
    ],
  };
};
