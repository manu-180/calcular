import { contenidoPorEscritura } from "../../comun/chino";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal, type ContextoUniversal } from "../../tipos";
import { equilibrio } from "../definicion";

function datos(ctx: ContextoUniversal) {
  const fijos = montoEjemplo(ctx, 5000);
  const precio = montoEjemplo(ctx, 50);
  const variable = montoEjemplo(ctx, 30);
  const objetivo = montoEjemplo(ctx, 2000);
  return { fijos, precio, variable, objetivo, base: equilibrio(fijos, precio, variable), meta: equilibrio(fijos + objetivo, precio, variable) };
}

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const { fijos, precio, variable, objetivo, base, meta } = datos(ctx);
    return {
      h1: "損益兩平點計算機",
      title: tituloQueEntre(`損益兩平點計算機｜${ctx.nombrePais}`, "損益兩平點計算機"),
      description: "算出每月要賣幾件、營業額要多少才能打平成本，以及要達到目標利潤得賣多少。",
      intro: ["損益兩平點是不賺也不賠的銷售水準：低於它就虧損，高於它才開始獲利。", "輸入固定成本、售價和每件成本，我們告訴您要賣多少才能打平，以及達成目標要賣多少。"],
      comoSeCalcula: ["邊際貢獻 ＝ 售價 − 單位變動成本。", "損益兩平銷售量 ＝ 固定成本 ÷ 邊際貢獻，無條件進位。", "損益兩平營業額 ＝ 固定成本 ÷（邊際貢獻 ÷ 售價）。", "有目標利潤時，把它加進固定成本，再用同樣方法計算。"],
      ejemplo: [
        `固定成本 ${m(fijos)}、售價 ${m(precio)}、變動成本 ${m(variable)}，每賣一件留下 ${m(precio - variable)}。`,
        `要賣 ${formatearNumero(ctx, base.unidades)} 件（${m(base.facturacion)}）才能打平；想每月賺 ${m(objetivo)}，要賣 ${formatearNumero(ctx, meta.unidades)} 件。`,
      ],
      faq: [
        { pregunta: "固定成本和變動成本有什麼不同？", respuesta: "固定成本就算沒賣也不變：租金、固定薪資、水電。變動成本隨每筆銷售增加：進貨、材料、佣金、運費。" },
        { pregunta: "怎麼降低損益兩平點？", respuesta: "有三個方法：提高售價、降低單位變動成本，或削減固定成本。通常調整售價的效果最大。" },
        { pregunta: "服務業也適用嗎？", respuesta: "適用。一件可以是一小時、一堂課或每月一位客戶，把提供每一份服務的成本當作變動成本。" },
      ],
      glosario: [
        { termino: "損益兩平點", definicion: "營收剛好等於成本的銷售水準。" },
        { termino: "邊際貢獻", definicion: "每筆銷售能用來支付固定成本的金額。" },
      ],
    };
  },
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const { fijos, precio, variable, objetivo, base, meta } = datos(ctx);
    return {
      h1: "盈亏平衡点计算器",
      title: tituloQueEntre(`盈亏平衡点计算器｜${ctx.nombrePais}`, "盈亏平衡点计算器"),
      description: "算出每月要卖多少件、销售额要多少才能覆盖成本，以及要实现目标利润得卖多少。",
      intro: ["盈亏平衡点是不赚也不亏的销售水平：低于它就亏损，高于它才开始盈利。", "输入固定成本、售价和每件成本，我们告诉您要卖多少才能保本，以及实现目标要卖多少。"],
      comoSeCalcula: ["边际贡献 ＝ 售价 − 单位变动成本。", "盈亏平衡销量 ＝ 固定成本 ÷ 边际贡献，向上取整。", "盈亏平衡销售额 ＝ 固定成本 ÷（边际贡献 ÷ 售价）。", "有目标利润时，把它加进固定成本，再用同样方法计算。"],
      ejemplo: [
        `固定成本 ${m(fijos)}、售价 ${m(precio)}、变动成本 ${m(variable)}，每卖一件留下 ${m(precio - variable)}。`,
        `要卖 ${formatearNumero(ctx, base.unidades)} 件（${m(base.facturacion)}）才能保本；想每月赚 ${m(objetivo)}，要卖 ${formatearNumero(ctx, meta.unidades)} 件。`,
      ],
      faq: [
        { pregunta: "固定成本和变动成本有什么不同？", respuesta: "固定成本就算没卖也不变：房租、固定工资、水电。变动成本随每笔销售增加：进货、材料、佣金、运费。" },
        { pregunta: "怎么降低盈亏平衡点？", respuesta: "有三个办法：提高售价、降低单位变动成本，或者削减固定成本。通常调整售价的效果最大。" },
        { pregunta: "服务业也适用吗？", respuesta: "适用。一件可以是一小时、一节课或每月一位客户，把提供每一份服务的成本当作变动成本。" },
      ],
      glosario: [
        { termino: "盈亏平衡点", definicion: "收入刚好等于成本的销售水平。" },
        { termino: "边际贡献", definicion: "每笔销售能用来支付固定成本的金额。" },
      ],
    };
  },
);
