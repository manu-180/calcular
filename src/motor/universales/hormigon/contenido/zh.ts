import { contenidoPorEscritura } from "../../comun/chino";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MEZCLA } from "../definicion";

const FT3 = 10 * 10 * (4 / 12);
const LB_CEMENTO = (MEZCLA.cementoKg * FT3 * 0.0283168466) / 0.45359237;
const VOLUMEN = 4 * 3 * 0.1;

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
    const imperial = ctx.unidades === "imperial";
    return {
      h1: "混凝土用量計算機",
      title: tituloQueEntre(`混凝土用量計算機｜${ctx.nombrePais}`, "混凝土用量計算機"),
      description: `算出灌一塊地坪需要多少混凝土（${imperial ? "立方碼" : "立方公尺"}），以及大約要買多少水泥、砂和碎石。`,
      intro: ["輸入長度、寬度和厚度，就能看到混凝土體積，以及拌合所需材料的大約用量。", "材料用量依配比而定。這個計算機以一般用途的 1:2:3 配比為參考。"],
      comoSeCalcula: [
        imperial ? "體積 ＝ 長 × 寬 × 厚，厚度以英尺計。立方英尺除以 27 就是立方碼。" : "體積 ＝ 長 × 寬 × 厚，厚度以公尺計。",
        "再加上預留量，應付地面不平和灑漏。",
        `每立方公尺約需水泥 ${MEZCLA.cementoKg} 公斤、砂 ${n(MEZCLA.arenaM3)} 立方公尺、碎石 ${n(MEZCLA.piedraM3, 1)} 立方公尺和水 ${MEZCLA.aguaL} 公升。`,
      ],
      ejemplo: imperial
        ? [`10 × 10 英尺、厚 4 英寸的庭院，需要 ${n(FT3)} 立方英尺混凝土，也就是 ${n(FT3 / 27)} 立方碼。`, `以參考配比計算，約需 ${n(LB_CEMENTO, 0)} 磅水泥。`]
        : [
            `4 × 3 公尺、厚 10 公分的地坪，需要 ${n(VOLUMEN, 1)} 立方公尺混凝土。`,
            `以參考配比計算，約需水泥 ${n(MEZCLA.cementoKg * VOLUMEN, 0)} 公斤、砂 ${n(MEZCLA.arenaM3 * VOLUMEN)} 立方公尺和碎石 ${n(MEZCLA.piedraM3 * VOLUMEN)} 立方公尺。`,
          ],
      faq: [
        { pregunta: "一立方碼是幾立方英尺？", respuesta: "27 立方英尺。一立方碼就是 3 × 3 × 3 英尺的立方體。" },
        { pregunta: "一立方公尺混凝土要多少水泥？", respuesta: `以 1:2:3 配比約 ${MEZCLA.cementoKg} 公斤。強度越高的混凝土，水泥用量越多。` },
        { pregunta: "要不要直接叫預拌混凝土？", respuesta: "量大的話，預拌混凝土通常品質較穩定、也比較快。小工程則常照這些用量在現場自己拌。" },
      ],
      glosario: [
        { termino: "配比", definicion: "水泥、砂、碎石和水的混合比例。" },
        { termino: "立方碼（yd³）", definicion: "每邊 1 碼的立方體體積，等於 27 立方英尺。" },
      ],
    };
  },
  (ctx) => {
    const n = (x: number, d = 2) => formatearNumero(ctx, x, d);
    const imperial = ctx.unidades === "imperial";
    return {
      h1: "混凝土用量计算器",
      title: tituloQueEntre(`混凝土用量计算器｜${ctx.nombrePais}`, "混凝土用量计算器"),
      description: `算出浇筑一块地坪需要多少混凝土（${imperial ? "立方码" : "立方米"}），以及大约要买多少水泥、砂和碎石。`,
      intro: ["输入长度、宽度和厚度，就能看到混凝土体积，以及搅拌所需材料的大约用量。", "材料用量取决于配合比。这个计算器以通用的 1:2:3 配合比为参考。"],
      comoSeCalcula: [
        imperial ? "体积 ＝ 长 × 宽 × 厚，厚度以英尺计。立方英尺除以 27 就是立方码。" : "体积 ＝ 长 × 宽 × 厚，厚度以米计。",
        "再加上预留量，应对地面不平和洒漏。",
        `每立方米约需水泥 ${MEZCLA.cementoKg} 千克、砂 ${n(MEZCLA.arenaM3)} 立方米、碎石 ${n(MEZCLA.piedraM3, 1)} 立方米和水 ${MEZCLA.aguaL} 升。`,
      ],
      ejemplo: imperial
        ? [`10 × 10 英尺、厚 4 英寸的庭院，需要 ${n(FT3)} 立方英尺混凝土，也就是 ${n(FT3 / 27)} 立方码。`, `按参考配合比计算，约需 ${n(LB_CEMENTO, 0)} 磅水泥。`]
        : [
            `4 × 3 米、厚 10 厘米的地坪，需要 ${n(VOLUMEN, 1)} 立方米混凝土。`,
            `按参考配合比计算，约需水泥 ${n(MEZCLA.cementoKg * VOLUMEN, 0)} 千克、砂 ${n(MEZCLA.arenaM3 * VOLUMEN)} 立方米和碎石 ${n(MEZCLA.piedraM3 * VOLUMEN)} 立方米。`,
          ],
      faq: [
        { pregunta: "一立方码是多少立方英尺？", respuesta: "27 立方英尺。一立方码就是 3 × 3 × 3 英尺的立方体。" },
        { pregunta: "一立方米混凝土要多少水泥？", respuesta: `按 1:2:3 配合比约 ${MEZCLA.cementoKg} 千克。强度越高的混凝土，水泥用量越多。` },
        { pregunta: "要不要直接订商品混凝土？", respuesta: "量大的话，商品混凝土通常质量更稳定，也更快。小工程则常按这些用量在现场自己搅拌。" },
      ],
      glosario: [
        { termino: "配合比", definicion: "水泥、砂、碎石和水的混合比例。" },
        { termino: "立方码（yd³）", definicion: "每边 1 码的立方体体积，等于 27 立方英尺。" },
      ],
    };
  },
);
