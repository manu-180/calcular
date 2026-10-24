import { contenidoArabe } from "../../comun/arabe";
import { pluralAr } from "../../../i18n/arabe";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

// Detrás de «خلال» y «يستغرق» el dual va como «شهرين».
const meses = (n: number) => pluralAr(n, { uno: "شهر واحد", dos: "شهرين", pocos: "{n} أشهر", muchos: "{n} شهرًا", otros: "{n} شهر" });

export const contenidoAr: ContenidoUniversal = contenidoArabe((ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  const conFijo = saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2);
  const conMinimo = saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2);
  return {
    h1: "حاسبة سداد بطاقة الائتمان",
    title: tituloQueEntre(`حاسبة سداد بطاقة الائتمان في ${ctx.nombrePais}`, "حاسبة سداد بطاقة الائتمان", "سداد بطاقة الائتمان"),
    description: "اعرف كم شهرًا تحتاج لسداد بطاقة الائتمان وكم تدفع من فوائد، سواء دفعت مبلغًا ثابتًا أو الحد الأدنى للسداد.",
    intro: [
      "بطاقة الائتمان غالبًا أغلى دين عليك. ودفع الحد الأدنى وحده يطيل السداد سنوات ويراكم الفوائد.",
      "أدخل الرصيد ومعدل الفائدة السنوي وما تستطيع دفعه كل شهر. نعرض لك متى تنتهي، والفوائد التي تدفعها، وخطة السداد شهرًا بشهر.",
    ],
    comoSeCalcula: [
      "كل شهر تُضاف الفائدة: الرصيد × معدل الفائدة السنوي ÷ 12.",
      "ثم تُخصم الدفعة. مع الحد الأدنى تكون الدفعة نسبة مما تدين به، على ألا تقل عن مبلغ محدد.",
      "يتكرر ذلك حتى يصل الرصيد إلى صفر. وإذا لم تكن الدفعة أكبر من الفائدة فلن ينخفض الدين أبدًا.",
    ],
    ejemplo: [
      `رصيد قدره ${m(saldo)} بمعدل فائدة سنوي 22%، مع دفع ${m(fijo)} كل شهر، يُسدَّد خلال ${meses(conFijo.meses)} بفوائد قدرها ${m(conFijo.intereses)}.`,
      `ودفع حد أدنى قدره 3% فقط يستغرق ${meses(conMinimo.meses)} وترتفع الفوائد إلى ${m(conMinimo.intereses)}.`,
    ],
    faq: [
      {
        pregunta: "ماذا يحدث إذا دفعت الحد الأدنى فقط؟",
        respuesta:
          "الحد الأدنى يصغر كلما صغر الرصيد، فتدفع أقل كل شهر ويمتد الدين سنوات. إن استطعت، فادفع مبلغًا ثابتًا أعلى، ولو بزيادة بسيطة.",
      },
      {
        pregunta: "هل أحوّل رصيد البطاقة إلى قرض شخصي؟",
        respuesta: "إذا كان معدل فائدة القرض أقل بكثير من معدل البطاقة، فغالبًا يستحق ذلك. قارن إجمالي الفوائد في الخيارين مع الرسوم.",
      },
      {
        pregunta: "أي بطاقة أسدد أولًا؟",
        respuesta: "ادفع الحد الأدنى في كل البطاقات، وخصص الباقي للبطاقة ذات معدل الفائدة الأعلى. بهذا تدفع أقل قدر من الفوائد في المجموع.",
      },
    ],
    glosario: [
      { termino: "الحد الأدنى للسداد", definicion: "أقل مبلغ يمكنك دفعه في الشهر من دون رسوم تأخير. ولا يسدد الدين." },
      { termino: "معدل الفائدة السنوي", definicion: "المعدل السنوي الذي تحسبه البطاقة على الرصيد المرحَّل." },
    ],
  };
});
