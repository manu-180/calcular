import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { comparar } from "../definicion";

export const contenidoTr: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const precio = montoEjemplo(ctx, 200000);
  const alquiler = montoEjemplo(ctx, 1000);
  const base = { precio, entrada: 20, gastosCompra: 4, tasa: 7, aniosHipoteca: 25, alquiler, aumentoAlquiler: 3, gastosPropietario: 1.5, revalorizacion: 3, rendimiento: 5 };
  const a10 = comparar({ ...base, horizonte: 10 }).anios[9];
  const a3 = comparar({ ...base, horizonte: 3 }).anios[2];
  const kazanan = (a: { comprar: number; alquilar: number }) => (a.comprar >= a.alquilar ? "satın almak" : "kirada oturmak");
  return {
    h1: "Ev almak mı, kirada oturmak mı?",
    title: tituloQueEntre(`${ctx.nombrePais} için ev almak mı kira mı hesaplama`, `${ctx.nombrePais}: ev almak mı kira mı?`, "Ev almak mı, kirada oturmak mı?"),
    description: "Seçtiğiniz süre boyunca ev almayı kirada oturmakla karşılaştırın. Hangisinin daha avantajlı olduğunu, hangi yıldan itibaren ve ne kadar farkla görün.",
    intro: [
      "Kredi taksitini kirayla karşılaştırmak yetmez. Ev alan kişi faiz, bakım ve emlak vergisi öder ama sonunda konutun sahibi olur. Kirada oturan kişi ise peşinatı yatırımda tutabilir.",
      "Bu hesaplama aracı bunların hepsini yıl yıl toplar ve hangi seçeneğin size daha fazla net varlık bıraktığını söyler.",
    ],
    comoSeCalcula: [
      "Satın alma: her ay kredi taksitini ve ev sahibi giderlerini ödersiniz. Net varlığınız, konutun değerinden kalan borcun düşülmesiyle bulunur.",
      "Kira: peşinat ve satın alma masrafları alternatif getiriyle yatırımda kalır, kira her yıl artar.",
      "Her ay hangi seçenek daha az harcatıyorsa aradaki fark yatırıma gider. Böylece iki seçenek de aynı bütçeden çıkar.",
      "Dönem sonunda net varlığı daha yüksek olan seçenek daha avantajlıdır.",
    ],
    ejemplo: [
      `Fiyatı ${m(precio)} olan bir konut, %20 peşinat ve yıllık %7 faizli 25 yıl vadeli konut kredisiyle alınıyor. Karşılaştırılan aylık kira: ${m(alquiler)}.`,
      `10 yıllık sürede ${kazanan(a10)} öne geçer; fark ${m(Math.abs(a10.comprar - a10.alquilar))}. 3 yıllık sürede ${kazanan(a3)} öne geçer; fark ${m(Math.abs(a3.comprar - a3.alquilar))}.`,
    ],
    faq: [
      {
        pregunta: "Kira ödemek paranın boşa gitmesi mi?",
        respuesta:
          "Tam olarak değil. Ev alan kişi de geri alamayacağı giderler öder: faiz, emlak vergisi ve bakım. Önemli olan, iki durumda da sonunda ne kadar varlığınız olduğudur.",
      },
      {
        pregunta: "Sonuç neden yıl sayısına göre değişiyor?",
        respuesta:
          "Satın almanın başta büyük maliyetleri vardır (satın alma masrafları ve ilk yılların faizi) ve bunları geri kazanmak zaman alır. Yakında taşınmayı düşünüyorsanız kirada oturmak genellikle öne çıkar.",
      },
      {
        pregunta: "Hangi bilgi sonucu en çok etkiler?",
        respuesta:
          "Fiyatla kira arasındaki oran, kredi faizi ve konut fiyatlarının ne hızla arttığı. Fiyat artışını ve yatırım getirisini değiştirerek sonucun ne kadar oynadığını görün.",
      },
    ],
    glosario: [
      { termino: "Net varlık", definicion: "Sahip olduklarınızdan borçlarınızın düşülmesiyle kalan tutar." },
      { termino: "Değer artışı", definicion: "Konutun değerinin her yıl ne kadar yükseldiği." },
      { termino: "Fırsat maliyeti", definicion: "Peşinatı yatırımda değerlendirseydiniz kazanacağınız getiri." },
    ],
  };
};
