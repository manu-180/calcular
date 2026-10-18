import { contenidoPorEscritura, esHongKong } from "../../comun/chino";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { area, FT2_POR_M2 } from "../definicion";

const EN_L_IMP = area("rectangulo", 16, 12) + area("rectangulo", 10, 6);
const EN_L = area("rectangulo", 5, 4) + area("rectangulo", 3, 2);

// Taiwán mide en 坪 y Hong Kong en 平方呎: la tercera pregunta cambia de unidad local.
export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
    const imperial = ctx.unidades === "imperial";
    const local = esHongKong(ctx.locale)
      ? { pregunta: "平方米和平方呎怎麼換算？", respuesta: `1 平方米約等於 ${n(FT2_POR_M2)} 平方呎。平方米乘以 ${n(FT2_POR_M2)} 就是平方呎。` }
      : { pregunta: "平方公尺和坪怎麼換算？", respuesta: `1 坪約等於 ${n(400 / 121)} 平方公尺。平方公尺除以 ${n(400 / 121)} 就是坪數。` };
    return {
      h1: "面積計算機",
      title: tituloQueEntre(`面積計算機（平方公尺）｜${ctx.nombrePais}`, `面積計算機｜${ctx.nombrePais}`, "面積計算機"),
      description: "計算房間、地板或土地的面積：支援長方形、三角形和圓形，最多可以把五個區塊加在一起。",
      intro: ["選擇形狀並輸入尺寸。如果空間不是單純的長方形，就拆成幾個區塊，計算機會幫您加總。", imperial ? "結果也會換算成平方公尺。" : "結果也會換算成平方英尺。"],
      comoSeCalcula: ["長方形：長 × 寬。", "三角形：底 × 高 ÷ 2。", `圓形：π × 半徑 × 半徑，半徑是直徑的一半。1 平方公尺等於 ${n(FT2_POR_M2)} 平方英尺。`],
      ejemplo: [
        imperial
          ? `L 形客廳可以拆成 16 × 12 英尺和 10 × 6 英尺兩個長方形，合計 ${n(EN_L_IMP, 0)} 平方英尺。`
          : `L 形客廳可以拆成 5 × 4 公尺和 3 × 2 公尺兩個長方形，合計 ${n(EN_L, 0)} 平方公尺。`,
        `直徑 2 ${imperial ? "英尺" : "公尺"}的圓桌，面積是 ${n(area("circulo", 2, 0))} ${imperial ? "平方英尺" : "平方公尺"}。`,
      ],
      faq: [
        { pregunta: "房間面積怎麼算？", respuesta: "量出長和寬（公尺）後相乘。4 × 3 公尺的房間就是 12 平方公尺。" },
        { pregunta: "尺寸是公分怎麼辦？", respuesta: `先換成公尺：公分除以 100。350 公分就是 ${n(3.5, 1)} 公尺。` },
        local,
      ],
      glosario: [
        { termino: "平方公尺（m²）", definicion: "每邊 1 公尺的正方形面積。" },
        { termino: "平方英尺（ft²）", definicion: "每邊 1 英尺的正方形面積。" },
      ],
    };
  },
  (ctx) => {
    const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
    const imperial = ctx.unidades === "imperial";
    return {
      h1: "面积计算器",
      title: tituloQueEntre(`面积计算器（平方米）｜${ctx.nombrePais}`, `面积计算器｜${ctx.nombrePais}`, "面积计算器"),
      description: "计算房间、地面或土地的面积：支持长方形、三角形和圆形，最多可以把五个区域加在一起。",
      intro: ["选择形状并输入尺寸。如果空间不是简单的长方形，就拆成几个区域，计算器会帮您求和。", imperial ? "结果也会换算成平方米。" : "结果也会换算成平方英尺。"],
      comoSeCalcula: ["长方形：长 × 宽。", "三角形：底 × 高 ÷ 2。", `圆形：π × 半径 × 半径，半径是直径的一半。1 平方米等于 ${n(FT2_POR_M2)} 平方英尺。`],
      ejemplo: [
        imperial
          ? `L 形客厅可以拆成 16 × 12 英尺和 10 × 6 英尺两个长方形，合计 ${n(EN_L_IMP, 0)} 平方英尺。`
          : `L 形客厅可以拆成 5 × 4 米和 3 × 2 米两个长方形，合计 ${n(EN_L, 0)} 平方米。`,
        `直径 2 ${imperial ? "英尺" : "米"}的圆桌，面积是 ${n(area("circulo", 2, 0))} ${imperial ? "平方英尺" : "平方米"}。`,
      ],
      faq: [
        { pregunta: "房间面积怎么算？", respuesta: "量出长和宽（米）后相乘。4 × 3 米的房间就是 12 平方米。" },
        { pregunta: "尺寸是厘米怎么办？", respuesta: `先换成米：厘米除以 100。350 厘米就是 ${n(3.5, 1)} 米。` },
        { pregunta: "平方米和平方英尺怎么换算？", respuesta: `乘以 ${n(FT2_POR_M2)}。20 平方米约等于 ${n(20 * FT2_POR_M2)} 平方英尺。` },
      ],
      glosario: [
        { termino: "平方米（m²）", definicion: "每边 1 米的正方形面积。" },
        { termino: "平方英尺（ft²）", definicion: "每边 1 英尺的正方形面积。" },
      ],
    };
  },
);
