import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const anual = montoEjemplo(ctx, 50000);
  const hora = montoEjemplo(ctx, 20);
  return {
    h1: "Saatlik ücret hesaplama",
    title: tituloQueEntre(`Saatlik ücret ve maaş hesaplama ${ctx.nombrePais}`, `Saatlik ücret hesaplama ${ctx.nombrePais}`, "Saatlik ücret hesaplama"),
    description: "Ücretinizi saatlik, günlük, haftalık, on beş günlük, aylık ve yıllık tutarlar arasında, gerçek çalışma saatlerinizle çevirin.",
    intro: [
      "Maaşınız saatte ne kadar ediyor? Saatlik bir teklif yılda ne tutar? Bir tutar girin, dönemi seçin, diğer tüm dönemleri gösterelim.",
      "İş tekliflerini karşılaştırmak, fazla mesaiyi fiyatlamak ya da zamanınızın değerini görmek için kullanın.",
    ],
    comoSeCalcula: [
      "Önce her şey yıllık tutara çevrilir.",
      "Saatlik = yıllık ÷ (haftalık saat × ücret alınan hafta).",
      "Günlük = yıllık ÷ (haftalık gün × ücret alınan hafta). Haftalık = yıllık ÷ ücret alınan hafta.",
      "Aylık = yıllık ÷ 12. On beş günlük = yıllık ÷ 24.",
    ],
    ejemplo: [
      `Haftada 40 saat çalışılan, yıllık ${m(anual)} tutarındaki bir maaş saatte ${m(anual / 2080)}, ayda ${m(anual / 12)} eder.`,
      `Tam zamanlı, saatlik ${m(hora)} ücretli bir teklif yılda ${m(hora * 2080)} tutar.`,
    ],
    faq: [
      {
        pregunta: "Bir yılda kaç çalışma saati vardır?",
        respuesta: `Haftada 40 saat ve 52 ücretli haftayla ${formatearNumero(ctx, 2080)} saat. Bu yüzden pratik bir kural, saatlik ücreti yaklaşık ${formatearNumero(ctx, 2000)} ile çarpmaktır.`,
      },
      {
        pregunta: "Haftalık ücretin 4 katı neden aylık tutarı vermiyor?",
        respuesta: `Çünkü ortalama bir ayda 4 değil, ${formatearNumero(ctx, 52 / 12, 2)} hafta vardır. Haftalıktan aylığa geçmek için 52 ile çarpıp 12'ye bölün.`,
      },
      {
        pregunta: "İkramiyeler ya da vergiler dâhil mi?",
        respuesta: "Hayır. Aynı rakamı dönemler arasında çevirir. İkramiye alıyorsanız teklifleri karşılaştırırken ayrıca ekleyin.",
      },
    ],
    glosario: [
      { termino: "Brüt ücret", definicion: "Vergiler ve kesintiler düşülmeden önceki ücret." },
      { termino: "On beş günlük ödeme", definicion: "Ayda iki kez, yılda 24 kez yapılan ödeme." },
    ],
  };
};
