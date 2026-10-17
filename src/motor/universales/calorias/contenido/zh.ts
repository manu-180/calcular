import { contenidoPorEscritura } from "../../comun/chino";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { DEFICIT, FACTORES, mifflin, SUPERAVIT } from "../definicion";

const BASAL_IMPERIAL = mifflin("hombre", 35, 180 * 0.45359237, 70 * 2.54);
const BASAL_METRICO = mifflin("mujer", 30, 60, 165);

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
    const imperial = ctx.unidades === "imperial";
    return {
      h1: "每日熱量計算機",
      title: tituloQueEntre(`熱量計算機（TDEE）｜${ctx.nombrePais}`, "熱量計算機"),
      description: "依年齡、體重、身高和活動量，算出每天消耗多少熱量，以及要維持、減輕或增加體重該吃多少。",
      intro: ["填入基本資料和活動量，就能看到基礎代謝率和平常一天消耗的熱量。", "這只是大致的估計，不能取代醫師或營養師等專業人員的建議。"],
      comoSeCalcula: [
        `基礎代謝率（Mifflin-St Jeor 公式）：10 × 體重（公斤）＋ ${n(6.25, 2)} × 身高（公分）− 5 × 年齡，男性再加 5，女性再減 161。`,
        `維持熱量 ＝ 基礎代謝率 × 活動係數，係數從 ${n(1.2, 1)}（很少運動）到 ${n(1.9, 1)}（非常高）。`,
        `減重每天減 ${DEFICIT} 大卡，增重每天加 ${SUPERAVIT} 大卡：溫和、能持續的調整。`,
      ],
      ejemplo: imperial
        ? [
            `35 歲、體重 180 磅、身高 5 英尺 10 英寸的男性，基礎代謝率約 ${n(BASAL_IMPERIAL)} 大卡。`,
            `活動量很低時，他每天約需 ${n(BASAL_IMPERIAL * FACTORES.sedentaria)} 大卡來維持體重。`,
          ]
        : [
            `30 歲、體重 60 公斤、身高 165 公分的女性，基礎代謝率約 ${n(BASAL_METRICO)} 大卡。`,
            `中度活動時，她每天約需 ${n(BASAL_METRICO * FACTORES.moderada)} 大卡來維持體重。`,
          ],
      faq: [
        { pregunta: "什麼是基礎代謝率？", respuesta: "身體在完全休息時，用來呼吸、維持體溫和讓器官運作所需的能量。" },
        { pregunta: "想減重，每天該吃多少熱量？", respuesta: `常見的起點是比維持熱量每天少約 ${DEFICIT} 大卡。最好和專業人員一起訂定。` },
        { pregunta: "這個公式有多準確？", respuesta: "Mifflin-St Jeor 是最常用的公式之一，但算出的是平均值。遺傳、肌肉量和健康狀況都會影響實際消耗。" },
      ],
      glosario: [
        { termino: "大卡（kcal）", definicion: "食物所含能量和身體消耗能量的單位。" },
        { termino: "基礎代謝率", definicion: "身體在完全休息時消耗的熱量。" },
      ],
    };
  },
  (ctx) => {
    const n = (x: number, d = 0) => formatearNumero(ctx, x, d);
    const imperial = ctx.unidades === "imperial";
    return {
      h1: "每日热量计算器",
      title: tituloQueEntre(`热量计算器（TDEE）｜${ctx.nombrePais}`, "热量计算器"),
      description: "根据年龄、体重、身高和活动量，算出每天消耗多少热量，以及要保持、减轻或增加体重该吃多少。",
      intro: ["填写基本信息和活动量，就能看到基础代谢率和平常一天消耗的热量。", "这只是大致的估计，不能代替医生或营养师等专业人员的建议。"],
      comoSeCalcula: [
        `基础代谢率（Mifflin-St Jeor 公式）：10 × 体重（千克）＋ ${n(6.25, 2)} × 身高（厘米）− 5 × 年龄，男性再加 5，女性再减 161。`,
        `保持热量 ＝ 基础代谢率 × 活动系数，系数从 ${n(1.2, 1)}（很少运动）到 ${n(1.9, 1)}（非常高）。`,
        `减重每天减 ${DEFICIT} 千卡，增重每天加 ${SUPERAVIT} 千卡：温和、能坚持的调整。`,
      ],
      ejemplo: imperial
        ? [
            `35 岁、体重 180 磅、身高 5 英尺 10 英寸的男性，基础代谢率约 ${n(BASAL_IMPERIAL)} 千卡。`,
            `活动量很低时，他每天约需 ${n(BASAL_IMPERIAL * FACTORES.sedentaria)} 千卡来保持体重。`,
          ]
        : [
            `30 岁、体重 60 千克、身高 165 厘米的女性，基础代谢率约 ${n(BASAL_METRICO)} 千卡。`,
            `中度活动时，她每天约需 ${n(BASAL_METRICO * FACTORES.moderada)} 千卡来保持体重。`,
          ],
      faq: [
        { pregunta: "什么是基础代谢率？", respuesta: "身体在完全休息时，用来呼吸、维持体温和让器官运作所需的能量。" },
        { pregunta: "想减重，每天该吃多少热量？", respuesta: `常见的起点是比保持热量每天少约 ${DEFICIT} 千卡。最好和专业人员一起制定。` },
        { pregunta: "这个公式有多准确？", respuesta: "Mifflin-St Jeor 是最常用的公式之一，但算出的是平均值。遗传、肌肉量和健康状况都会影响实际消耗。" },
      ],
      glosario: [
        { termino: "千卡（kcal）", definicion: "食物所含能量和身体消耗能量的单位。" },
        { termino: "基础代谢率", definicion: "身体在完全休息时消耗的热量。" },
      ],
    };
  },
);
