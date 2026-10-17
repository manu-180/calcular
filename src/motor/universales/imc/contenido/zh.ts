import { contenidoPorEscritura } from "../../comun/chino";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { KG_POR_LB, M_POR_PULGADA } from "../definicion";

const M_IMPERIAL = 69 * M_POR_PULGADA;

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
    const imperial = ctx.unidades === "imperial";
    const m = M_IMPERIAL;
    return {
      h1: "BMI 計算機",
      title: tituloQueEntre(`BMI 計算機（身體質量指數）｜${ctx.nombrePais}`, `BMI 計算機｜${ctx.nombrePais}`, "BMI 計算機"),
      description: "用體重和身高算出身體質量指數（BMI），看看 WHO 標準下的分類，以及您這個身高的健康體重範圍。",
      intro: ["輸入體重和身高，就能看到 BMI、世界衛生組織（WHO）標準的分類，以及您身高的健康體重範圍。", "這是成人的一般參考，不能取代醫師等專業人員的建議。"],
      comoSeCalcula: [
        imperial ? "BMI ＝ 體重（磅）× 703 ÷（身高（英寸）× 身高（英寸））。" : "BMI ＝ 體重（公斤）÷（身高（公尺）× 身高（公尺））。",
        `低於 ${n(18.5)} 為體重過輕，${n(18.5)} 到 ${n(24.9)} 為健康體重，25 到 ${n(29.9)} 為過重，30 以上為肥胖。`,
        `健康體重範圍，是在您的身高下讓 BMI 落在 ${n(18.5)} 到 ${n(24.9)} 之間的體重。`,
      ],
      ejemplo: imperial
        ? [
            `體重 160 磅、身高 5 英尺 9 英寸的人，BMI 是 ${n((160 * KG_POR_LB) / (m * m))}，屬於健康體重。`,
            `這個身高的健康體重是 ${n((18.5 * m * m) / KG_POR_LB)} 到 ${n((24.9 * m * m) / KG_POR_LB)} 磅。`,
          ]
        : [
            `體重 70 公斤、身高 ${n(1.75, 2)} 公尺的人，BMI 是 ${n(70 / (1.75 * 1.75))}，屬於健康體重。`,
            `這個身高的健康體重是 ${n(18.5 * 1.75 * 1.75)} 到 ${n(24.9 * 1.75 * 1.75)} 公斤。`,
          ],
      faq: [
        { pregunta: "BMI 多少算正常？", respuesta: `依 WHO 標準，成人 BMI 在 ${n(18.5)} 到 ${n(24.9)} 之間是健康體重，男女的範圍相同。` },
        { pregunta: "BMI 適用於每個人嗎？", respuesta: "不是。它無法分辨肌肉和脂肪，肌肉量多的人數值可能偏高。孕婦、兒童和青少年也要用不同的方式判讀。" },
        { pregunta: "用磅和英寸要怎麼算 BMI？", respuesta: "把體重（磅）乘以 703，再除以身高（英寸）的平方。5 英尺 9 英寸就是 69 × 69。" },
      ],
      glosario: [
        { termino: "BMI", definicion: "身體質量指數：體重相對於身高的比例。" },
        { termino: "WHO", definicion: "世界衛生組織，訂定成人 BMI 的分類。" },
      ],
    };
  },
  (ctx) => {
    const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
    const imperial = ctx.unidades === "imperial";
    const m = M_IMPERIAL;
    return {
      h1: "BMI 计算器",
      title: tituloQueEntre(`BMI 计算器（身体质量指数）｜${ctx.nombrePais}`, `BMI 计算器｜${ctx.nombrePais}`, "BMI 计算器"),
      description: "用体重和身高算出身体质量指数（BMI），看看 WHO 标准下的分类，以及您这个身高的健康体重范围。",
      intro: ["输入体重和身高，就能看到 BMI、世界卫生组织（WHO）标准的分类，以及您身高的健康体重范围。", "这是成人的一般参考，不能代替医生等专业人员的建议。"],
      comoSeCalcula: [
        imperial ? "BMI ＝ 体重（磅）× 703 ÷（身高（英寸）× 身高（英寸））。" : "BMI ＝ 体重（千克）÷（身高（米）× 身高（米））。",
        `低于 ${n(18.5)} 为体重过低，${n(18.5)} 到 ${n(24.9)} 为正常体重，25 到 ${n(29.9)} 为超重，30 及以上为肥胖。`,
        `健康体重范围，是在您的身高下让 BMI 落在 ${n(18.5)} 到 ${n(24.9)} 之间的体重。`,
      ],
      ejemplo: imperial
        ? [
            `体重 160 磅、身高 5 英尺 9 英寸的人，BMI 是 ${n((160 * KG_POR_LB) / (m * m))}，属于正常体重。`,
            `这个身高的健康体重是 ${n((18.5 * m * m) / KG_POR_LB)} 到 ${n((24.9 * m * m) / KG_POR_LB)} 磅。`,
          ]
        : [
            `体重 70 千克、身高 ${n(1.75, 2)} 米的人，BMI 是 ${n(70 / (1.75 * 1.75))}，属于正常体重。`,
            `这个身高的健康体重是 ${n(18.5 * 1.75 * 1.75)} 到 ${n(24.9 * 1.75 * 1.75)} 千克。`,
          ],
      faq: [
        { pregunta: "BMI 多少算正常？", respuesta: `按 WHO 标准，成人 BMI 在 ${n(18.5)} 到 ${n(24.9)} 之间是正常体重，男女的范围相同。` },
        { pregunta: "BMI 适用于每个人吗？", respuesta: "不是。它无法区分肌肉和脂肪，肌肉量多的人数值可能偏高。孕妇、儿童和青少年也要用不同的方式解读。" },
        { pregunta: "用磅和英寸怎么算 BMI？", respuesta: "把体重（磅）乘以 703，再除以身高（英寸）的平方。5 英尺 9 英寸就是 69 × 69。" },
      ],
      glosario: [
        { termino: "BMI", definicion: "身体质量指数：体重相对于身高的比例。" },
        { termino: "WHO", definicion: "世界卫生组织，制定成人 BMI 的分类。" },
      ],
    };
  },
);
