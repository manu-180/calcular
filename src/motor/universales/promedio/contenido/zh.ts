import { contenidoPorEscritura } from "../../comun/chino";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
    return {
      h1: "加權平均計算機",
      title: tituloQueEntre(`加權平均計算機｜${ctx.nombrePais}`, "加權平均計算機"),
      description: "計算成績的簡單平均或加權平均，最多可輸入 10 個數值，以及每個數值的權重：百分比、學分或次數。",
      intro: ["輸入每個成績和它占的比重，就能看到加權平均，旁邊也列出簡單平均。", "適用於中小學或大學成績，也適用於任何各數值份量不同的平均。"],
      comoSeCalcula: ["簡單平均 ＝ 數值總和 ÷ 數值個數。", "加權平均 ＝（數值 × 權重）的總和 ÷ 權重總和。", "權重加起來不必等於 100，因為最後會除以權重總和。"],
      ejemplo: [
        `7 分占 20%、8 分占 30%、9 分占 50%，加權平均是 ${n(8.3)} 分。`,
        `這三個成績的簡單平均是 ${n(8)} 分：9 分的比重最大，把加權平均拉高了。`,
      ],
      faq: [
        { pregunta: "加權平均怎麼算？", respuesta: "把每個數值乘以它的權重後加總，再除以權重總和。" },
        { pregunta: "權重加起來不是 100% 怎麼辦？", respuesta: "沒關係。一科 3 學分、另一科 2 學分，就填 3 和 2，計算時會除以權重總和。" },
        { pregunta: "簡單平均和加權平均有什麼不同？", respuesta: "簡單平均裡每個數值的份量都一樣；加權平均則依各自的權重計算。" },
      ],
      glosario: [
        { termino: "權重", definicion: "一個數值在最終平均中占多少份量。" },
        { termino: "加權平均", definicion: "每個數值先乘以權重再求出的平均。" },
      ],
    };
  },
  (ctx) => {
    const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
    return {
      h1: "加权平均计算器",
      title: tituloQueEntre(`加权平均计算器｜${ctx.nombrePais}`, "加权平均计算器"),
      description: "计算成绩的简单平均或加权平均，最多可输入 10 个数值，以及每个数值的权重：百分比、学分或次数。",
      intro: ["输入每个成绩和它占的比重，就能看到加权平均，旁边也列出简单平均。", "适用于中小学或大学成绩，也适用于任何各数值分量不同的平均。"],
      comoSeCalcula: ["简单平均 ＝ 数值总和 ÷ 数值个数。", "加权平均 ＝（数值 × 权重）的总和 ÷ 权重总和。", "权重加起来不必等于 100，因为最后会除以权重总和。"],
      ejemplo: [
        `7 分占 20%、8 分占 30%、9 分占 50%，加权平均是 ${n(8.3)} 分。`,
        `这三个成绩的简单平均是 ${n(8)} 分：9 分的比重最大，把加权平均拉高了。`,
      ],
      faq: [
        { pregunta: "加权平均怎么算？", respuesta: "把每个数值乘以它的权重后求和，再除以权重总和。" },
        { pregunta: "权重加起来不是 100% 怎么办？", respuesta: "没关系。一门课 3 学分、另一门 2 学分，就填 3 和 2，计算时会除以权重总和。" },
        { pregunta: "简单平均和加权平均有什么不同？", respuesta: "简单平均里每个数值的分量都一样；加权平均则按各自的权重计算。" },
      ],
      glosario: [
        { termino: "权重", definicion: "一个数值在最终平均中占多少分量。" },
        { termino: "加权平均", definicion: "每个数值先乘以权重再求出的平均。" },
      ],
    };
  },
);
