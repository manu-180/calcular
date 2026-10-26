import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { tarifa } from "../definicion";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const ingreso = montoEjemplo(ctx, 40000);
  const gastos = montoEjemplo(ctx, 5000);
  const r = tarifa({ ingreso, gastos, impuestos: 25, diasLibres: 30, diasSemana: 5, horasSemana: 25 });
  return {
    h1: "Freelance ücret hesaplama",
    title: tituloQueEntre(`Freelance saatlik ücret hesaplama ${ctx.nombrePais}`, `Freelance ücret hesaplama ${ctx.nombrePais}`, "Freelance ücret hesaplama"),
    description: "Kazanmak istediğiniz tutar, giderleriniz, vergiler, izinler ve faturalandırılabilir saatlerle freelance saatlik ve günlük ücretinizi hesaplayın.",
    intro: [
      "Serbest çalışanların en sık yaptığı hata, çalışan olarak isteyecekleri maaşı alıp 160 saate bölmektir. Bu hesapta vergiler, giderler, izinler ve faturalandıramadığınız saatler yoktur.",
      "Bu hesaplama aracı elinize geçmesini istediğiniz tutardan başlar ve oraya ulaşmak için ne kadar ücret almanız gerektiğini söyler.",
    ],
    comoSeCalcula: [
      "Gereken fatura tutarı = elinize geçecek gelir ÷ (1 − vergi oranı) + işletme giderleri.",
      "Çalışma günleri = 52 hafta × haftalık gün − izin günleri.",
      "Yıllık faturalandırılabilir saat = çalışma günleri × günlük faturalandırılabilir saat.",
      "Saatlik ücret = gereken fatura tutarı ÷ yıllık faturalandırılabilir saat.",
    ],
    ejemplo: [
      `Yılda ${m(ingreso)} elinize geçmesi için, ${m(gastos)} gider ve %25 vergiyle kesmeniz gereken fatura tutarı: ${m(r.facturado)}.`,
      `30 izin günü ve haftada 25 faturalandırılabilir saatle yılda ${formatearNumero(ctx, Math.round(r.horas))} saat çalışırsınız. Bu da saatlik ${m(r.hora)} ya da günlük ${m(r.dia)} ücret demektir.`,
    ],
    faq: [
      {
        pregunta: "Haftada kaç saat faturalandırabilirim?",
        respuesta: "Çalıştığınızdan daha az. Müşteri bulmak, e-postalar, fatura işleri ve öğrenmek kimsenin ödemediği zaman alır. 40 saatin 20 ile 30 arası olağandır.",
      },
      {
        pregunta: "Saatlik mi, proje bazında mı ücret almalıyım?",
        respuesta: "İkisi de olur. Proje bazında fiyat verseniz bile saatleri tahmin edip bu ücretle çarpın; böylece zararına çalışmazsınız.",
      },
      {
        pregunta: "Hangi vergi oranını kullanmalıyım?",
        respuesta: "Ülkenize ve nasıl kayıtlı olduğunuza bağlıdır. Gelir vergisini ve sosyal güvenlik primlerini toplayın. Emin değilseniz bir mali müşavire danışın.",
      },
    ],
    glosario: [
      { termino: "Faturalandırılabilir saat", definicion: "Müşteriden ücret aldığınız çalışma saatleri." },
      { termino: "Elinize geçen gelir", definicion: "Vergiler ve işletme giderleri düştükten sonra kalan tutar." },
    ],
  };
};
