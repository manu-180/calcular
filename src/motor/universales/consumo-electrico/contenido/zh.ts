import { contenidoPorEscritura } from "../../comun/chino";
import { formatearMonto, formatearNumero, montoEjemplo, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

const KWH_MES = (1000 * 4 * 30) / 1000;

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const precio = montoEjemplo(ctx, 0.15);
    return {
      h1: "電費計算機",
      title: tituloQueEntre(`電費計算機｜${ctx.nombrePais}`, "電費計算機"),
      description: "依電器功率、使用時數和每度電價格，算出用電量，以及每天、每月和每年要付多少電費。",
      intro: ["輸入電器功率、使用時數和電費單上每度電（kWh）的價格，就能看到用電量和電費。", "可以用來找出哪個電器最耗電：冷氣、暖氣、冰箱或電腦。"],
      comoSeCalcula: ["每日用電度數（kWh）＝ 功率（W）× 使用時數 ÷ 1000。", "每月度數 ＝ 每日度數 × 使用天數；一年是每月的 12 倍。", "電費 ＝ 度數 × 每度電價格。"],
      ejemplo: [`1000 W 的電器每天用 4 小時，每天用 4 度電，每月 ${formatearNumero(ctx, KWH_MES)} 度。`, `每度 ${m(precio)}，每月電費是 ${m(KWH_MES * precio)}。`],
      faq: [
        { pregunta: "一度電（kWh）是多少？", respuesta: "1000 W 的電器使用一小時所消耗的電量，也就是電費單上的計價單位。" },
        { pregunta: "冰箱整天都在全功率運轉嗎？", respuesta: "不是。壓縮機會反覆啟動和停止。這類電器建議以每天約 8 到 10 小時計算，而不是 24 小時。" },
        { pregunta: "為什麼算出來和電費單不完全一樣？", respuesta: "電費單還會加上基本費、稅金，有時還有分段累進費率。這裡只算這個電器本身的用電。" },
      ],
      glosario: [
        { termino: "瓦（W）", definicion: "功率單位：電器每秒消耗多少能量。" },
        { termino: "度（kWh）", definicion: "1000 W 使用一小時的電量，電費就是按這個單位計算。" },
      ],
    };
  },
  (ctx) => {
    const m = (n: number) => formatearMonto(ctx, n);
    const precio = montoEjemplo(ctx, 0.15);
    return {
      h1: "电费计算器",
      title: tituloQueEntre(`电费计算器｜${ctx.nombrePais}`, "电费计算器"),
      description: "根据电器功率、使用时长和每度电价格，算出用电量，以及每天、每月和每年要交多少电费。",
      intro: ["输入电器功率、使用时长和电费账单上每度电（kWh）的价格，就能看到用电量和电费。", "可以用来找出哪个电器最耗电：空调、取暖器、冰箱还是电脑。"],
      comoSeCalcula: ["每日用电度数（kWh）＝ 功率（W）× 使用时长 ÷ 1000。", "每月度数 ＝ 每日度数 × 使用天数；一年是每月的 12 倍。", "电费 ＝ 度数 × 每度电价格。"],
      ejemplo: [`1000 W 的电器每天用 4 小时，每天用 4 度电，每月 ${formatearNumero(ctx, KWH_MES)} 度。`, `每度 ${m(precio)}，每月电费是 ${m(KWH_MES * precio)}。`],
      faq: [
        { pregunta: "一度电（kWh）是多少？", respuesta: "1000 W 的电器使用一小时所消耗的电量，也就是电费账单上的计价单位。" },
        { pregunta: "冰箱整天都在满功率运转吗？", respuesta: "不是。压缩机会反复启动和停止。这类电器建议按每天约 8 到 10 小时计算，而不是 24 小时。" },
        { pregunta: "为什么算出来和电费账单不完全一样？", respuesta: "电费账单还会加上基本费、税费，有时还有阶梯电价。这里只算这个电器本身的用电。" },
      ],
      glosario: [
        { termino: "瓦（W）", definicion: "功率单位：电器每秒消耗多少能量。" },
        { termino: "度（kWh）", definicion: "1000 W 使用一小时的电量，电费就是按这个单位计算的。" },
      ],
    };
  },
);
