import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

export const contenidoJa: ContenidoUniversal = (ctx) => {
  const m = (n: number) => formatearMonto(ctx, n);
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  const base = equilibrio(fijos, precio, variable);
  const meta = equilibrio(fijos + objetivo, precio, variable);
  return {
    h1: "損益分岐点の計算ツール",
    title: tituloQueEntre(`損益分岐点の計算ツール｜${ctx.nombrePais}`, "損益分岐点の計算ツール"),
    description: "費用をまかなうために毎月いくつ売り、いくら売り上げればいいかを計算します。目標の利益に必要な販売数もわかります。",
    intro: [
      "損益分岐点とは、利益も損失も出ない売上の水準です。それを下回れば赤字、上回れば黒字になります。",
      "固定費、売価、1個あたりの費用を入れると、費用をまかなうための販売数と、目標を達成するための販売数がわかります。",
    ],
    comoSeCalcula: [
      "限界利益 ＝ 売価 − 1個あたりの変動費",
      "損益分岐点の販売数 ＝ 固定費 ÷ 限界利益（切り上げ）",
      "損益分岐点の売上高 ＝ 固定費 ÷ （限界利益 ÷ 売価）",
      "目標利益がある場合は、それを固定費に足して同じ計算をします。",
    ],
    ejemplo: [
      `固定費${m(fijos)}、売価${m(precio)}、変動費${m(variable)}なら、1個売るごとに${m(precio - variable)}が残ります。`,
      `費用をまかなうには${formatearNumero(ctx, base.unidades)}個（${m(base.facturacion)}）、毎月${m(objetivo)}の利益を出すには${formatearNumero(ctx, meta.unidades)}個売る必要があります。`,
    ],
    faq: [
      {
        pregunta: "固定費と変動費の違いは？",
        respuesta: "固定費は売れなくても変わらない費用です（家賃、固定給、光熱費）。変動費は売るたびに増える費用です（仕入れ、材料、手数料、送料）。",
      },
      {
        pregunta: "損益分岐点を下げるには？",
        respuesta: "方法は3つです。売価を上げる、1個あたりの変動費を下げる、固定費を減らす。いちばん効果が大きいのは、たいてい売価です。",
      },
      {
        pregunta: "サービス業でも使えますか？",
        respuesta: "使えます。1時間、1回のセッション、1か月あたりの顧客1人などを「1個」と考えてください。それぞれの提供にかかる費用を変動費にします。",
      },
    ],
    glosario: [
      { termino: "損益分岐点", definicion: "売上と費用がちょうど同じになる水準です。" },
      { termino: "限界利益", definicion: "1つ売るごとに固定費の支払いに回せる金額です。" },
    ],
  };
};
