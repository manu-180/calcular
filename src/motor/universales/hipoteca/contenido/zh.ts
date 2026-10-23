import { contenidoPorEscritura, esHongKong } from "../../comun/chino";
import { cuotaFrancesa, interesesTotales } from "../../prestamo/definicion";
import { formatearMonto, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const precio = montoEjemplo(ctx, 200000);
    const prestado = precio * 0.8;
    const hk = esHongKong(ctx.locale);
    const p = hk ? "按揭" : "房貸";
    const e = hk ? "首期" : "頭期款";
    return {
      h1: `${p}試算`,
      title: tituloQueEntre(`${p}試算（每月還款）｜${ctx.nombrePais}`, `${p}試算｜${ctx.nombrePais}`, `${p}試算`),
      description: `依房價、${e}、利率和年期，算出${p}每月要還多少，並看到利息總額和每年剩餘本金的變化。`,
      intro: [`${p}是大多數家庭一生中最大的一筆負債。和銀行談之前，先把整體數字看清楚。`, `輸入房價、${e}、利率和年期。如果有和${p}一起繳的稅費或保險，也一起填入，看看實際每月要付多少。`],
      comoSeCalcula: [`貸款金額 ＝ 房價 − ${e}。`, "以年利率除以 12 的月利率和換算成月數的年期，算出每月固定還款。", "逐年加總已付利息和已還本金，並顯示尚未還清的金額。"],
      ejemplo: [
        `${m(precio)} 的房子付 20% ${e}，貸款金額是 ${m(prestado)}。年利率 7%、30 年，每月還款 ${m(cuotaFrancesa(prestado, 7, 360))}。`,
        `30 年下來利息共 ${m(interesesTotales(prestado, 7, 360))}。改成 15 年，每月還款升到 ${m(cuotaFrancesa(prestado, 7, 180))}，但利息降到 ${m(interesesTotales(prestado, 7, 180))}。`,
      ],
      faq: [
        { pregunta: `${e}要準備多少？`, respuesta: `依銀行和地區而不同。${e}越多，借得越少，每月還款和利息也越少。另外也要預留購屋雜費。` },
        { pregunta: "為什麼前幾年本金幾乎沒減少？", respuesta: "利息是按尚未還清的金額計算。一開始餘額大，所以大部分還款都是利息，之後比例才會反轉。" },
        { pregunta: "年期越短越好嗎？", respuesta: "如果負擔得起較高的月付，是的，利息會少很多。負擔不起的話，選較長年期、有餘力時提前還款也可以。" },
        { pregunta: "每月還款會變嗎？", respuesta: "固定利率的話不會變；浮動利率則可能變動。這個計算機假設整段期間利率不變。" },
      ],
      glosario: [
        { termino: e, definicion: "房價中用自有資金支付的部分。" },
        { termino: "本金", definicion: "借來、還需要償還的金額。" },
        { termino: "剩餘本金", definicion: "貸款中還沒還清的金額。" },
      ],
    };
  },
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const precio = montoEjemplo(ctx, 200000);
    const prestado = precio * 0.8;
    return {
      h1: "房贷计算器",
      title: tituloQueEntre(`房贷计算器（月供）｜${ctx.nombrePais}`, `房贷计算器｜${ctx.nombrePais}`, "房贷计算器"),
      description: "根据房价、首付、利率和年限，算出房贷月供，并看到利息总额和每年剩余本金的变化。",
      intro: ["房贷是大多数家庭一生中最大的一笔负债。和银行谈之前，先把整体数字看清楚。", "输入房价、首付、利率和年限。如果有和房贷一起交的物业费或保险，也一起填入，看看实际每月要付多少。"],
      comoSeCalcula: ["贷款金额 ＝ 房价 − 首付。", "用年利率除以 12 得到的月利率和换算成月数的年限，算出每月固定月供。", "逐年汇总已付利息和已还本金，并显示尚未还清的金额。"],
      ejemplo: [
        `${m(precio)} 的房子付 20% 首付，贷款金额是 ${m(prestado)}。年利率 7%、30 年，月供 ${m(cuotaFrancesa(prestado, 7, 360))}。`,
        `30 年下来利息共 ${m(interesesTotales(prestado, 7, 360))}。改成 15 年，月供升到 ${m(cuotaFrancesa(prestado, 7, 180))}，但利息降到 ${m(interesesTotales(prestado, 7, 180))}。`,
      ],
      faq: [
        { pregunta: "首付要准备多少？", respuesta: "因银行和地区而异。首付越多，借得越少，月供和利息也越少。另外还要预留购房杂费。" },
        { pregunta: "为什么前几年本金几乎没减少？", respuesta: "利息是按尚未还清的金额计算的。一开始余额大，所以大部分月供都是利息，之后比例才会反转。" },
        { pregunta: "年限越短越好吗？", respuesta: "如果负担得起较高的月供，是的，利息会少很多。负担不起的话，选较长年限、有余力时提前还款也可以。" },
        { pregunta: "月供会变吗？", respuesta: "固定利率的话不会变；浮动利率则可能变化。这个计算器假设整个期间利率不变。" },
      ],
      glosario: [
        { termino: "首付", definicion: "房价中用自有资金支付的部分。" },
        { termino: "本金", definicion: "借来、还需要偿还的金额。" },
        { termino: "剩余本金", definicion: "贷款中还没还清的金额。" },
      ],
    };
  },
);
