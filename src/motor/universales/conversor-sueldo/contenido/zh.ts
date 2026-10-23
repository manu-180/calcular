import { contenidoPorEscritura } from "../../comun/chino";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const anual = montoEjemplo(ctx, 50000);
    const hora = montoEjemplo(ctx, 20);
    return {
      h1: "時薪、月薪與年薪換算",
      title: tituloQueEntre(`時薪、月薪與年薪換算｜${ctx.nombrePais}`, "時薪年薪換算"),
      description: "依實際工作時數和支薪週數，把薪資在時薪、日薪、週薪、月薪和年薪之間互相換算。",
      intro: ["您的月薪換算成時薪是多少？用時薪計算的工作，一年能賺多少？輸入金額、選擇單位，其他單位都會列出來。", "可以用來比較工作機會、估算加班費，或看看自己的時間值多少。"],
      comoSeCalcula: ["先把所有金額換算成年薪。", "時薪 ＝ 年薪 ÷（每週工作時數 × 支薪週數）。", "日薪 ＝ 年薪 ÷（每週工作天數 × 支薪週數）；週薪 ＝ 年薪 ÷ 支薪週數。", "月薪 ＝ 年薪 ÷ 12；半月薪 ＝ 年薪 ÷ 24。"],
      ejemplo: [`年薪 ${m(anual)}、每週工作 40 小時，時薪 ${m(anual / 2080)}，月薪 ${m(anual / 12)}。`, `時薪 ${m(hora)} 的全職工作，一年是 ${m(hora * 2080)}。`],
      faq: [
        { pregunta: "一年有幾個工作小時？", respuesta: `每週 40 小時、支薪 52 週的話，是 ${formatearNumero(ctx, 2080)} 小時。所以速算時，時薪乘以約 ${formatearNumero(ctx, 2000)} 就差不多是年薪。` },
        { pregunta: "為什麼週薪乘以 4 不等於月薪？", respuesta: `因為一個月平均有 ${formatearNumero(ctx, 52 / 12, 2)} 週，不是 4 週。週薪換月薪要乘以 52 再除以 12。` },
        { pregunta: "有包含獎金或稅嗎？", respuesta: "沒有，只是把同一筆金額換算成不同單位。如果有獎金，比較工作機會時請另外加上。" },
      ],
      glosario: [
        { termino: "稅前薪資", definicion: "扣稅和各項扣款之前的薪資。" },
        { termino: "支薪週數", definicion: "一年中有領薪水的週數。" },
      ],
    };
  },
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const anual = montoEjemplo(ctx, 50000);
    const hora = montoEjemplo(ctx, 20);
    return {
      h1: "时薪、月薪和年薪换算",
      title: tituloQueEntre(`时薪、月薪和年薪换算｜${ctx.nombrePais}`, "时薪年薪换算"),
      description: "根据实际工作时间和计薪周数，把工资在时薪、日薪、周薪、月薪和年薪之间互相换算。",
      intro: ["您的月薪换算成时薪是多少？按时薪算的工作，一年能挣多少？输入金额、选择单位，其他单位都会列出来。", "可以用来比较工作机会、估算加班费，或者看看自己的时间值多少钱。"],
      comoSeCalcula: ["先把所有金额换算成年薪。", "时薪 ＝ 年薪 ÷（每周工作小时数 × 计薪周数）。", "日薪 ＝ 年薪 ÷（每周工作天数 × 计薪周数）；周薪 ＝ 年薪 ÷ 计薪周数。", "月薪 ＝ 年薪 ÷ 12；半月薪 ＝ 年薪 ÷ 24。"],
      ejemplo: [`年薪 ${m(anual)}、每周工作 40 小时，时薪 ${m(anual / 2080)}，月薪 ${m(anual / 12)}。`, `时薪 ${m(hora)} 的全职工作，一年是 ${m(hora * 2080)}。`],
      faq: [
        { pregunta: "一年有多少个工作小时？", respuesta: `每周 40 小时、计薪 52 周的话，是 ${formatearNumero(ctx, 2080)} 小时。所以速算时，时薪乘以约 ${formatearNumero(ctx, 2000)} 就差不多是年薪。` },
        { pregunta: "为什么周薪乘以 4 不等于月薪？", respuesta: `因为一个月平均有 ${formatearNumero(ctx, 52 / 12, 2)} 周，不是 4 周。周薪换月薪要乘以 52 再除以 12。` },
        { pregunta: "包括奖金或税吗？", respuesta: "不包括，只是把同一笔金额换算成不同单位。如果有奖金，比较工作机会时请另外加上。" },
      ],
      glosario: [
        { termino: "税前工资", definicion: "扣税和各项扣款之前的工资。" },
        { termino: "计薪周数", definicion: "一年中有工资的周数。" },
      ],
    };
  },
);
