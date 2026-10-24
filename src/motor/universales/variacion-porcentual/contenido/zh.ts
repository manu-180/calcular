import { contenidoPorEscritura } from "../../comun/chino";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const antes = montoEjemplo(ctx, 40);
    const despues = antes * 1.25;
    const m = (n: number) => formatearMonto(ctx, n);
    return {
      h1: "漲跌幅計算機",
      title: tituloQueEntre(`漲跌幅計算機｜${ctx.nombrePais}`, "漲跌幅計算機"),
      description: "算出價格、薪資、營業額等隨時間變動的數字，上升或下降了百分之多少，以及回到原值需要變動多少。",
      intro: ["輸入原本和後來的數值，就能看到漲跌百分比和差額。", "也會顯示要回到原值需要變動多少，這幾乎從來不是同一個百分比。"],
      comoSeCalcula: [
        "變動百分比 ＝（後來的數值 − 原本的數值）÷ 原本的數值 × 100。",
        "結果為正代表上升，為負代表下降。",
        "如果原本的數值是負數，會除以它的絕對值，讓正負號仍能看出是否改善。",
      ],
      ejemplo: [`原本 ${m(antes)} 的東西現在賣 ${m(despues)}，漲了 25%。`, "要回到原價，得跌 20%，而不是 25%。"],
      faq: [
        { pregunta: "漲幅怎麼算？", respuesta: "用後來的數值減去原本的數值，除以原本的數值，再乘以 100。從 80 到 100：20 ÷ 80 × 100 ＝ 25%。" },
        { pregunta: "跌幅怎麼算？", respuesta: "算法一樣。從 100 到 80：−20 ÷ 100 × 100 ＝ −20%，也就是下降 20%。" },
        { pregunta: "為什麼漲 25% 再跌 25% 不會抵銷？", respuesta: "因為兩次的基數不同。80 漲 25% 是 100，但 100 跌 25% 是 75。" },
        { pregunta: "百分比和百分點有什麼不同？", respuesta: "利率從 10% 變成 12%，是上升 2 個百分點；以變動百分比來看，則是上升 20%。" },
      ],
      glosario: [
        { termino: "變動百分比", definicion: "數值變動的幅度，以原本數值的百分比表示。" },
        { termino: "百分點", definicion: "兩個百分比之間的直接差距。" },
      ],
    };
  },
  (ctx) => {
    const antes = montoEjemplo(ctx, 40);
    const despues = antes * 1.25;
    const m = (n: number) => formatearMonto(ctx, n);
    return {
      h1: "涨跌幅计算器",
      title: tituloQueEntre(`涨跌幅计算器｜${ctx.nombrePais}`, "涨跌幅计算器"),
      description: "算出价格、工资、销售额等随时间变化的数字，上涨或下降了百分之多少，以及回到原值需要变化多少。",
      intro: ["输入原来和后来的数值，就能看到涨跌百分比和差额。", "还会显示要回到原值需要变化多少，这几乎从来不是同一个百分比。"],
      comoSeCalcula: [
        "变化百分比 ＝（后来的数值 − 原来的数值）÷ 原来的数值 × 100。",
        "结果为正表示上涨，为负表示下降。",
        "如果原来的数值是负数，会除以它的绝对值，让正负号仍能看出是否改善。",
      ],
      ejemplo: [`原来 ${m(antes)} 的东西现在卖 ${m(despues)}，涨了 25%。`, "要回到原价，得跌 20%，而不是 25%。"],
      faq: [
        { pregunta: "涨幅怎么算？", respuesta: "用后来的数值减去原来的数值，除以原来的数值，再乘以 100。从 80 到 100：20 ÷ 80 × 100 ＝ 25%。" },
        { pregunta: "跌幅怎么算？", respuesta: "算法一样。从 100 到 80：−20 ÷ 100 × 100 ＝ −20%，也就是下降 20%。" },
        { pregunta: "为什么涨 25% 再跌 25% 不会抵消？", respuesta: "因为两次的基数不同。80 涨 25% 是 100，但 100 跌 25% 是 75。" },
        { pregunta: "百分比和百分点有什么不同？", respuesta: "利率从 10% 变成 12%，是上升 2 个百分点；按变化百分比算，则是上升 20%。" },
      ],
      glosario: [
        { termino: "变化百分比", definicion: "数值变化的幅度，以原来数值的百分比表示。" },
        { termino: "百分点", definicion: "两个百分比之间的直接差距。" },
      ],
    };
  },
);
