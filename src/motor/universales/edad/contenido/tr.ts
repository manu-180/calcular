import { aDia, fechaLarga, mesesYDias } from "../../comun/fechas";
import { duracionTr } from "../../dias-entre-fechas/textos/tr";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const nac = "1990-05-15";
  const ref = "2026-10-13";
  const { meses, dias } = mesesYDias(nac, ref);
  const total = aDia(ref) - aDia(nac);
  return {
    h1: "Yaş hesaplama",
    title: tituloQueEntre(`${ctx.nombrePais} için yaş hesaplama`, "Yaş hesaplama: yıl, ay ve gün", "Yaş hesaplama"),
    description: "Tam yaşınızı yıl, ay ve gün olarak, kaç gündür yaşadığınızı ve bir sonraki doğum gününüze ne kadar kaldığını hesaplayın.",
    intro: [
      "Doğum tarihinizi girin. Bugünkü tam yaşınızı, ay, hafta ve gün olarak da görürsünüz.",
      "Birinin belirli bir tarihteki yaşını ya da kaç yaşında olacağını bulmak için ikinci tarihi değiştirin.",
    ],
    comoSeCalcula: [
      "Doğumdan seçilen tarihe kadar geçen tam aylar sayılır. Her 12 ay bir yıldır.",
      "Son tam aydan sonra kalan günler, yaşın gün kısmını oluşturur.",
      "Artık yıllar 366 günleriyle sayılır.",
    ],
    ejemplo: [
      `${fechaLarga(ctx.locale, nac)} doğumlu birinin ${fechaLarga(ctx.locale, ref)} tarihindeki yaşı: ${duracionTr(Math.floor(meses / 12), meses % 12, dias)}.`,
      `Bu süre toplam ${formatearNumero(ctx, total)} gün eder.`,
    ],
    faq: [
      {
        pregunta: "Tam yaş nasıl hesaplanır?",
        respuesta: "Önce tamamlanan yıllar, sonra son doğum gününden bu yana geçen tam aylar, en sonda da kalan günler sayılır.",
      },
      {
        pregunta: "29 Şubat'ta doğanlar için ne olur?",
        respuesta: "Artık yıl olmayan yıllarda bu araç doğum günü olarak 28 Şubat'ı kullanır. Bazı düzenlemeler bunun yerine 1 Mart'ı esas alır.",
      },
      {
        pregunta: "Kaç gündür yaşıyorum?",
        respuesta: "“Gün olarak” satırına bakın. Doğumunuzdan seçilen tarihe kadar her gün sayılır, son gün hariç.",
      },
    ],
    glosario: [
      { termino: "Yaş", definicion: "Doğumdan bu yana tamamlanan yıl sayısı." },
      { termino: "Artık yıl", definicion: "29 Şubat'ı olan 366 günlük yıl. Bazı yüzyıl başı yıllar dışında dört yılda bir gelir." },
    ],
  };
};
