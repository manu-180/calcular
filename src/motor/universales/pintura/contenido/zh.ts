import { contenidoPorEscritura } from "../../comun/chino";
import { formatearNumero, tituloQueEntre, type ContenidoUniversal } from "../../tipos";
import { MARGEN } from "../definicion";

const NETA_IMP = 48 * 8 - 40;
const GAL = (NETA_IMP * 2) / 350;
const NETA = 14 * 2.6 - 4;
const LITROS = (NETA * 2) / 10;

export const contenidoZh: ContenidoUniversal = contenidoPorEscritura(
  (ctx) => {
    const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
    const imperial = ctx.unidades === "imperial";
    return {
      h1: "油漆用量計算機",
      title: tituloQueEntre(`油漆用量計算機｜${ctx.nombrePais}`, "油漆用量計算機"),
      description: "依牆面尺寸、門窗面積、塗刷遍數和油漆桶上的塗布率，算出牆面粉刷需要多少油漆。",
      intro: ["輸入牆面的長度和高度（或直接輸入面積）、門窗占的面積，以及要刷幾遍。", "會多算 10%，免得刷到一半不夠用。"],
      comoSeCalcula: ["面積 ＝ 牆面總長度 × 高度 − 門窗面積。", "油漆量 ＝ 面積 × 遍數 ÷ 塗布率。", `最後再加上 ${MARGEN * 100}% 的餘量。`],
      ejemplo: imperial
        ? [
            `牆面長 48 英尺、高 8 英尺，門窗共 40 平方英尺的房間，要刷 ${n(NETA_IMP, 0)} 平方英尺。`,
            `刷兩遍、每加侖可刷 350 平方英尺的油漆，需要 ${n(GAL, 2)} 加侖；加上餘量是 ${n(GAL * (1 + MARGEN), 2)} 加侖。`,
          ]
        : [
            `牆面長 14 公尺、高 ${n(2.6)} 公尺，門窗共 4 m² 的房間，要刷 ${n(NETA)} m²。`,
            `刷兩遍、每公升可刷 10 m² 的油漆，需要 ${n(LITROS, 2)} 公升；加上餘量是 ${n(LITROS * (1 + MARGEN), 2)} 公升。`,
          ],
      faq: [
        { pregunta: "一公升油漆可以刷多少面積？", respuesta: "大多數室內牆面漆刷一遍，每公升約可刷 8 到 12 m²。確切數字請看油漆桶上的標示。" },
        { pregunta: "要刷幾遍？", respuesta: "一般刷兩遍。新粉刷的牆、吸漆很重的牆，或顏色變化很大時，可能要刷第三遍。" },
        { pregunta: "門窗要扣掉嗎？", respuesta: "大的要扣。小的最好不要扣，多出來的量剛好用在邊角和收邊。" },
      ],
      glosario: [
        { termino: "塗布率", definicion: "一公升或一加侖油漆刷一遍能覆蓋的面積。" },
        { termino: "遍數", definicion: "在牆上塗刷油漆的層數。" },
      ],
    };
  },
  (ctx) => {
    const n = (x: number, d = 1) => formatearNumero(ctx, x, d);
    const imperial = ctx.unidades === "imperial";
    return {
      h1: "涂料用量计算器",
      title: tituloQueEntre(`涂料用量计算器｜${ctx.nombrePais}`, "涂料用量计算器"),
      description: "根据墙面尺寸、门窗面积、涂刷遍数和涂料桶上的涂布率，算出刷墙需要多少涂料。",
      intro: ["输入墙面的长度和高度（或直接输入面积）、门窗占的面积，以及要刷几遍。", "会多算 10%，免得刷到一半不够用。"],
      comoSeCalcula: ["面积 ＝ 墙面总长度 × 高度 − 门窗面积。", "涂料量 ＝ 面积 × 遍数 ÷ 涂布率。", `最后再加上 ${MARGEN * 100}% 的余量。`],
      ejemplo: imperial
        ? [
            `墙面长 48 英尺、高 8 英尺，门窗共 40 平方英尺的房间，要刷 ${n(NETA_IMP, 0)} 平方英尺。`,
            `刷两遍、每加仑可刷 350 平方英尺的涂料，需要 ${n(GAL, 2)} 加仑；加上余量是 ${n(GAL * (1 + MARGEN), 2)} 加仑。`,
          ]
        : [
            `墙面长 14 米、高 ${n(2.6)} 米，门窗共 4 m² 的房间，要刷 ${n(NETA)} m²。`,
            `刷两遍、每升可刷 10 m² 的涂料，需要 ${n(LITROS, 2)} 升；加上余量是 ${n(LITROS * (1 + MARGEN), 2)} 升。`,
          ],
      faq: [
        { pregunta: "一升涂料可以刷多少面积？", respuesta: "大多数室内墙面漆刷一遍，每升约可刷 8 到 12 m²。确切数字请看涂料桶上的标示。" },
        { pregunta: "要刷几遍？", respuesta: "一般刷两遍。新抹的墙、吸漆严重的墙，或颜色变化很大时，可能要刷第三遍。" },
        { pregunta: "门窗要扣掉吗？", respuesta: "大的要扣。小的最好不扣，多出来的量正好用在边角和收边。" },
      ],
      glosario: [
        { termino: "涂布率", definicion: "一升或一加仑涂料刷一遍能覆盖的面积。" },
        { termino: "遍数", definicion: "在墙上涂刷涂料的层数。" },
      ],
    };
  },
);
