import { contenidoPorEscritura } from "../../comun/chino";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

// «打七折» es pagar el 70 % (30 % menos) y se confunde con «減 30%»: el texto dice siempre «減價 X%».
export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const precio = montoEjemplo(ctx, 80);
    const m = (n: number) => formatearMonto(ctx, n);
    return {
      h1: "折扣計算機",
      title: tituloQueEntre(`折扣計算機｜${ctx.nombrePais}`, "折扣計算機"),
      description: "算出折後價和省下的金額，也能算疊加折扣，例如先減價 30% 再減 10%，總共便宜多少。",
      intro: ["輸入原價和折扣，馬上就知道要付多少、省了多少。", "如果還有第二層折扣也一起填：連續兩次折扣從來不是直接相加。"],
      comoSeCalcula: ["折後價 ＝ 原價 ×（1 − 折扣 ÷ 100）。", "第二層折扣是套用在已經打過折的價格上。", "省下的金額 ＝ 原價 − 折後價。"],
      ejemplo: [
        `原價 ${m(precio)} 的商品減價 25%，要付 ${m(precio * 0.75)}。`,
        `先減價 30% 再減 10%，要付 ${m(precio * 0.7 * 0.9)}：總共減價 37%，不是 40%。`,
      ],
      faq: [
        { pregunta: "折扣金額怎麼算？", respuesta: "把價格乘以折扣百分比再除以 100，就是省下的金額。用原價減掉它，就是要付的錢。" },
        { pregunta: "減價 30% 再減 10%，等於減價 40% 嗎？", respuesta: "不等於。第二次折扣是套用在已經降過的價格上，所以總共是減價 37%。" },
        { pregunta: "知道折後價，怎麼回推原價？", respuesta: `用折後價除以（1 − 折扣 ÷ 100）。減價 25% 就除以 ${formatearNumero(ctx, 0.75, 2)}。` },
      ],
      glosario: [
        { termino: "折扣", definicion: "從原價扣掉的百分比。" },
        { termino: "實際折扣", definicion: "有多層折扣時，總共便宜了百分之多少。" },
      ],
    };
  },
  (ctx) => {
    const precio = montoEjemplo(ctx, 80);
    const m = (n: number) => formatearMonto(ctx, n);
    return {
      h1: "折扣计算器",
      title: tituloQueEntre(`折扣计算器｜${ctx.nombrePais}`, "折扣计算器"),
      description: "算出折后价和节省的金额，也能算叠加折扣，例如先降价 30% 再降 10%，总共便宜多少。",
      intro: ["输入原价和折扣，马上就知道要付多少、省了多少。", "如果还有第二层折扣也一起填：连续两次折扣从来不是直接相加。"],
      comoSeCalcula: ["折后价 ＝ 原价 ×（1 − 折扣 ÷ 100）。", "第二层折扣是用在已经打过折的价格上。", "节省的金额 ＝ 原价 − 折后价。"],
      ejemplo: [
        `原价 ${m(precio)} 的商品降价 25%，要付 ${m(precio * 0.75)}。`,
        `先降价 30% 再降 10%，要付 ${m(precio * 0.7 * 0.9)}：总共降价 37%，不是 40%。`,
      ],
      faq: [
        { pregunta: "折扣金额怎么算？", respuesta: "把价格乘以折扣百分比再除以 100，就是节省的金额。用原价减去它，就是要付的钱。" },
        { pregunta: "降价 30% 再降 10%，等于降价 40% 吗？", respuesta: "不等于。第二次折扣是用在已经降过的价格上，所以总共是降价 37%。" },
        { pregunta: "知道折后价，怎么倒推原价？", respuesta: `用折后价除以（1 − 折扣 ÷ 100）。降价 25% 就除以 ${formatearNumero(ctx, 0.75, 2)}。` },
      ],
      glosario: [
        { termino: "折扣", definicion: "从原价中扣掉的百分比。" },
        { termino: "实际折扣", definicion: "有多层折扣时，总共便宜了百分之多少。" },
      ],
    };
  },
);
