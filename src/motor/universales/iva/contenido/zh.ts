import { contenidoPorEscritura } from "../../comun/chino";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const tasa = `{{${ctx.datos.tasa}}}`;
    const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
    return {
      h1: `${ctx.nombrePais}營業稅計算機`,
      title: tituloQueEntre(`營業稅計算機（${tasa}）｜${ctx.nombrePais}`, `營業稅計算機（${tasa}）`, "營業稅計算機"),
      description: `任何價格都能一次加上或扣掉 ${tasa} 的營業稅：顯示未稅價格、稅額和含稅總額，精確到元。`,
      intro: [`這裡採用的${ctx.nombrePais}一般稅率是 ${tasa}。`, "選擇要在未稅價格上加稅，還是從含稅價格中扣稅，再輸入金額。"],
      comoSeCalcula: ["加稅：稅額 ＝ 未稅價格 × 稅率 ÷ 100；含稅價格 ＝ 未稅價格 ＋ 稅額。", "扣稅：未稅價格 ＝ 含稅價格 ÷（1 ＋ 稅率 ÷ 100），稅額是兩者的差。", "適用不同稅率的商品，可以填在「其他稅率」。"],
      ejemplo: [`要在 ${precio} 加稅，就把它乘以 ${tasa}，再加回價格。`, `想知道含稅 ${precio} 裡有多少稅，就除以 1 加稅率，再用原價減掉。`],
      faq: [
        { pregunta: "怎麼從含稅價格扣掉營業稅？", respuesta: "把價格除以 1 加上稅率（小數），得到的就是未稅價格，差額就是稅額。" },
        { pregunta: "為什麼不能直接從總額扣掉稅率？", respuesta: "因為稅是用比較小的未稅價格算出來的。直接從總額扣掉稅率，會扣太多。" },
        { pregunta: `所有東西都是 ${tasa} 嗎？`, respuesta: "不一定。有些商品或服務適用不同稅率，或是免稅。這時請用「其他稅率」。" },
      ],
      glosario: [
        { termino: "營業稅", definicion: "加在商品和服務價格上的稅。其他國家稱為加值稅、VAT 或 GST。" },
        { termino: "未稅價格", definicion: "加稅之前的價格。" },
      ],
    };
  },
  (ctx) => {
    const tasa = `{{${ctx.datos.tasa}}}`;
    const precio = formatearMonto(ctx, montoEjemplo(ctx, 100));
    return {
      h1: `${ctx.nombrePais}增值税计算器`,
      title: tituloQueEntre(`增值税计算器（${tasa}）｜${ctx.nombrePais}`, `增值税计算器（${tasa}）`, "增值税计算器"),
      description: `任何价格都能一次加上或扣除 ${tasa} 的增值税：显示不含税价格、税额和含税总额，精确到分。`,
      intro: [`这里采用的${ctx.nombrePais}标准税率是 ${tasa}。`, "选择要在不含税价格上加税，还是从含税价格中扣税，再输入金额。"],
      comoSeCalcula: ["加税：税额 ＝ 不含税价格 × 税率 ÷ 100；含税价格 ＝ 不含税价格 ＋ 税额。", "扣税：不含税价格 ＝ 含税价格 ÷（1 ＋ 税率 ÷ 100），税额是两者之差。", "适用不同税率的商品，可以填在“其他税率”。"],
      ejemplo: [`要在 ${precio} 上加税，就把它乘以 ${tasa}，再加回价格。`, `想知道含税 ${precio} 里有多少税，就除以 1 加税率，再用原价减去。`],
      faq: [
        { pregunta: "怎么从含税价格扣除增值税？", respuesta: "把价格除以 1 加上税率（小数），得到的就是不含税价格，差额就是税额。" },
        { pregunta: "为什么不能直接从总额扣掉税率？", respuesta: "因为税是按更小的不含税价格算出来的。直接从总额扣掉税率，会扣多了。" },
        { pregunta: `所有商品都是 ${tasa} 吗？`, respuesta: "不一定。有些商品或服务适用较低税率，或者免税。这时请用“其他税率”。" },
      ],
      glosario: [
        { termino: "增值税", definicion: "加在商品和服务价格上的税。有些国家称为 VAT 或 GST。" },
        { termino: "不含税价格", definicion: "加税之前的价格。" },
      ],
    };
  },
);
