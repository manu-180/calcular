import { contenidoPorEscritura } from "../../comun/chino";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal, type ContextoUniversal } from "../../tipos";
import { saldar } from "../definicion";

const r2 = (n: number) => Math.round(n * 100) / 100;

function datos(ctx: ContextoUniversal) {
  const saldo = montoEjemplo(ctx, 2000);
  const fijo = montoEjemplo(ctx, 100);
  return {
    saldo,
    fijo,
    conFijo: saldar(saldo, 22, { modo: "fijo", fijo, porcentaje: 0, piso: 0 }, r2),
    conMinimo: saldar(saldo, 22, { modo: "minimo", fijo: 0, porcentaje: 3, piso: montoEjemplo(ctx, 25) }, r2),
  };
}

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const { saldo, fijo, conFijo, conMinimo } = datos(ctx);
    return {
      h1: "信用卡還款計算機",
      title: tituloQueEntre(`信用卡還款計算機｜${ctx.nombrePais}`, "信用卡還款計算機"),
      description: "算出還清信用卡要幾個月、要付多少利息，比較每月固定金額和只繳最低應繳金額兩種還法。",
      intro: ["信用卡通常是您所有債務裡最貴的一種。只繳最低應繳金額，會拖上好幾年、利息越滾越多。", "輸入欠款、年利率和每月能還的金額，我們會顯示何時還清、要付多少利息，以及每月的還款計畫。"],
      comoSeCalcula: ["每個月先加上利息：欠款 × 年利率 ÷ 12。", "再扣掉還款。選最低應繳時，還款是欠款的一個百分比，並有下限。", "重複到欠款歸零。如果還款不超過利息，債務就永遠不會減少。"],
      ejemplo: [
        `欠款 ${m(saldo)}、年利率 22%，每月還 ${m(fijo)}，${conFijo.meses} 個月還清，利息共 ${m(conFijo.intereses)}。`,
        `只繳 3% 的最低應繳，要 ${conMinimo.meses} 個月，利息增加到 ${m(conMinimo.intereses)}。`,
      ],
      faq: [
        { pregunta: "只繳最低應繳金額會怎樣？", respuesta: "欠款變少，最低應繳也跟著變少，所以每月負擔較輕，但債務會拖好幾年。可以的話，用高一點的固定金額還款，多一點也好。" },
        { pregunta: "要不要把卡債轉成信用貸款？", respuesta: "如果貸款利率明顯低於信用卡利率，通常划算。請連同手續費一起比較兩者的總利息。" },
        { pregunta: "該先還哪一張卡？", respuesta: "每張卡都繳最低應繳，剩下的錢全部還利率最高的那張。這樣總利息最少。" },
      ],
      glosario: [
        { termino: "最低應繳金額", definicion: "當月不會被收滯納金的最低還款，但還不清債務。" },
        { termino: "循環利率", definicion: "信用卡對未繳清的欠款收取的年利率。" },
      ],
    };
  },
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const { saldo, fijo, conFijo, conMinimo } = datos(ctx);
    return {
      h1: "信用卡还款计算器",
      title: tituloQueEntre(`信用卡还款计算器｜${ctx.nombrePais}`, "信用卡还款计算器"),
      description: "算出还清信用卡要几个月、要付多少利息，比较每月固定金额和只还最低还款额两种还法。",
      intro: ["信用卡通常是您所有债务里成本最高的一种。只还最低还款额，会拖上好几年、利息越滚越多。", "输入欠款、年利率和每月能还的金额，我们会显示何时还清、要付多少利息，以及每月的还款计划。"],
      comoSeCalcula: ["每个月先加上利息：欠款 × 年利率 ÷ 12。", "再扣掉还款。选最低还款时，还款是欠款的一个百分比，并有下限。", "重复到欠款归零。如果还款不超过利息，债务就永远不会减少。"],
      ejemplo: [
        `欠款 ${m(saldo)}、年利率 22%，每月还 ${m(fijo)}，${conFijo.meses} 个月还清，利息共 ${m(conFijo.intereses)}。`,
        `只还 3% 的最低还款额，要 ${conMinimo.meses} 个月，利息增加到 ${m(conMinimo.intereses)}。`,
      ],
      faq: [
        { pregunta: "只还最低还款额会怎样？", respuesta: "欠款变少，最低还款额也跟着变少，所以每月负担较轻，但债务会拖好几年。可以的话，用高一点的固定金额还款，多一点也好。" },
        { pregunta: "要不要把卡债转成个人贷款？", respuesta: "如果贷款利率明显低于信用卡利率，通常划算。请连同手续费一起比较两者的总利息。" },
        { pregunta: "该先还哪一张卡？", respuesta: "每张卡都还最低还款额，剩下的钱全部还利率最高的那张。这样总利息最少。" },
      ],
      glosario: [
        { termino: "最低还款额", definicion: "当月不会产生逾期的最低还款，但还不清债务。" },
        { termino: "年化利率", definicion: "信用卡对未还清的欠款收取的年利率。" },
      ],
    };
  },
);
